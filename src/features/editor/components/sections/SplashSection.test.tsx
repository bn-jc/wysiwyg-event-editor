import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SplashSection } from './SplashSection';
import { SECTION_TEMPLATES } from '../../utils/SectionSchemaRegistry';

const mockGlobalStyles = {
    fontFamilyTitle: 'Arial',
    fontFamilyBody: 'Arial',
    primaryColor: '#000',
    secondaryColor: '#333'
};

const defaultProps = {
    section: {
        id: 'splash-1',
        type: 'SplashSection' as const,
        content: SECTION_TEMPLATES['SplashSection'].defaultData
    },
    isActive: false,
    onSelect: vi.fn(),
    onUpdate: vi.fn(),
    readOnly: false,
    globalStyles: mockGlobalStyles,
    index: 0,
    device: 'desktop' as const
};

describe('SplashSection', () => {
    it('renders correctly', () => {
        render(<SplashSection {...defaultProps} />);
        expect(screen.getByText('Bem-vindos ao nosso evento')).toBeInTheDocument();
        expect(screen.getByText('John & Jane')).toBeInTheDocument();
        expect(screen.getByText('12 de Dezembro de 2026')).toBeInTheDocument();
        expect(screen.getByAltText('Background')).toHaveAttribute('src', expect.stringContaining('unsplash'));
    });

    it('calls onUpdate when title is edited', () => {
        const onUpdate = vi.fn();
        render(<SplashSection {...defaultProps} onUpdate={onUpdate} />);

        const title = screen.getByText('Bem-vindos ao nosso evento');
        fireEvent.focus(title);
        fireEvent.input(title, { target: { innerText: 'Welcome' } });
        fireEvent.blur(title);

        expect(onUpdate).toHaveBeenCalledWith({ title: 'Welcome' });
    });

    it('calls onUpdate when names is edited', () => {
        const onUpdate = vi.fn();
        render(<SplashSection {...defaultProps} onUpdate={onUpdate} />);

        const names = screen.getByText('John & Jane');
        fireEvent.focus(names);
        fireEvent.input(names, { target: { innerText: 'Alice & Bob' } });
        fireEvent.blur(names);

        expect(onUpdate).toHaveBeenCalledWith({ names: 'Alice & Bob' });
    });
});
