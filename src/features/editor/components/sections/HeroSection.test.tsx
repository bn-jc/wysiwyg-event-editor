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
});
