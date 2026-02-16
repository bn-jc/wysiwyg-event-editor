import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditorCanvas } from './EditorCanvas';
import React from 'react';

// Mock DynamicRenderer
vi.mock('./components/DynamicRenderer', () => ({
    DynamicRenderer: ({ layout, onSectionSelect }: any) => (
        <div data-testid="dynamic-renderer">
            {layout.sections.map((section: any) => (
                <div
                    key={section.id}
                    data-testid={`section-${section.templateId}`}
                    onClick={() => onSectionSelect && onSectionSelect(section.id)}
                >
                    {section.templateId}: {section.id}
                </div>
            ))}
        </div>
    )
}));

// Mock Sidebar
vi.mock('./Sidebar', () => ({
    Sidebar: ({ onAddSection }: any) => (
        <div data-testid="sidebar">
            <button onClick={() => onAddSection('hero-01')}>Add Hero</button>
            <button onClick={() => onAddSection('agenda-01')}>Add Agenda</button>
        </div>
    )
}));

// Mock PropertyEditor
vi.mock('./components/PropertyEditor', () => ({
    PropertyEditor: ({ section, onDelete }: any) => (
        <div data-testid="property-editor">
            <span>Editing {section.templateId}</span>
            <button onClick={onDelete}>ELIMINAR SEÇÃO</button>
        </div>
    )
}));

describe('EditorCanvas Integration', () => {
    it('should render the editor toolbar with premium title', () => {
        render(<EditorCanvas />);
        expect(screen.getByText(/CONVITE PREMIUM/i)).toBeInTheDocument();
    });

    it('should add a section when clicking the button in sidebar', () => {
        render(<EditorCanvas />);
        const addHeroBtn = screen.getByText('Add Hero');
        fireEvent.click(addHeroBtn);

        // DynamicRenderer should now show the new section
        const heroSections = screen.getAllByTestId('section-hero-01');
        // Initial state has 1 hero-01 + 1 new hero-01 = 2
        expect(heroSections.length).toBeGreaterThanOrEqual(2);
    });

    it('should show property editor when a section is selected', () => {
        render(<EditorCanvas />);

        // Find splash section (initially present)
        const splashSection = screen.getByTestId('section-splash-01');
        fireEvent.click(splashSection);

        expect(screen.getByTestId('property-editor')).toBeInTheDocument();
        expect(screen.getByText(/Editing splash-01/i)).toBeInTheDocument();
    });

    it('should delete a section when clicking delete in property editor', () => {
        render(<EditorCanvas />);

        // Select splash section
        const splashSection = screen.getByTestId('section-splash-01');
        fireEvent.click(splashSection);

        // Click delete in property editor
        const deleteBtn = screen.getByText('ELIMINAR SEÇÃO');
        fireEvent.click(deleteBtn);

        // Splash section should be gone
        expect(screen.queryByTestId('section-splash-01')).not.toBeInTheDocument();
        expect(screen.queryByTestId('property-editor')).not.toBeInTheDocument();
    });

    it('should switch view modes and hide sidebar in preview', () => {
        render(<EditorCanvas />);

        // Check sidebar is visible initially
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();

        // Switch to preview
        const previewBtn = screen.getByText('PREVER');
        fireEvent.click(previewBtn);

        // Sidebar should be hidden in preview mode
        expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument();
    });
});
