import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { SectionRenderer } from './SectionRenderer';
import { BackgroundMusic } from './BackgroundMusic';
import { useContainerSize } from '../hooks/useContainerSize';
import type { CanvasRendererProps, DeviceType } from '../types';


export const DynamicRenderer: React.FC<CanvasRendererProps> = ({
    layout,
    readOnly = false,
    activeSectionId,
    onSectionUpdate,
    onSectionSelect,
    onOpen,
    onInteraction,
    device: propDevice
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { mode } = useContainerSize(containerRef);

    // Auto-detect device if not provided
    const device: DeviceType = propDevice || (
        mode === 'mobile' ? 'mobile' :
            mode === 'compact' ? 'tablet' :
                'desktop'
    );

    const [hasOpened, setHasOpened] = React.useState(false);
    const [activeScrollSectionId, setActiveScrollSectionId] = React.useState<string | null>(null);

    // Theme state
    const [isDark, setIsDark] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    // Theme colors
    const themeColors = {
        background: isDark ? '#121212' : (layout.globalStyles.backgroundColor || '#ffffff'),
        text: isDark ? '#E0E0E0' : layout.globalStyles.primaryColor
    };

    // Global click listener for interaction tracking
    React.useEffect(() => {
        if (!onInteraction || !containerRef.current) return;

        const handleGlobalClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const section = target.closest('[data-section-id]');
            const sectionId = section?.getAttribute('data-section-id');
            const tagName = target.tagName.toLowerCase();
            const textContent = target.innerText?.slice(0, 50).trim();

            onInteraction({
                type: 'CLICK_ELEMENT',
                payload: {
                    tagName,
                    textContent,
                    sectionId,
                    id: target.id,
                    className: target.className
                },
                timestamp: Date.now()
            });
        };

        const container = containerRef.current;
        container.addEventListener('click', handleGlobalClick);
        return () => container.removeEventListener('click', handleGlobalClick);
    }, [onInteraction]);

    const handleNavigate = React.useCallback((targetId: string) => {
        if (!containerRef.current) return;

        if (targetId === 'top') {
            containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // 1. Try to find by ID exactly
        let element = containerRef.current.querySelector(`[data-section-id="${targetId}"]`) ||
            document.getElementById(targetId);

        // 2. If not found, try to find by section type (case insensitive mapping)
        if (!element) {
            const sections = layout.sections;
            const foundSection = sections.find(s =>
                s.type.toLowerCase().includes(targetId.toLowerCase()) ||
                targetId.toLowerCase().includes(s.type.replace('Section', '').toLowerCase())
            );
            if (foundSection) {
                element = containerRef.current.querySelector(`[data-section-id="${foundSection.id}"]`);
            }
        }

        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [layout.sections]);

    // Check for splash screen anywhere in the sections
    const splashSection = layout.sections.find(s => s.type === 'SplashSection');
    const hasSplash = !!splashSection;
    const showOnlySplash = readOnly && hasSplash && !hasOpened;

    // Setup intersection observer for scroll highlighting
    React.useEffect(() => {
        if (!containerRef.current || showOnlySplash) return;

        const observerOptions = {
            root: containerRef.current,
            threshold: 0.5 // Highlighting if 50% of the section is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('data-section-id');
                    if (sectionId) {
                        setActiveScrollSectionId(sectionId);
                    }
                }
            });
        }, observerOptions);

        // Observer all sections
        const sections = containerRef.current.querySelectorAll('[data-section-id]');
        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, [layout.sections, showOnlySplash]);

    // Scroll to active section or top when splash is dismissed
    React.useEffect(() => {
        if (containerRef.current && !showOnlySplash) {
            // If we have an active section, scroll to it
            if (activeSectionId) {
                const element = containerRef.current.querySelector(`[data-section-id="${activeSectionId}"]`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                // Otherwise (e.g. read-only mode after splash), force scroll to top
                containerRef.current.scrollTop = 0;
            }
        }
    }, [activeSectionId, showOnlySplash]);

    return (
        <div className="relative w-full h-full">
            <div
                ref={containerRef}
                className={`flex flex-col w-full h-full overflow-y-auto no-scrollbar scroll-smooth transition-colors duration-500 ${showOnlySplash ? 'overflow-hidden' : ''}`}
                style={{
                    backgroundColor: themeColors.background,
                    fontFamily: layout.globalStyles.fontFamilyBody,
                    color: themeColors.text
                }}
            >
                {showOnlySplash && splashSection ? (
                    <div key={splashSection.id} data-section-id={splashSection.id} className="h-full w-full">
                        <SectionRenderer
                            section={splashSection}
                            globalStyles={layout.globalStyles}
                            isActive={false}
                            onSelect={() => { }}
                            onUpdate={() => { }}
                            readOnly={true}
                            index={layout.sections.indexOf(splashSection)}
                            device={device}
                            isDark={isDark}
                            onOpen={() => {
                                setHasOpened(true);
                                onOpen?.(); // Call the prop
                                onInteraction?.({
                                    type: 'INVITATION_OPENED',
                                    payload: { timestamp: Date.now() },
                                    timestamp: Date.now()
                                });
                            }}
                        />
                    </div>
                ) : (
                    layout.sections.map((section, index) => {
                        // If in read-only mode and we have a splash screen, don't show it in the main list
                        // (Detect by ID to be safe across reorders)
                        if (readOnly && hasSplash && section.id === splashSection?.id) return null;

                        if (section.isHidden) return null;

                        return (
                            <div key={section.id} data-section-id={section.id}>
                                <SectionRenderer
                                    section={section}
                                    globalStyles={layout.globalStyles}
                                    isActive={activeSectionId === section.id}
                                    activeScrollSectionId={activeScrollSectionId}
                                    onNavigate={handleNavigate}
                                    onInteraction={onInteraction}
                                    onSelect={() => onSectionSelect?.(section.id)}
                                    onUpdate={(newContent) => onSectionUpdate?.(section.id, newContent)}
                                    readOnly={readOnly}
                                    index={index}
                                    device={device}
                                    isDark={isDark}
                                    onOpen={() => {
                                        setHasOpened(true);
                                        onOpen?.(); // Call the prop
                                        onInteraction?.({
                                            type: 'INVITATION_OPENED',
                                            payload: { timestamp: Date.now() },
                                            timestamp: Date.now()
                                        });
                                    }}
                                />
                            </div>
                        );
                    })
                )}
                {/* Hidden debug info for verification if needed */}
                <div className="hidden" data-testid="detected-device">{device}</div>
            </div>

            {/* Background Music */}
            {readOnly && layout.musicUrl && !showOnlySplash && (
                <BackgroundMusic url={layout.musicUrl} isDark={isDark} />
            )}


            {/* Dark Mode Toggle */}

            {readOnly && !showOnlySplash && (
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="absolute bottom-6 right-6 z-50 p-3 rounded-full shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-90 border border-white/20"
                    style={{
                        backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        color: isDark ? '#FCD34D' : '#4B5563'
                    }}
                    title={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            )}
        </div>
    );
};
