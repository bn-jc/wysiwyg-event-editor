import React from 'react';
import type { EventLayout, CanvasRendererProps, SectionContent } from '../types';
import { SectionRenderer } from './SectionRenderer';

export const DynamicRenderer: React.FC<CanvasRendererProps> = ({
    layout,
    device,
    readOnly = false,
    activeSectionId,
    onSectionUpdate,
    onSectionSelect
}) => {
    return (
        <div
            className="flex flex-col w-full h-full overflow-y-auto no-scrollbar"
            style={{
                backgroundColor: layout.globalStyles.backgroundColor || '#ffffff',
                fontFamily: layout.globalStyles.fontFamilyBody,
                color: layout.globalStyles.primaryColor
            }}
        >
            {layout.sections.map((section, index) => (
                <SectionRenderer
                    key={section.id}
                    section={section}
                    globalStyles={layout.globalStyles}
                    isActive={activeSectionId === section.id}
                    onSelect={() => onSectionSelect?.(section.id)}
                    onUpdate={(newContent) => onSectionUpdate?.(section.id, newContent)}
                    readOnly={readOnly}
                    index={index}
                />
            ))}
        </div>
    );
};
