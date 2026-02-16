import React from 'react';
import type { CanvasRendererProps } from '../types';
import { SectionRenderer } from './SectionRenderer';

import { useContainerSize } from '../hooks/useContainerSize';
import type { DeviceType } from '../types';

export const DynamicRenderer: React.FC<CanvasRendererProps> = ({
    layout,
    readOnly = false,
    activeSectionId,
    onSectionUpdate,
    onSectionSelect,
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

    // Check if the first section is a splash screen
    const firstSection = layout.sections[0];
    const hasSplash = firstSection?.type === 'SplashSection';
    const showOnlySplash = readOnly && hasSplash && !hasOpened;

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
        <div
            ref={containerRef}
            className={`flex flex-col w-full h-full overflow-y-auto no-scrollbar scroll-smooth ${showOnlySplash ? 'overflow-hidden' : ''}`}
            style={{
                backgroundColor: layout.globalStyles.backgroundColor || '#ffffff',
                fontFamily: layout.globalStyles.fontFamilyBody,
                color: layout.globalStyles.primaryColor
            }}
        >
            {showOnlySplash ? (
                <div key={firstSection.id} data-section-id={firstSection.id} className="h-full w-full">
                    <SectionRenderer
                        section={firstSection}
                        globalStyles={layout.globalStyles}
                        isActive={false} // Splash is never "active" in read-only mode in the editor sense
                        onSelect={() => { }}
                        onUpdate={() => { }}
                        readOnly={true}
                        index={0}
                        device={device}
                        onOpen={() => setHasOpened(true)}
                    />
                </div>
            ) : (
                layout.sections.map((section, index) => {
                    // If in read-only mode and we have a splash screen, don't show it in the main list
                    if (readOnly && hasSplash && index === 0) return null;

                    return (
                        <div key={section.id} data-section-id={section.id}>
                            <SectionRenderer
                                section={section}
                                globalStyles={layout.globalStyles}
                                isActive={activeSectionId === section.id}
                                onSelect={() => onSectionSelect?.(section.id)}
                                onUpdate={(newContent) => onSectionUpdate?.(section.id, newContent)}
                                readOnly={readOnly}
                                index={index}
                                device={device}
                                // Pass onOpen just in case, though mostly used by Splash
                                onOpen={() => setHasOpened(true)}
                            />
                        </div>
                    );
                })
            )}
            {/* Hidden debug info for verification if needed */}
            <div className="hidden" data-testid="detected-device">{device}</div>
        </div>
    );
};
