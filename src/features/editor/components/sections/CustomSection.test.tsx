import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CustomSection } from './CustomSection';

const mockGlobalStyles = {
    fontFamilyTitle: 'Arial',
    fontFamilyBody: 'Arial',
    primaryColor: '#000',
    secondaryColor: '#333'
};

describe('CustomSection', () => {
    const defaultProps = {
        section: {
            id: '1',
            type: 'CustomSection' as const,
            content: {
                elements: [
                    { type: 'text', content: 'Story Title', style: 'heading' },
                    { type: 'image', url: 'https://example.com/img.jpg' },
                    { type: 'text', content: 'Once upon a time', style: 'paragraph' }
                ]
            }
        },
        isActive: false,
        onUpdate: vi.fn(),
        onSelect: vi.fn(),
        device: 'desktop' as const
    };

    it('renders all elements correctly', () => {
        render(<CustomSection {...defaultProps} globalStyles={mockGlobalStyles} index={0} />);

        expect(screen.getByText('Story Title')).toBeInTheDocument();
        expect(screen.getByText('Once upon a time')).toBeInTheDocument();
        expect(screen.getByAltText('Custom')).toBeInTheDocument();
        expect(screen.getByAltText('Custom')).toHaveAttribute('src', 'https://example.com/img.jpg');
    });

    it('renders list items with correct tags and markers', () => {
        const listProps = {
            ...defaultProps,
            section: {
                ...defaultProps.section,
                content: {
                    elements: [
                        { type: 'list', listType: 'ordered', format: 'upper-roman', items: ['Item I', 'Item II'] },
                        { type: 'list', listType: 'unordered', format: 'diamond', items: ['Point A'] },
                        { type: 'list', listType: 'unordered', format: 'square', items: ['Point B'] }
                    ]
                }
            }
        };
        render(<CustomSection {...listProps} globalStyles={mockGlobalStyles} index={0} />);

        expect(screen.getByText('Item I')).toBeInTheDocument();
        expect(screen.getByText('Point A')).toBeInTheDocument();
        expect(screen.getByText('Point B')).toBeInTheDocument();

        // Check for ordered list tag
        const orderedList = screen.getAllByRole('list', { name: '' })[0];
        expect(orderedList.tagName).toBe('OL');

        // Check for custom marker for diamond
        expect(screen.getByText('◆')).toBeInTheDocument();

        // Check for square list class
        const squareList = screen.getAllByRole('list')[2];
        expect(squareList.className).toContain('list-[square]');
    });

    it('calls onUpdate when text is edited', () => {
        const onUpdate = vi.fn();
        render(<CustomSection {...defaultProps} onUpdate={onUpdate} globalStyles={mockGlobalStyles} index={0} />);

        const title = screen.getByText('Story Title');
        fireEvent.input(title, { target: { innerText: 'New Title' } });
        fireEvent.blur(title);

        expect(onUpdate).toHaveBeenCalledWith({
            elements: [
                { type: 'text', content: 'New Title', style: 'heading' },
                { type: 'image', url: 'https://example.com/img.jpg' },
                { type: 'text', content: 'Once upon a time', style: 'paragraph' }
            ]
        });
    });

    it('calls onUpdate when a list item is edited', () => {
        const onUpdate = vi.fn();
        const listProps = {
            ...defaultProps,
            section: {
                ...defaultProps.section,
                content: {
                    elements: [
                        { type: 'list', listType: 'unordered', items: ['Original Item'] }
                    ]
                }
            },
            onUpdate
        };
        render(<CustomSection {...listProps} globalStyles={mockGlobalStyles} index={0} />);

        const item = screen.getByText('Original Item');
        fireEvent.input(item, { target: { innerText: 'Updated Item' } });
        fireEvent.blur(item);

        expect(onUpdate).toHaveBeenCalledWith({
            elements: [
                { type: 'list', listType: 'unordered', items: ['Updated Item'] }
            ]
        });
    });
});
