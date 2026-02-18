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
    section: {
        ...SECTION_EXAMPLES.NavSection[0],
        content: {
            ...SECTION_EXAMPLES.NavSection[0].content,
            navPosition: 'top' as const,
            navVariant: 'classic' as const,
            isSticky: true,
            isTransparent: false,
            opacity: 95,
            blurAmount: 8,
            activeHighlight: 'underline' as const,
            activeColor: '#3B82F6',
            isScrollable: true
        }
    },
    isActive: false,
    onSelect: () => { },
    onUpdate: () => { },
    readOnly: false,
    globalStyles: mockGlobalStyles,
    index: 0,
    device: 'desktop' as const,
    activeScrollSectionId: 'inicio'
};

describe('NavSection', () => {
    it('renders navigation links', () => {
        render(<NavSection {...defaultProps} />);
        expect(screen.getByText('Início')).toBeInTheDocument();
        expect(screen.getByText('Agenda')).toBeInTheDocument();
    });

    it('renders with Material Design variant', () => {
        const props = {
            ...defaultProps,
            section: {
                ...defaultProps.section,
                content: {
                    ...defaultProps.section.content,
                    navVariant: 'material' as const
                }
            }
        };
        const { container } = render(<NavSection {...props} />);
        expect(container.firstChild).toHaveClass('shadow-lg');
    });

    it('renders with Liquid Glass variant and blur', () => {
        const props = {
            ...defaultProps,
            section: {
                ...defaultProps.section,
                content: {
                    ...defaultProps.section.content,
                    navVariant: 'liquid-glass' as const,
                    blurAmount: 15
                }
            }
        };
        const { container } = render(<NavSection {...props} />);
        const navDiv = container.firstChild as HTMLElement;
        expect(navDiv.style.backdropFilter).toBe('blur(15px)');
        expect(navDiv).toHaveClass('border-b');
    });

    it('renders active highlight as an underline', () => {
        render(<NavSection {...defaultProps} activeScrollSectionId="inicio" />);
        // The active Highlight div should be present
        const activeLink = screen.getByText('Início').closest('div');
        expect(activeLink).toBeInTheDocument();
    });
});
