import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EffectsOverlay } from './EffectsOverlay';

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
    default: vi.fn()
}));

describe('EffectsOverlay', () => {
    it('renders nothing when effects is none', () => {
        const { container } = render(<EffectsOverlay effects="none" />);
        expect(container.firstChild).toBeNull();
    });

    it('renders sparkles overlay', () => {
        const { container } = render(<EffectsOverlay effects="sparkles" />);
        expect(container.querySelector('.animate-pulse')).toBeDefined();
    });

    it('renders bubbles overlay', () => {
        const { container } = render(<EffectsOverlay effects="bubbles" />);
        expect(container.querySelector('.animate-float')).toBeDefined();
    });

    it('renders balloons overlay', () => {
        const { container } = render(<EffectsOverlay effects="balloons" />);
        expect(container.querySelector('.animate-float-diagonal')).toBeDefined();
    });

    it('renders hearts overlay', () => {
        render(<EffectsOverlay effects="hearts" />);
        expect(screen.getAllByText('❤️').length).toBeGreaterThan(0);
    });

    it('renders birds overlay', () => {
        render(<EffectsOverlay effects="birds" />);
        expect(screen.getAllByText('🕊️').length).toBeGreaterThan(0);
    });

    it('renders hats overlay', () => {
        render(<EffectsOverlay effects="hats" />);
        expect(screen.getAllByText('🎓').length).toBeGreaterThan(0);
    });

    it('renders roses overlay', () => {
        render(<EffectsOverlay effects="roses" />);
        expect(screen.getAllByText('🌹').length).toBeGreaterThan(0);
    });

    it('renders rings overlay', () => {
        render(<EffectsOverlay effects="rings" />);
        expect(screen.getAllByText('💍').length).toBeGreaterThan(0);
    });

    it('renders cakes overlay', () => {
        render(<EffectsOverlay effects="cakes" />);
        expect(screen.getAllByText('🎂').length).toBeGreaterThan(0);
    });
});
