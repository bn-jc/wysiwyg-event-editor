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
});
