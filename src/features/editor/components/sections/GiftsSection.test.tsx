import { describe, it, expect, vitest } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GiftsSection } from './GiftsSection';
import type { SectionDefinition } from '../../types';

const mockGlobalStyles = {
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    fontFamilyTitle: 'Arial',
    fontFamilyBody: 'Arial'
};

const mockSection: SectionDefinition = {
    id: 'test-gifts',
    type: 'GiftsSection',
    content: {
        title: 'Lista de Presentes',
        description: 'A sua presença é o nosso maior presente...',
        giftItems: [
            { id: '1', name: 'Presente 1', description: 'Desc 1', icon: 'gift' }
        ],
        bankDetails: {
            bankName: 'Banco Teste',
            accountName: 'Titular Teste'
        },
        showGifts: true,
        showBankDetails: true
    }
};

describe('GiftsSection', () => {
    it('renders title and description', () => {
        render(
            <GiftsSection
                section={mockSection}
                globalStyles={mockGlobalStyles}
                onUpdate={vitest.fn()}
                readOnly={true}
                isActive={false}
                onSelect={vitest.fn()}
                index={0}
                device="desktop"
            />
        );
        expect(screen.getByText('Lista de Presentes')).toBeDefined();
        expect(screen.getByText('A sua presença é o nosso maior presente...')).toBeDefined();
    });

    it('renders gift items when showGifts is true', () => {
        render(
            <GiftsSection
                section={mockSection}
                globalStyles={mockGlobalStyles}
                onUpdate={vitest.fn()}
                readOnly={true}
                isActive={false}
                onSelect={vitest.fn()}
                index={0}
                device="desktop"
            />
        );
        expect(screen.getByText('Presente 1')).toBeDefined();
        expect(screen.getByText('Desc 1')).toBeDefined();
    });

    it('renders bank details when showBankDetails is true', () => {
        render(
            <GiftsSection
                section={mockSection}
                globalStyles={mockGlobalStyles}
                onUpdate={vitest.fn()}
                readOnly={true}
                isActive={false}
                onSelect={vitest.fn()}
                index={0}
                device="desktop"
            />
        );
        expect(screen.getByText('Dados Bancários')).toBeDefined();
        expect(screen.getByText('Banco Teste')).toBeDefined();
        expect(screen.getByText('Titular Teste')).toBeDefined();
    });

    it('hides elements when showGifts or showBankDetails is false', () => {
        const hiddenSection = {
            ...mockSection,
            content: {
                ...mockSection.content,
                showGifts: false,
                showBankDetails: false
            }
        };
        render(
            <GiftsSection
                section={hiddenSection}
                globalStyles={mockGlobalStyles}
                onUpdate={vitest.fn()}
                readOnly={true}
                isActive={false}
                onSelect={vitest.fn()}
                index={0}
                device="desktop"
            />
        );
        expect(screen.queryByText('Presente 1')).toBeNull();
        expect(screen.queryByText('Dados Bancários')).toBeNull();
    });

    it('renders gift items with images and links', () => {
        const sectionWithMedia: SectionDefinition = {
            ...mockSection,
            content: {
                ...mockSection.content,
                giftItems: [
                    {
                        id: 'media-1',
                        name: 'Item com Foto',
                        description: 'Desc',
                        icon: 'gift',
                        imageUrl: 'https://example.com/item.jpg',
                        linkUrl: 'https://example.com/buy'
                    }
                ]
            }
        };
        render(
            <GiftsSection
                section={sectionWithMedia}
                globalStyles={mockGlobalStyles}
                onUpdate={vitest.fn()}
                readOnly={true}
                isActive={false}
                onSelect={vitest.fn()}
                index={0}
                device="desktop"
            />
        );

        // Verify image
        const img = screen.getByAltText('Item com Foto') as HTMLImageElement;
        expect(img).toBeDefined();
        expect(img.src).toBe('https://example.com/item.jpg');

        // Verify link button
        const link = screen.getByRole('link', { name: /Ver Detalhes \/ Comprar/i });
        expect(link).toBeDefined();
        expect(link.getAttribute('href')).toBe('https://example.com/buy');
    });
});
