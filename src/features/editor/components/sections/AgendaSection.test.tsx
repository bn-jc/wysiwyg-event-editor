import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AgendaSection } from './AgendaSection';
import { SECTION_TEMPLATES } from '../../utils/SectionSchemaRegistry';

const mockGlobalStyles = {
    fontFamilyTitle: 'Arial',
    fontFamilyBody: 'Arial',
    primaryColor: '#000',
    secondaryColor: '#333'
};

const defaultProps = {
    section: {
        id: 'agenda-1',
        type: 'AgendaSection' as const,
        content: SECTION_TEMPLATES['AgendaSection'].defaultData
    },
    isActive: false,
    onSelect: vi.fn(),
    onUpdate: vi.fn(),
    readOnly: false,
    globalStyles: mockGlobalStyles,
    index: 0,
    device: 'desktop' as const
};

describe('AgendaSection', () => {
    it('renders correctly', () => {
        render(<AgendaSection {...defaultProps} />);
        expect(screen.getByText('Programação')).toBeInTheDocument();
        expect(screen.getByText('Cerimónia Religiosa')).toBeInTheDocument();
        expect(screen.getByText('Almoço e Recepção')).toBeInTheDocument();
    });

    it('calls onUpdate when title is edited', () => {
        const onUpdate = vi.fn();
        render(<AgendaSection {...defaultProps} onUpdate={onUpdate} />);

        const title = screen.getByText('Programação');
        fireEvent.focus(title);
        fireEvent.input(title, { target: { innerText: 'Nossa Agenda' } });
        fireEvent.blur(title);

        expect(onUpdate).toHaveBeenCalledWith({ title: 'Nossa Agenda' });
    });

    it('calls onUpdate when an item is edited', () => {
        const onUpdate = vi.fn();
        render(<AgendaSection {...defaultProps} onUpdate={onUpdate} />);

        const itemLabel = screen.getByText('Cerimónia Religiosa');
        fireEvent.focus(itemLabel);
        fireEvent.input(itemLabel, { target: { innerText: 'Missa' } });
        fireEvent.blur(itemLabel);

        expect(onUpdate).toHaveBeenCalled();
        const callArg = onUpdate.mock.calls[0][0];
        expect(callArg.items[0].label).toBe('Missa');
    });
});
