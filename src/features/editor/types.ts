import React from 'react';

export type DeviceType = 'tablet' | 'mobile' | 'desktop';

export type ViewMode = 'edit' | 'preview' | 'split' | 'overview';

export type ImageMask = 'none' | 'circle' | 'heart' | 'scalloped' | 'rounded';

export interface SectionContent {
    [key: string]: any; // Dynamic fields like 'title', 'subtitle', 'imageUrl', 'address'
}

export interface SectionDefinition {
    id: string;
    templateId: string; // References SectionSchemaRegistry (e.g., 'splash-v1', 'hero-basic')
    content: SectionContent;
    styles?: React.CSSProperties;
    isHidden?: boolean;
}

export interface EventLayout {
    id: string;
    name: string;
    eventType: string; // 'wedding', 'baptism', 'anniversary', etc.
    language: string; // default 'pt-MZ'
    musicUrl?: string;
    effects?: 'confetti' | 'sparkles' | 'none';
    globalStyles: {
        primaryColor: string;
        secondaryColor: string;
        fontFamilyTitle: string;
        fontFamilyBody: string;
        backgroundColor?: string;
    };
    sections: SectionDefinition[];
}

export interface CanvasRendererProps {
    layout: EventLayout;
    device: DeviceType;
    readOnly?: boolean;
    activeSectionId?: string | null;
    onSectionUpdate?: (sectionId: string, newContent: Partial<SectionContent>) => void;
    onSectionSelect?: (sectionId: string) => void;
}

export interface SectionRendererProps {
    section: SectionDefinition;
    globalStyles: EventLayout['globalStyles'];
    isActive: boolean;
    onSelect: () => void;
    onUpdate: (newContent: Partial<SectionContent>) => void;
    readOnly?: boolean;
    index: number;
}
