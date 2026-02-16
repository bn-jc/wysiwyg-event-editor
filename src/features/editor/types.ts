import React from 'react';

export type DeviceType = 'tablet' | 'mobile' | 'desktop';

export type ViewMode = 'edit' | 'preview' | 'split' | 'overview';

export type ImageMask = 'none' | 'circle' | 'heart' | 'scalloped' | 'rounded';

export interface SectionContent {
    [key: string]: any; // Dynamic fields like 'title', 'subtitle', 'imageUrl', 'address'
}

export type SectionType =
    | 'SplashSection'
    | 'HeroSection'
    | 'AgendaSection'
    | 'RSVPSection'
    | 'GuestbookSection'
    | 'CountdownSection'
    | 'SeparatorSection'
    | 'CustomSection';

export interface SectionDefinition {
    id: string;
    type: SectionType;
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
    effects?: 'confetti' | 'sparkles' | 'bubbles' | 'balloons' | 'hearts' | 'birds' | 'hats' | 'roses' | 'rings' | 'cakes' | 'none';
    globalStyles: {
        primaryColor: string;
        secondaryColor: string;
        fontFamilyTitle: string;
        fontFamilyBody: string;
        backgroundColor?: string;
        layoutMode?: 'boxed' | 'full'; // 'boxed' = max-w-6xl mx-auto, 'full' = w-full
    };
    sections: SectionDefinition[];
}

export interface CanvasRendererProps {
    layout: EventLayout;
    /**
     * The device type to simulate.
     * If undefined, it will be automatically detected based on the container width:
     * - < 640px: 'mobile'
     * - < 1024px: 'tablet'
     * - >= 1024px: 'desktop'
     */
    device?: DeviceType; // Made optional for auto-detection
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
    device: DeviceType; // Added device prop
    onOpen?: () => void;
}
