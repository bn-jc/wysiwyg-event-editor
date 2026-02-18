import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DynamicRenderer } from './DynamicRenderer';
import type { EventLayout } from '../types';

// Mock useContainerSize to return a default 'desktop'
vi.mock('../hooks/useContainerSize', () => ({
    useContainerSize: () => ({ mode: 'desktop', width: 1024, height: 800 })
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});


// Mock BackgroundMusic
vi.mock('./BackgroundMusic', () => ({
    BackgroundMusic: ({ url }: any) => (
        <div data-testid="background-music" data-url={url}>
            Music Toggle
        </div>
    )
}));

// Mock SectionRenderer
vi.mock('./SectionRenderer', () => ({
    SectionRenderer: ({ section, onOpen, onValidate }: any) => (
        <div data-testid={`section-${section.type}`} data-has-validate={!!onValidate}>
            {section.type}
            {onOpen && (
                <button data-testid="open-btn" onClick={onOpen}>
                    Open
                </button>
            )}
        </div>
    )
}));

describe('DynamicRenderer', () => {
    const mockLayout: EventLayout = {
        id: 'test-layout',
        name: 'Test Event',
        eventType: 'wedding',
        language: 'pt-MZ',
        globalStyles: {
            primaryColor: '#000',
            secondaryColor: '#fff',
            fontFamilyTitle: 'Arial',
            fontFamilyBody: 'Arial',
            backgroundColor: '#fff'
        },
        sections: [
            { id: '1', type: 'SplashSection', content: {} },
            { id: '2', type: 'HeroSection', content: {} },
            { id: '3', type: 'AgendaSection', content: {} }
        ]
    };

    it('should show only splash screen initially in read-only mode', () => {
        render(<DynamicRenderer layout={mockLayout} readOnly={true} />);

        expect(screen.getByTestId('section-SplashSection')).toBeInTheDocument();
        // Hero and Agenda should NOT be visible yet
        expect(screen.queryByTestId('section-HeroSection')).not.toBeInTheDocument();
        expect(screen.queryByTestId('section-AgendaSection')).not.toBeInTheDocument();
    });

    it('should show all sections after clicking open in read-only mode', () => {
        render(<DynamicRenderer layout={mockLayout} readOnly={true} />);

        const openBtn = screen.getByTestId('open-btn');
        fireEvent.click(openBtn);

        // Splash should be GONE
        expect(screen.queryByTestId('section-SplashSection')).not.toBeInTheDocument();

        // Hero and Agenda SHOULD be visible
        expect(screen.getByTestId('section-HeroSection')).toBeInTheDocument();
        expect(screen.getByTestId('section-AgendaSection')).toBeInTheDocument();
    });

    it('should show all sections immediately in edit mode (readOnly=false)', () => {
        render(<DynamicRenderer layout={mockLayout} readOnly={false} />);

        expect(screen.getByTestId('section-SplashSection')).toBeInTheDocument();
        expect(screen.getByTestId('section-HeroSection')).toBeInTheDocument();
        expect(screen.getByTestId('section-AgendaSection')).toBeInTheDocument();
    });
    it('should show all section types in a full layout', () => {
        const fullLayout: EventLayout = {
            ...mockLayout,
            sections: [
                { id: '1', type: 'SplashSection', content: {} },
                { id: '2', type: 'HeroSection', content: {} },
                { id: '3', type: 'AgendaSection', content: {} },
                { id: '4', type: 'RSVPSection', content: {} },
                { id: '5', type: 'GuestbookSection', content: {} },
                { id: '6', type: 'CountdownSection', content: {} },
                { id: '7', type: 'SeparatorSection', content: {} },
                { id: '8', type: 'CustomSection', content: {} }
            ]
        };

        render(<DynamicRenderer layout={fullLayout} readOnly={false} />);

        // Verify all sections are present
        expect(screen.getByTestId('section-SplashSection')).toBeInTheDocument();
        expect(screen.getByTestId('section-HeroSection')).toBeInTheDocument();
        expect(screen.getByTestId('section-AgendaSection')).toBeInTheDocument();
        expect(screen.getByTestId('section-RSVPSection')).toBeInTheDocument();
        expect(screen.getByTestId('section-GuestbookSection')).toBeInTheDocument();
        expect(screen.getByTestId('section-CountdownSection')).toBeInTheDocument();
        expect(screen.getByTestId('section-SeparatorSection')).toBeInTheDocument();
        expect(screen.getByTestId('section-CustomSection')).toBeInTheDocument();
    });

    it('should render background music when musicUrl is present in read-only mode', () => {
        const musicLayout: EventLayout = {
            ...mockLayout,
            musicUrl: 'https://example.com/music.mp3'
        };

        render(<DynamicRenderer layout={musicLayout} readOnly={true} />);

        // Should NOT render music yet because splash is showing
        expect(screen.queryByTestId('background-music')).not.toBeInTheDocument();

        // Dismiss splash
        const openBtn = screen.getByTestId('open-btn');
        fireEvent.click(openBtn);

        // Now music should be visible
        expect(screen.getByTestId('background-music')).toBeInTheDocument();
        expect(screen.getByTestId('background-music')).toHaveAttribute('data-url', 'https://example.com/music.mp3');
    });

    it('should NOT render background music in edit mode even if musicUrl is present', () => {
        const musicLayout: EventLayout = {
            ...mockLayout,
            musicUrl: 'https://example.com/music.mp3'
        };

        render(<DynamicRenderer layout={musicLayout} readOnly={false} />);

        expect(screen.queryByTestId('background-music')).not.toBeInTheDocument();
    });

    it('should respect the isDark prop and synchronize local state', () => {
        const { rerender } = render(<DynamicRenderer layout={mockLayout} isDark={true} readOnly={true} />);

        // Check if the toggle button reflects dark mode (renders Sun icon)
        expect(screen.getByTitle('Mudar para modo claro')).toBeInTheDocument();

        // Rerender with light mode
        rerender(<DynamicRenderer layout={mockLayout} isDark={false} readOnly={true} />);
        expect(screen.getByTitle('Mudar para modo escuro')).toBeInTheDocument();
    });

    it('should pass onValidate to SectionRenderer', () => {
        const onValidate = vi.fn();
        const fullLayout: EventLayout = {
            ...mockLayout,
            sections: [{ id: '4', type: 'RSVPSection', content: {} }]
        };

        render(<DynamicRenderer layout={fullLayout} readOnly={false} onValidate={onValidate} />);

        // Check if SectionRenderer mock received onValidate (via data-has-validate attribute)
        const section = screen.getByTestId('section-RSVPSection');
        expect(section).toHaveAttribute('data-has-validate', 'true');
    });
});
