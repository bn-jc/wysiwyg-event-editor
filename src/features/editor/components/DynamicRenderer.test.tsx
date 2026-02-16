import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DynamicRenderer } from './DynamicRenderer';
import type { EventLayout } from '../types';

// Mock useContainerSize to return a default 'desktop'
vi.mock('../hooks/useContainerSize', () => ({
    useContainerSize: () => ({ mode: 'desktop', width: 1024, height: 800 })
}));

// Mock SectionRenderer
vi.mock('./SectionRenderer', () => ({
    SectionRenderer: ({ section, onOpen }: any) => (
        <div data-testid={`section-${section.type}`}>
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
});
