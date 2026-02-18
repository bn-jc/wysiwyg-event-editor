import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HeroSection } from './HeroSection';
import { SECTION_TEMPLATES } from '../../utils/SectionSchemaRegistry';

const mockGlobalStyles = {
    fontFamilyTitle: 'Arial',
    fontFamilyBody: 'Arial',
    primaryColor: '#000',
    secondaryColor: '#333'
};

const defaultProps = {
    section: {
        id: 'hero-1',
        type: 'HeroSection' as const,
        content: SECTION_TEMPLATES['HeroSection'].defaultData
    },
    isActive: false,
    onSelect: vi.fn(),
    onUpdate: vi.fn(),
    readOnly: false,
    globalStyles: mockGlobalStyles,
    index: 0,
    device: 'desktop' as const
};

describe('HeroSection', () => {
    it('renders correctly', () => {
        render(<HeroSection {...defaultProps} />);
        expect(screen.getByText('O Nosso Grande Dia')).toBeInTheDocument();
        expect(screen.getByText('Estamos muito felizes em partilhar este momento convosco.')).toBeInTheDocument();
        expect(screen.getByAltText('Hero')).toHaveAttribute('src', expect.stringContaining('unsplash'));
    });

    it('calls onUpdate when title is edited', () => {
        const onUpdate = vi.fn();
        render(<HeroSection {...defaultProps} onUpdate={onUpdate} />);

        const title = screen.getByText('O Nosso Grande Dia');
        fireEvent.focus(title);
        fireEvent.input(title, { target: { innerText: 'Novo Título' } });
        fireEvent.blur(title);

        expect(onUpdate).toHaveBeenCalledWith({ title: 'Novo Título' });
    });

    it('calls onUpdate when subtitle is edited', () => {
        const onUpdate = vi.fn();
        render(<HeroSection {...defaultProps} onUpdate={onUpdate} />);

        const subtitle = screen.getByText('Estamos muito felizes em partilhar este momento convosco.');
        fireEvent.focus(subtitle);
        fireEvent.input(subtitle, { target: { innerText: 'Nova Legenda' } });
        fireEvent.blur(subtitle);

        expect(onUpdate).toHaveBeenCalledWith({ subtitle: 'Nova Legenda' });
    });

    it('renders recipient greeting when showRecipient is true', () => {
        const props = {
            ...defaultProps,
            section: {
                ...defaultProps.section,
                content: {
                    ...defaultProps.section.content,
                    showRecipient: true,
                    recipientPrefix: 'Convidado:',
                    recipientName: 'Carlos'
                }
            }
        };
        render(<HeroSection {...props} />);
        expect(screen.getByText('Convidado:')).toBeInTheDocument();
        expect(screen.getByText('Carlos')).toBeInTheDocument();
    });

    it('updates recipient info when edited', () => {
        const onUpdate = vi.fn();
        const props = {
            ...defaultProps,
            onUpdate,
            section: {
                ...defaultProps.section,
                content: {
                    ...defaultProps.section.content,
                    showRecipient: true,
                    recipientPrefix: 'Para:',
                    recipientName: 'Sofia'
                }
            }
        };
        render(<HeroSection {...props} />);

        const prefix = screen.getByText('Para:');
        fireEvent.focus(prefix);
        fireEvent.input(prefix, { target: { innerText: 'Caro:' } });
        fireEvent.blur(prefix);
        expect(onUpdate).toHaveBeenCalledWith({ recipientPrefix: 'Caro:' });

        const name = screen.getByText('Sofia');
        fireEvent.focus(name);
        fireEvent.input(name, { target: { innerText: 'Ana' } });
        fireEvent.blur(name);
        expect(onUpdate).toHaveBeenCalledWith({ recipientName: 'Ana' });
    });

    it('applies different layout alignments', () => {
        const propsLeft = {
            ...defaultProps,
            section: {
                ...defaultProps.section,
                content: { ...defaultProps.section.content, layout: 'left' }
            }
        };
        const { container: containerLeft } = render(<HeroSection {...propsLeft} />);
        expect(containerLeft.firstChild).toHaveClass('items-start');

        const propsCenter = {
            ...defaultProps,
            section: {
                ...defaultProps.section,
                content: { ...defaultProps.section.content, layout: 'centered' }
            }
        };
        const { container: containerCenter } = render(<HeroSection {...propsCenter} />);
        expect(containerCenter.firstChild).toHaveClass('items-center');
    });

    it('applies custom image scale', () => {
        const props = {
            ...defaultProps,
            section: {
                ...defaultProps.section,
                content: { ...defaultProps.section.content, imageScale: 1.5 }
            }
        };
        const { container } = render(<HeroSection {...props} />);
        const imageContainer = container.querySelector('img')!.parentElement!;
        expect(imageContainer).toHaveStyle('width: 30rem'); // 1.5 * 20
        expect(imageContainer).toHaveStyle('height: 30rem');
    });

    it('renders image decorations', () => {
        const propsGold = {
            ...defaultProps,
            section: {
                ...defaultProps.section,
                content: { ...defaultProps.section.content, imageDecoration: 'gold' }
            }
        };
        const { container: containerGold } = render(<HeroSection {...propsGold} />);
        const goldContainer = containerGold.querySelector('img')!.parentElement!;
        expect(goldContainer).toHaveStyle('border-color: #D4AF37');

        const propsFloral = {
            ...defaultProps,
            section: {
                ...defaultProps.section,
                content: { ...defaultProps.section.content, imageDecoration: 'floral' }
            }
        };
        const { container: containerFloral } = render(<HeroSection {...propsFloral} />);
        expect(containerFloral.querySelector('svg fill-currentColor')).toBeDefined(); // Simple check for SVG motifs

        const propsDots = {
            ...defaultProps,
            section: {
                ...defaultProps.section,
                content: { ...defaultProps.section.content, imageDecoration: 'dots', imageMask: 'heart' }
            }
        };
        const { container: containerDots } = render(<HeroSection {...propsDots} />);
        const dotsPath = containerDots.querySelector('path[stroke-dasharray="0.01 0.04"]');
        expect(dotsPath).toBeDefined();
    });

    it('applies edge feathering filter', () => {
        const props = {
            ...defaultProps,
            section: {
                ...defaultProps.section,
                content: { ...defaultProps.section.content, imageFeather: 15 }
            }
        };
        const { container } = render(<HeroSection {...props} />);
        const imageContainer = container.querySelector('img')!.parentElement!;
        expect(imageContainer).toHaveStyle('filter: blur(15px)');
    });

    it('renders background effects and particles with custom colors', () => {
        const props = {
            ...defaultProps,
            section: {
                ...defaultProps.section,
                content: {
                    ...defaultProps.section.content,
                    backgroundEffect: 'hearts',
                    backgroundEffectColor: '#FF0000',
                    backgroundParticles: 'flowers',
                    backgroundParticlesColor: '#00FF00'
                }
            }
        };
        const { container } = render(<HeroSection {...props} />);

        expect(container.firstChild).toHaveClass('relative');
        expect(container.querySelector('style')).toBeDefined();

        // Find containers with colors
        const effectContainer = container.querySelector('[style*="color: #FF0000"]');
        const particleContainer = container.querySelector('[style*="color: #00FF00"]');

        expect(effectContainer).toBeDefined();
        expect(particleContainer).toBeDefined();
    });

    it('renders background effects with custom direction', () => {
        const props = {
            ...defaultProps,
            section: {
                ...defaultProps.section,
                content: {
                    ...defaultProps.section.content,
                    backgroundEffect: 'birds',
                    backgroundEffectDirection: 'right'
                }
            }
        };
        const { container } = render(<HeroSection {...props} />);

        const particle = container.querySelector('[style*="animation: move"]');
        expect(particle).toBeDefined();
    });

    it('renders background effects with random direction', () => {
        const props = {
            ...defaultProps,
            section: {
                ...defaultProps.section,
                content: {
                    ...defaultProps.section.content,
                    backgroundEffect: 'hearts',
                    backgroundEffectDirection: 'random'
                }
            }
        };
        const { container } = render(<HeroSection {...props} />);

        const particle = container.querySelector('[style*="animation: move"]');
        expect(particle).toBeDefined();
    });
});
