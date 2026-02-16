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

        // Clear default sections for predictable state or just append known ones
        // Default init has SplashSection (index 0) and HeroSection (index 1) usually.
        // Let's add two distinct ones to be sure.

        // Actually, let's just use what we have.
        // Index 0: Section A
        // Index 1: Section B

        // If we move index 1 UP, it should become index 0.

        const initialSections = result.current.layout.sections;
        if (initialSections.length < 2) {
            act(() => {
                result.current.addSection('HeroSection');
            });
        }

        const sectionAt0 = result.current.layout.sections[0];
        const sectionAt1 = result.current.layout.sections[1];

        act(() => {
            result.current.moveSection(1, 'up');
        });

        expect(result.current.layout.sections[0].id).toBe(sectionAt1.id);
        expect(result.current.layout.sections[1].id).toBe(sectionAt0.id);
    });
});
