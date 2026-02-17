import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NavSection } from './NavSection';
import { SECTION_EXAMPLES } from '../../utils/SectionExamples';

const mockGlobalStyles = {
    fontFamilyTitle: 'Arial',
    fontFamilyBody: 'Arial',
    primaryColor: '#000',
    secondaryColor: '#333'
};

const defaultProps = {
    section: SECTION_EXAMPLES.NavSection[0],
    isActive: false,
    onSelect: () => { },
    onUpdate: () => { },
    readOnly: false,
    globalStyles: mockGlobalStyles,
    index: 0,
    device: 'desktop' as const
};

describe('NavSection', () => {
    it('renders navigation links', () => {
        render(<NavSection {...defaultProps} />);
        expect(screen.getByText('Início')).toBeInTheDocument();
        expect(screen.getByText('Agenda')).toBeInTheDocument();
        expect(screen.getByText('Local')).toBeInTheDocument();
        expect(screen.getByText('Gifts')).toBeInTheDocument();
    });

    it('applies custom background and text color', () => {
        const props = {
            ...defaultProps,
            section: {
                ...defaultProps.section,
                content: {
                    ...defaultProps.section.content,
                    backgroundColor: 'rgb(0, 0, 0)',
                    textColor: 'rgb(255, 255, 255)'
                }
            }
        };
        const { container } = render(<NavSection {...props} />);
        const navDiv = container.firstChild as HTMLElement;
        expect(navDiv.style.backgroundColor).toBe('rgb(0, 0, 0)');
        expect(navDiv.style.color).toBe('rgb(255, 255, 255)');
    });
});
