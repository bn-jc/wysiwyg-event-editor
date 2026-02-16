import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PublicInvitation } from './PublicInvitation';
import { EventLayout } from '../types';

// Mock dependencies
vi.mock('./DynamicRenderer', () => ({
    DynamicRenderer: ({ readOnly, device }: any) => (
        <div data-testid="dynamic-renderer">
            Renderer (ReadOnly: {String(readOnly)}, Device: {device})
        </div>
    )
}));

vi.mock('./BackgroundMusic', () => ({
    BackgroundMusic: ({ url }: any) => <div data-testid="background-music">{url}</div>
}));

vi.mock('./EffectsOverlay', () => ({
    EffectsOverlay: ({ effects }: any) => <div data-testid="effects-overlay">{effects}</div>
}));

describe('PublicInvitation', () => {
    const mockLayout: EventLayout = {
        id: 'test-layout',
        name: 'Test Event',
        eventType: 'wedding',
        language: 'pt-PT',
        musicUrl: 'http://music.com/song.mp3',
        effects: 'confetti',
        globalStyles: {
            primaryColor: '#000',
            secondaryColor: '#fff',
            fontFamilyTitle: 'Arial',
            fontFamilyBody: 'Helvetica',
            backgroundColor: '#f0f0f0'
        },
        sections: []
    };

    it('renders all components correctly', () => {
        render(<PublicInvitation layout={mockLayout} />);

        expect(screen.getByTestId('dynamic-renderer')).toBeDefined();
        expect(screen.getByTestId('background-music')).toBeDefined();
        expect(screen.getByTestId('effects-overlay')).toBeDefined();
    });

    it('passes correct props to DynamicRenderer', () => {
        render(<PublicInvitation layout={mockLayout} />);

        const renderer = screen.getByTestId('dynamic-renderer');
        expect(renderer.textContent).toContain('ReadOnly: true');
        expect(renderer.textContent).toContain('Device: desktop');
    });

    it('passes layout data to music and effects', () => {
        render(<PublicInvitation layout={mockLayout} />);

        expect(screen.getByTestId('background-music').textContent).toBe(mockLayout.musicUrl);
        expect(screen.getByTestId('effects-overlay').textContent).toBe(mockLayout.effects);
    });

    it('applies background color from global styles', () => {
        const { container } = render(<PublicInvitation layout={mockLayout} />);

        // The outer div should have the background style
        const outerDiv = container.firstChild as HTMLElement;
        expect(outerDiv.style.backgroundColor).toBe('rgb(240, 240, 240)');
    });
});
