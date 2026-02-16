import React from 'react';
import type { CanvasRendererProps } from '../types';
import { SectionRenderer } from './SectionRenderer';

export const DynamicRenderer: React.FC<CanvasRendererProps> = ({
    layout,
    readOnly = false,
    activeSectionId,
    onSectionUpdate,
    onSectionSelect
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Scroll to active section when it changes (specifically for new additions)
    React.useEffect(() => {
        if (activeSectionId && containerRef.current) {
            const element = containerRef.current.querySelector(`[data-section-id="${activeSectionId}"]`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [activeSectionId]);

    return (
        <div
            ref={containerRef}
            className="flex flex-col w-full h-full overflow-y-auto no-scrollbar scroll-smooth"
            style={{
                backgroundColor: layout.globalStyles.backgroundColor || '#ffffff',
                fontFamily: layout.globalStyles.fontFamilyBody,
                color: layout.globalStyles.primaryColor
            }}
        >
            {layout.sections.map((section, index) => (
                <div key={section.id} data-section-id={section.id}>
                    <SectionRenderer
                        section={section}
                        globalStyles={layout.globalStyles}
                        isActive={activeSectionId === section.id}
                        onSelect={() => onSectionSelect?.(section.id)}
                        onUpdate={(newContent) => onSectionUpdate?.(section.id, newContent)}
                        readOnly={readOnly}
                        index={index}
                    />
                </div>
            ))}
        </div>
    );
};
