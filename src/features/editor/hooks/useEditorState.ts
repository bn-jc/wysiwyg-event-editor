import { useState, useCallback, useRef } from 'react';
import type { DeviceType, ViewMode, EventLayout, SectionDefinition, SectionContent } from '../types';
import { createSection, SECTION_TEMPLATES } from '../utils/SectionSchemaRegistry';

const INITIAL_LAYOUT: EventLayout = {
    id: 'invitation-1',
    name: 'O Nosso Casamento',
    eventType: 'wedding',
    language: 'pt-PT',
    globalStyles: {
        primaryColor: '#1a1a1a',
        secondaryColor: '#64748b',
        fontFamilyTitle: "'Sacramento', cursive",
        fontFamilyBody: "'Josefin Sans', sans-serif",
        backgroundColor: '#ffffff'
    },
    sections: [
        {
            ...createSection('splash-01'),
            content: {
                title: 'O Grande Dia de',
                coupleNames: 'Sofia & Tiago',
                date: '20 de Junho de 2026',
                buttonLabel: 'Abrir Convite',
                backgroundImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
            }
        },
        createSection('hero-01')
    ]
};

export const useEditorState = () => {
    const [layout, setLayout] = useState<EventLayout>(INITIAL_LAYOUT);
    const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('split');
    const [device, setDevice] = useState<DeviceType>('mobile');
    const [showLayers, setShowLayers] = useState(true);

    const addSection = useCallback((templateId: string) => {
        const newSection = createSection(templateId);
        setLayout(prev => ({
            ...prev,
            sections: [...prev.sections, newSection]
        }));
        setActiveSectionId(newSection.id);
    }, []);

    const updateSectionContent = useCallback((sectionId: string, newContent: Partial<SectionContent>) => {
        setLayout(prev => ({
            ...prev,
            sections: prev.sections.map(section =>
                section.id === sectionId
                    ? { ...section, content: { ...section.content, ...newContent } }
                    : section
            )
        }));
    }, []);

    const updateSectionStyles = useCallback((sectionId: string, newStyles: React.CSSProperties) => {
        setLayout(prev => ({
            ...prev,
            sections: prev.sections.map(section =>
                section.id === sectionId
                    ? { ...section, styles: { ...section.styles, ...newStyles } }
                    : section
            )
        }));
    }, []);

    const deleteSection = useCallback((sectionId: string) => {
        setLayout(prev => ({
            ...prev,
            sections: prev.sections.filter(s => s.id !== sectionId)
        }));
        if (activeSectionId === sectionId) setActiveSectionId(null);
    }, [activeSectionId]);

    const moveSection = useCallback((index: number, direction: 'up' | 'down') => {
        setLayout(prev => {
            const newSections = [...prev.sections];
            const targetIndex = direction === 'up' ? index - 1 : index + 1;
            if (targetIndex < 0 || targetIndex >= newSections.length) return prev;

            [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
            return { ...prev, sections: newSections };
        });
    }, []);

    const updateGlobalStyles = useCallback((newStyles: Partial<EventLayout['globalStyles']>) => {
        setLayout(prev => ({
            ...prev,
            globalStyles: { ...prev.globalStyles, ...newStyles }
        }));
    }, []);

    return {
        layout,
        setLayout,
        activeSectionId,
        setActiveSectionId,
        viewMode,
        setViewMode,
        device,
        setDevice,
        showLayers,
        setShowLayers,
        addSection,
        updateSectionContent,
        updateSectionStyles,
        deleteSection,
        moveSection,
        updateGlobalStyles
    };
};
