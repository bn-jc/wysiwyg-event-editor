import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SeparatorSection } from './SeparatorSection';

const mockGlobalStyles = {
    fontFamilyTitle: 'Arial',
    fontFamilyBody: 'Arial',
    primaryColor: '#000',
    secondaryColor: '#333'
};

const getProps = (variant: string) => ({
    section: {
        id: 'sep-1',
        type: 'SeparatorSection' as const,
        content: {
            variant,
            padding: 'medium'
        }
    },
    isActive: false,
    onSelect: vi.fn(),
    onUpdate: vi.fn(),
    readOnly: false,
    globalStyles: mockGlobalStyles,
    index: 0,
    device: 'desktop' as const
});

describe('SeparatorSection', () => {
    it('renders line variant by default', () => {
        const { container } = render(<SeparatorSection {...getProps('line')} />);
        // Line variant should have a div with w-24 and h-[1px]
        const line = container.querySelector('.w-24');
        expect(line).toBeInTheDocument();
    });

    it('renders flourish variant', () => {
        const { container } = render(<SeparatorSection {...getProps('flourish')} />);
        // Flourish variant has an SVG
        expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders dots variant', () => {
        const { container } = render(<SeparatorSection {...getProps('dots')} />);
        // Dots variant has 3 dots
        const dots = container.querySelectorAll('.w-2.h-2');
        expect(dots).toHaveLength(3);
    });

    it('renders wave variant', () => {
        const { container } = render(<SeparatorSection {...getProps('wave')} />);
        expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders diamond variant', () => {
        const { container } = render(<SeparatorSection {...getProps('diamond')} />);
        expect(container.querySelector('.rotate-45')).toBeInTheDocument();
    });

    it('renders heart variant', () => {
        const { container } = render(<SeparatorSection {...getProps('heart')} />);
        expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders stars variant', () => {
        const { container } = render(<SeparatorSection {...getProps('stars')} />);
        expect(container.querySelectorAll('svg')).toHaveLength(3);
    });

    it('applies correct padding classes', () => {
        const propsSmall = { ...getProps('line') };
        propsSmall.section.content.padding = 'small';
        const { container: containerSmall } = render(<SeparatorSection {...propsSmall} />);
        expect(containerSmall.firstChild).toHaveClass('py-8');

        const propsLarge = { ...getProps('line') };
        propsLarge.section.content.padding = 'large';
        const { container: containerLarge } = render(<SeparatorSection {...propsLarge} />);
        expect(containerLarge.firstChild).toHaveClass('py-24');
    });
});
