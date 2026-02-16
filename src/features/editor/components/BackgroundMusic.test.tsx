import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BackgroundMusic } from './BackgroundMusic';

describe('BackgroundMusic', () => {
    const musicUrl = 'https://example.com/music.mp3';

    beforeEach(() => {
        vi.clearAllMocks();
        // Mock HTMLMediaElement prototype
        window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
        window.HTMLMediaElement.prototype.pause = vi.fn();
    });

    it('renders nothing when no url is provided', () => {
        const { container } = render(<BackgroundMusic url={undefined} />);
        expect(container.firstChild).toBeNull();
    });

    it('renders play/pause button when url is provided', () => {
        render(<BackgroundMusic url={musicUrl} />);
        const button = screen.getByTitle(/Música/i);
        expect(button).toBeDefined();
    });

    it('toggles play/pause state when clicked', async () => {
        render(<BackgroundMusic url={musicUrl} />);
        const button = screen.getByTitle(/Música/i);

        // Initially paused (VolumeX)
        expect(button.querySelector('svg')).toBeDefined();

        // First click (interaction)
        fireEvent.click(button);

        // Should show Volume2 (Pausar Música)
        expect(screen.getByTitle('Pausar Música')).toBeDefined();
        expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();

        // Second click
        fireEvent.click(button);
        expect(screen.getByTitle('Reproduzir Música')).toBeDefined();
        expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    });
});
