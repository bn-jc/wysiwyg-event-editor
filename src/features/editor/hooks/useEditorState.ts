import { useState, useCallback, useEffect } from 'react';
import { createSection } from '../utils/SectionSchemaRegistry';
import type { DeviceType, ViewMode, EventLayout, SectionContent, SectionType } from '../types';

const NAV_LABELS: Record<string, string> = {
    HeroSection: 'Início',
    AgendaSection: 'Agenda',
    RSVPSection: 'RSVP',
    GuestbookSection: 'Mural',
    CountdownSection: 'Contagem',
    GiftsSection: 'Presentes',
    CustomSection: 'Extras',
    SplashSection: 'Boas-vindas'
};

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
            ...createSection('SplashSection'),
            content: {
                title: 'O Grande Dia de',
                names: 'John & Jane',
                date: '20 de Junho de 2026',
                buttonLabel: 'Abrir Convite',
                backgroundImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
                icon: 'heart',
                lineVariant: 'line'
            }
        },
        createSection('HeroSection')
    ]
};

export const useEditorState = (initialLayout?: EventLayout) => {
    const [layout, setLayout] = useState<EventLayout>(initialLayout || INITIAL_LAYOUT);
    const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('split');
    const [device, setDevice] = useState<DeviceType>('desktop');
    const [showLayers, setShowLayers] = useState(true);

    // Sync Navbar links with existing sections
    const sectionsHash = JSON.stringify(layout.sections.map(s => ({
        id: s.id,
        type: s.type,
        title: s.content.title
    })));

    useEffect(() => {
        const navSection = layout.sections.find(s => s.type === 'NavSection');
        if (!navSection) return;

        const newLinks = layout.sections
            .filter(s => s.type !== 'NavSection' && s.type !== 'SeparatorSection' && s.type !== 'SplashSection')
            .map(s => ({
                label: (s.content.title && typeof s.content.title === 'string' && s.content.title.length > 0 && s.content.title.length < 20)
                    ? s.content.title
                    : (NAV_LABELS[s.type] || s.type.replace('Section', '')),
                targetId: s.id
            }));

        const currentLinksHash = JSON.stringify(navSection.content.links);
        const newLinksHash = JSON.stringify(newLinks);

        if (currentLinksHash !== newLinksHash) {
            setLayout(prev => {
                const navIndex = prev.sections.findIndex(s => s.type === 'NavSection');
                if (navIndex === -1) return prev;

                const newSections = [...prev.sections];
                newSections[navIndex] = {
                    ...newSections[navIndex],
                    content: {
                        ...newSections[navIndex].content,
                        links: newLinks
                    }
                };

                return { ...prev, sections: newSections };
            });
        }
    }, [sectionsHash]);

    const addSection = useCallback((type: SectionType) => {
        const hasSplash = layout.sections.some(s => s.type === 'SplashSection');

        // Prevent multiple splash sections
        if (type === 'SplashSection' && hasSplash) return;

        const newSection = createSection(type);
        setLayout(prev => {
            const newSections = [...prev.sections];
            if (type === 'SplashSection') {
                // Force splash to the beginning
                newSections.unshift(newSection);
            } else {
                newSections.push(newSection);
            }
            return { ...prev, sections: newSections };
        });
        setActiveSectionId(newSection.id);
    }, [layout.sections]);

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

            const section = newSections[index];

            // Constraint: SplashSection must always be at index 0
            if (section.type === 'SplashSection') return prev; // Cannot move splash
            if (targetIndex === 0 && newSections[0]?.type === 'SplashSection') return prev; // Cannot move anything above splash

            // Simple swap
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

    const updateMusic = useCallback((url?: string) => {
        setLayout(prev => ({ ...prev, musicUrl: url }));
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
        updateGlobalStyles,
        updateMusic
    };
};
