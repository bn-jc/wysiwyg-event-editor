import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditorCanvas } from './EditorCanvas';

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
};

// Mock DynamicRenderer
vi.mock('./components/DynamicRenderer', () => ({
    DynamicRenderer: ({ layout, onSectionSelect }: any) => (
        <div data-testid="dynamic-renderer">
            {layout.sections.map((section: any) => (
                <div
                    key={section.id}
                    data-testid={`section-${section.type}`}
                    onClick={() => onSectionSelect && onSectionSelect(section.id)}
                    style={section.styles}
                >
                    {section.type}: {section.id}
                </div>
            ))}
        </div>
    )
}));

// Mock Sidebar
vi.mock('./Sidebar', () => ({
    Sidebar: ({ onAddSection }: any) => (
        <div data-testid="sidebar">
            <button onClick={() => onAddSection('HeroSection')}>Add Hero</button>
            <button onClick={() => onAddSection('AgendaSection')}>Add Agenda</button>
        </div>
    )
}));

// Mock PropertyEditor
vi.mock('./components/PropertyEditor', () => ({
    PropertyEditor: ({ section, onDelete, onUpdateStyles, onMove }: any) => (
        <div data-testid="property-editor">
            <span>Editing {section.type}</span>
            <button onClick={() => onUpdateStyles({ backgroundColor: '#ff0000' })}>Set Red Background</button>
            <button onClick={() => onMove('up')} title="Mover para cima">Up</button>
            <button onClick={() => onMove('down')} title="Mover para baixo">Down</button>
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
        const heroSections = screen.getAllByTestId('section-HeroSection');
        // Initial state has 1 HeroSection + 1 new HeroSection = 2
        expect(heroSections.length).toBeGreaterThanOrEqual(2);
    });

    it('should show property editor when a section is selected', () => {
        render(<EditorCanvas />);

        // Find splash section (initially present)
        const splashSection = screen.getByTestId('section-SplashSection');
        fireEvent.click(splashSection);

        expect(screen.getByTestId('property-editor')).toBeInTheDocument();
        expect(screen.getByText(/Editing SplashSection/i)).toBeInTheDocument();
    });

    it('should delete a section when clicking delete in property editor', () => {
        render(<EditorCanvas />);

        // Select splash section
        const splashSection = screen.getByTestId('section-SplashSection');
        fireEvent.click(splashSection);

        // Click delete in property editor
        const deleteBtn = screen.getByText('ELIMINAR SEÇÃO');
        fireEvent.click(deleteBtn);

        // Splash section should be gone
        expect(screen.queryByTestId('section-SplashSection')).not.toBeInTheDocument();
        expect(screen.queryByTestId('property-editor')).not.toBeInTheDocument();
    });

    it('should NOT move a section when it violates Splash constraints', () => {
        render(<EditorCanvas />);

        // Initially we have Splash (index 0) and Hero (index 1)
        const splashSection = screen.getByTestId('section-SplashSection');
        fireEvent.click(splashSection);

        // Try to move splash down
        const moveDownBtn = screen.getByTitle('Mover para baixo');
        fireEvent.click(moveDownBtn);

        // Splash should STILL be at index 0
        let sections = screen.getAllByTestId(/section-/);
        expect(sections[0]).toHaveAttribute('data-testid', 'section-SplashSection');
        expect(sections[1]).toHaveAttribute('data-testid', 'section-HeroSection');

        // Now select Hero and try to move UP
        const heroSection = screen.getByTestId('section-HeroSection');
        fireEvent.click(heroSection);

        const moveUpBtn = screen.getByTitle('Mover para cima');
        fireEvent.click(moveUpBtn);

        // Hero should STILL be at index 1 (below Splash)
        sections = screen.getAllByTestId(/section-/);
        expect(sections[0]).toHaveAttribute('data-testid', 'section-SplashSection');
        expect(sections[1]).toHaveAttribute('data-testid', 'section-HeroSection');
    });

    it('should add new section to the bottom and select it', () => {
        render(<EditorCanvas />);
        const addAgendaBtn = screen.getByText('Add Agenda');
        fireEvent.click(addAgendaBtn);

        const sections = screen.getAllByTestId(/section-/);
        const lastSection = sections[sections.length - 1];
        expect(lastSection).toHaveAttribute('data-testid', 'section-AgendaSection');

        // Should also open property editor for it
        expect(screen.getByText(/Editing AgendaSection/i)).toBeInTheDocument();
    });

    it('should update section styles when changed in property editor', () => {
        render(<EditorCanvas />);

        // Select splash section
        const splashSection = screen.getByTestId('section-SplashSection');
        fireEvent.click(splashSection);

        // Click set red background
        const styleBtn = screen.getByText('Set Red Background');
        fireEvent.click(styleBtn);

        // Verify splash section now has red background style
        const updatedSplash = screen.getByTestId('section-SplashSection');
        expect(updatedSplash.style.backgroundColor).toBe('rgb(255, 0, 0)');
    });
});
