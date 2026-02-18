import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/utils/cn';
import { SectionRenderer } from './SectionRenderer';
import { BackgroundMusic } from './BackgroundMusic';
import { useContainerSize } from '../hooks/useContainerSize';
import type { CanvasRendererProps, DeviceType } from '../types';
import { validateContact } from '../utils/validation';


export const DynamicRenderer: React.FC<CanvasRendererProps> = ({
    layout,
    readOnly = false,
    activeSectionId,
    onSectionUpdate,
    onSectionSelect,
    onOpen,
    onInteraction,
    onValidate: propOnValidate,
    device: propDevice,
    selectedElementKey,
    onElementSelect,
    isDark: isDarkProp,
    externalInputState
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
    const [isTransitioning, setIsTransitioning] = React.useState(false);
    const [activeScrollSectionId, setActiveScrollSectionId] = React.useState<string | null>(null);

    // Theme state - synchronized with prop for editor mode
    const [isDark, setIsDark] = React.useState(isDarkProp ?? false);

    // Sync theme if prop changes and we're not in a path that should be independent
    React.useEffect(() => {
        if (isDarkProp !== undefined) {
            setIsDark(isDarkProp);
        }
        // Reset hasOpened when entering readOnly mode (Preview)
        if (readOnly) {
            setHasOpened(false);
        }
    }, [isDarkProp, readOnly]);

    // Initialize from system if no prop provided
    React.useEffect(() => {
        if (isDarkProp === undefined && typeof window !== 'undefined') {
            setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
    }, [isDarkProp]);

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

    const handleValidate = React.useCallback((type: string, value: any, options?: any) => {
        if (propOnValidate) {
            return propOnValidate(type, value, options);
        }

        if (type === 'rsvp-contact') {
            return validateContact(value, options?.contactType || 'email');
        }

        return true;
    }, [propOnValidate]);

    // Check for splash screen anywhere in the sections
    const splashSection = layout.sections.find(s => s.type === 'SplashSection');
    const navSection = layout.sections.find(s => s.type === 'NavSection');
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

    const isBoxed = layout.globalStyles.layoutMode === 'boxed';
    const borderRadiusMap: Record<string, string> = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        full: 'rounded-full'
    };
    const radiusClass = layout.globalStyles.containerBorderRadius
        ? borderRadiusMap[layout.globalStyles.containerBorderRadius]
        : 'rounded-[2rem]';

    return (
        <div className={cn(
            "relative w-full h-full overflow-hidden flex flex-col items-center",
            isBoxed && !showOnlySplash ? (isDark ? "bg-[#0a0a0a]" : "bg-gray-50/50") : ""
        )}>
            <div
                ref={containerRef}
                className={cn(
                    "flex flex-col no-scrollbar scroll-smooth transition-all duration-500 mx-auto",
                    !showOnlySplash
                        ? (isBoxed
                            ? cn("w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-6xl h-[calc(100%-2rem)] md:h-[calc(100%-4rem)] shadow-[0_20px_50px_rgba(0,0,0,0.1)] my-4 md:my-8 border border-gray-100/10 relative overflow-y-auto", radiusClass)
                            : "w-full h-full max-w-6xl overflow-y-auto")
                        : "w-full h-full overflow-hidden"
                )}
                style={{
                    backgroundColor: themeColors.background,
                    fontFamily: layout.globalStyles.fontFamilyBody,
                    color: themeColors.text
                }}
            >
                {(showOnlySplash || isTransitioning) && splashSection ? (
                    <div
                        key={splashSection.id}
                        data-section-id={splashSection.id}
                        className={cn(
                            "h-full w-full transition-all",
                            isTransitioning && (splashSection.content.transitionType === 'book' ? "perspective-2000" : "")
                        )}
                    >
                        <div className={cn(
                            "h-full w-full relative",
                            isTransitioning && splashSection.content.transitionType === 'fade' && "animate-fade-scale-exit",
                            isTransitioning && splashSection.content.transitionType === 'book' && "animate-book-flip preserve-3d origin-left",
                            isTransitioning && splashSection.content.transitionType === 'envelope' && "transition-transform duration-1000 translate-y-full",
                            isTransitioning && splashSection.content.transitionType === 'curtain' && "animate-curtain-slide-up",
                            isTransitioning && splashSection.content.transitionType === 'zoom' && "animate-zoom-reveal",
                            isTransitioning && splashSection.content.transitionType === 'blur' && "animate-blur-dissolve",
                            isTransitioning && splashSection.content.transitionType === 'heart' && "animate-iris-reveal",
                            isTransitioning && splashSection.content.transitionType === 'star' && "animate-star-reveal"
                        )}>
                            {/* Envelope Flap Animation Overlay */}
                            {isTransitioning && splashSection.content.transitionType === 'envelope' && (
                                <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10 backdrop-blur-md z-50 origin-top animate-flap-open preserve-3d">
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                                </div>
                            )}

                            <SectionRenderer
                                section={splashSection}
                                globalStyles={layout.globalStyles}
                                isActive={false}
                                onSelect={() => { }}
                                onUpdate={() => { }}
                                selectedElementKey={selectedElementKey}
                                onElementSelect={onElementSelect}
                                readOnly={true}
                                index={layout.sections.indexOf(splashSection)}
                                device={device}
                                isDark={isDark}
                                externalInputState={externalInputState}
                                sections={layout.sections}
                                onOpen={() => {
                                    const duration = splashSection.content.transitionDuration || 1000;
                                    setIsTransitioning(true);

                                    setTimeout(() => {
                                        setHasOpened(true);
                                        setIsTransitioning(false);
                                        onOpen?.(); // Call the prop
                                        onInteraction?.({
                                            type: 'INVITATION_OPENED',
                                            payload: { timestamp: Date.now() },
                                            timestamp: Date.now()
                                        });
                                    }, duration);
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <div
                        className={cn(
                            "flex flex-col flex-1 relative transition-transform duration-1000",
                            isTransitioning && splashSection?.content.transitionType === 'parallax' && "-translate-y-full"
                        )}
                    >
                        {layout.sections.map((section, index) => {
                            // If in read-only mode and we have a splash screen, don't show it in the main list
                            if (readOnly && hasSplash && section.id === splashSection?.id) return null;

                            // NAV SECTION IS RENDERED SEPARATELY AT THE TOP LEVEL OF DynamicRenderer
                            if (section.type === 'NavSection') return null;

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
                                        onValidate={handleValidate}
                                        onSelect={() => onSectionSelect?.(section.id)}
                                        onUpdate={(newContent) => onSectionUpdate?.(section.id, newContent)}
                                        selectedElementKey={selectedElementKey}
                                        onElementSelect={onElementSelect}
                                        readOnly={readOnly}
                                        index={index}
                                        device={device}
                                        isDark={isDark}
                                        externalInputState={externalInputState}
                                        sections={layout.sections}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Floating NavSection */}
            {navSection && !navSection.isHidden && !showOnlySplash && (
                <div
                    data-section-id={navSection.id}
                    className={cn(
                        "absolute z-40 transition-all duration-300 pointer-events-none",
                        "flex justify-center w-full"
                    )}
                    style={{
                        top: navSection.content.navPosition === 'bottom' ? 'auto' : 0,
                        bottom: navSection.content.navPosition === 'bottom' ? 0 : 'auto'
                    }}
                >
                    <div className="pointer-events-auto max-w-6xl w-full px-4 md:px-8">
                        <SectionRenderer
                            section={navSection}
                            globalStyles={layout.globalStyles}
                            isActive={activeSectionId === navSection.id}
                            activeScrollSectionId={activeScrollSectionId}
                            onNavigate={handleNavigate}
                            onInteraction={onInteraction}
                            onValidate={handleValidate}
                            onSelect={() => onSectionSelect?.(navSection.id)}
                            onUpdate={(newContent) => onSectionUpdate?.(navSection.id, newContent)}
                            selectedElementKey={selectedElementKey}
                            onElementSelect={onElementSelect}
                            readOnly={readOnly}
                            index={layout.sections.indexOf(navSection)}
                            device={device}
                            isDark={isDark}
                            externalInputState={externalInputState}
                            sections={layout.sections}
                        />
                    </div>
                </div>
            )}

            {/* Background Music */}
            {readOnly && layout.musicUrl && !showOnlySplash && (
                <BackgroundMusic url={layout.musicUrl} isDark={isDark} />
            )}

            {/* Dark Mode Toggle */}
            {readOnly && (
                <button
                    onClick={() => setIsDark(!isDark)}
                    className={cn(
                        "absolute bottom-6 right-6 z-50 p-3 rounded-full shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-90 border",
                        isDark ? "bg-white/10 border-white/20 text-yellow-400" : "bg-white/80 border-gray-200 text-gray-700 hover:bg-white"
                    )}
                    title={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            )}

            {/* Hidden debug info for verification if needed */}
            <div className="hidden" data-testid="detected-device">{device}</div>
        </div>
    );
};
