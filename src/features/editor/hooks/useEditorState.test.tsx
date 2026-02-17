import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useEditorState } from './useEditorState';

describe('useEditorState', () => {
    it('should initialize with default layout', () => {
        const { result } = renderHook(() => useEditorState());

        expect(result.current.layout).toBeDefined();
        expect(result.current.layout.sections.length).toBeGreaterThan(0);
        expect(result.current.layout.sections[0].type).toBe('SplashSection');
    });

    it('should add a new section', () => {
        const { result } = renderHook(() => useEditorState());
        const initialCount = result.current.layout.sections.length;

        act(() => {
            result.current.addSection('HeroSection');
        });

        expect(result.current.layout.sections).toHaveLength(initialCount + 1);
        const lastSection = result.current.layout.sections[result.current.layout.sections.length - 1];
        expect(lastSection.type).toBe('HeroSection');
        expect(result.current.activeSectionId).toBe(lastSection.id);
    });

    it('should update section content', () => {
        const { result } = renderHook(() => useEditorState());
        // Add a fresh section to test update safely
        act(() => {
            result.current.addSection('HeroSection');
        });

        const sectionId = result.current.activeSectionId!;

        act(() => {
            result.current.updateSectionContent(sectionId, { title: 'Updated Title' });
        });

        const updatedSection = result.current.layout.sections.find(s => s.id === sectionId);
        expect(updatedSection?.content.title).toBe('Updated Title');
    });

    it('should delete a section', () => {
        const { result } = renderHook(() => useEditorState());

        // Add a section to delete
        act(() => {
            result.current.addSection('AgendaSection');
        });

        const sectionId = result.current.activeSectionId!;
        const countAfterAdd = result.current.layout.sections.length;

        act(() => {
            result.current.deleteSection(sectionId);
        });

        expect(result.current.layout.sections).toHaveLength(countAfterAdd - 1);
        expect(result.current.layout.sections.find(s => s.id === sectionId)).toBeUndefined();
        // Active section should be cleared if the deleted one was active
        expect(result.current.activeSectionId).toBeNull();
    });

    it('should move a section up', () => {
        const { result } = renderHook(() => useEditorState());

        // Default init has SplashSection (index 0) and HeroSection (index 1).
        // Let's add an Agenda section (index 2).
        act(() => {
            result.current.addSection('AgendaSection');
        });

        // Index 0: Splash
        // Index 1: Hero
        // Index 2: Agenda

        const agendaSection = result.current.layout.sections[2];
        const heroSection = result.current.layout.sections[1];

        act(() => {
            result.current.moveSection(2, 'up');
        });

        // Hero and Agenda should have swapped, but BOTH remain below Splash
        expect(result.current.layout.sections[0].type).toBe('SplashSection');
        expect(result.current.layout.sections[1].id).toBe(agendaSection.id);
        expect(result.current.layout.sections[2].id).toBe(heroSection.id);
    });

    it('should NOT allow adding multiple Splash Sections', () => {
        const { result } = renderHook(() => useEditorState());
        const initialCount = result.current.layout.sections.length;
        expect(result.current.layout.sections[0].type).toBe('SplashSection');

        act(() => {
            result.current.addSection('SplashSection');
        });

        expect(result.current.layout.sections).toHaveLength(initialCount);
    });

    it('should force Splash Section to the beginning if added later', () => {
        const { result } = renderHook(() => useEditorState());

        // Remove existing splash first
        const splashId = result.current.layout.sections[0].id;
        act(() => {
            result.current.deleteSection(splashId);
        });

        expect(result.current.layout.sections[0].type).not.toBe('SplashSection');

        act(() => {
            result.current.addSection('SplashSection');
        });

        expect(result.current.layout.sections[0].type).toBe('SplashSection');
    });

    it('should NOT allow moving anything above Splash Section', () => {
        const { result } = renderHook(() => useEditorState());

        // Index 0: Splash
        // Index 1: Hero

        const splashId = result.current.layout.sections[0].id;

        act(() => {
            result.current.moveSection(1, 'up');
        });

        // Position 0 should still be Splash
        expect(result.current.layout.sections[0].id).toBe(splashId);
    });

    it('should NOT allow moving Splash Section itself', () => {
        const { result } = renderHook(() => useEditorState());

        // Index 0: Splash
        const splashId = result.current.layout.sections[0].id;

        act(() => {
            result.current.moveSection(0, 'down');
        });

        // Still index 0
        expect(result.current.layout.sections[0].id).toBe(splashId);
    });

    it('should add a new section after the active one', () => {
        const { result } = renderHook(() => useEditorState());

        // Initial: Splash, Hero
        act(() => {
            result.current.addSection('AgendaSection');
        });
        // Now: Splash, Hero, Agenda (Active: Agenda)

        // Select Hero
        const heroId = result.current.layout.sections[1].id;
        act(() => {
            result.current.setActiveSectionId(heroId);
        });

        // Add Gifts after Hero
        act(() => {
            result.current.addSection('GiftsSection');
        });

        expect(result.current.layout.sections[2].type).toBe('GiftsSection');
        expect(result.current.layout.sections[3].type).toBe('AgendaSection');
    });

    it('should reorder sections correctly', () => {
        const { result } = renderHook(() => useEditorState());

        act(() => {
            result.current.addSection('AgendaSection'); // index 2
            result.current.addSection('GiftsSection');  // index 3
        });

        // Current: [Splash, Hero, Agenda, Gifts]
        const agendaId = result.current.layout.sections[2].id;

        act(() => {
            result.current.reorderSections(2, 3); // Move Agenda to index 3
        });

        expect(result.current.layout.sections[3].id).toBe(agendaId);
        expect(result.current.layout.sections[2].type).toBe('GiftsSection');
    });

    it('should NOT allow reordering Splash Section', () => {
        const { result } = renderHook(() => useEditorState());
        const splashId = result.current.layout.sections[0].id;

        act(() => {
            result.current.reorderSections(0, 1);
        });

        expect(result.current.layout.sections[0].id).toBe(splashId);
    });
});
