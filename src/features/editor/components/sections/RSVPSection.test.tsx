import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RSVPSection } from './RSVPSection';
import { SECTION_TEMPLATES } from '../../utils/SectionSchemaRegistry';

const mockGlobalStyles = {
    fontFamilyTitle: 'Arial',
    fontFamilyBody: 'Arial',
    primaryColor: '#000',
    secondaryColor: '#333'
};

const defaultProps = {
    section: {
        id: '1',
        type: 'RSVPSection' as const,
        content: SECTION_TEMPLATES['RSVPSection'].defaultData
    },
    isActive: false,
    onSelect: vi.fn(),
    onUpdate: vi.fn(),
    readOnly: false,
    globalStyles: mockGlobalStyles,
    index: 0,
    device: 'desktop' as const
};

describe('RSVPSection', () => {
    it('renders correctly', () => {
        render(<RSVPSection {...defaultProps} />);
        expect(screen.getByText('Confirme a sua Presença')).toBeInTheDocument();
        expect(screen.getByText('Até 30 de Novembro')).toBeInTheDocument();
    });

    it('displays the attendance dropdown', () => {
        render(<RSVPSection {...defaultProps} />);
        const dropdown = screen.getByRole('combobox');
        expect(dropdown).toBeInTheDocument();
        expect(screen.getByText('Selecione uma opção')).toBeInTheDocument();
        expect(screen.getByText('Sim, Eu vou!')).toBeInTheDocument();
    });

    it('has readonly inputs to prevent direct editing in editor mode', () => {
        render(<RSVPSection {...defaultProps} readOnly={false} />);
        const nameInput = screen.getByPlaceholderText(/Ex: Maria & João Silva/i);
        expect(nameInput).toHaveAttribute('readonly');
    });

    it('has interactive inputs in public/preview mode (readOnly=true)', () => {
        render(<RSVPSection {...defaultProps} readOnly={true} />);
        const nameInput = screen.getByPlaceholderText(/Ex: Maria & João Silva/i);
        expect(nameInput).not.toHaveAttribute('readonly');
    });

    it('calls onUpdate when title is edited via InlineText', () => {
        const onUpdate = vi.fn();
        render(<RSVPSection {...defaultProps} onUpdate={onUpdate} />);

        const title = screen.getByText('Confirme a sua Presença');
        fireEvent.focus(title);
        fireEvent.input(title, { target: { innerText: 'Nova Confirmação' } });
        fireEvent.blur(title);

        expect(onUpdate).toHaveBeenCalledWith({ title: 'Nova Confirmação' });
    });

    it('calls onUpdate when deadline is edited via InlineText', () => {
        const onUpdate = vi.fn();
        render(<RSVPSection {...defaultProps} onUpdate={onUpdate} />);

        const deadline = screen.getByText('Até 30 de Novembro');
        fireEvent.focus(deadline);
        fireEvent.input(deadline, { target: { innerText: 'Até 15 de Outubro' } });
        fireEvent.blur(deadline);

        expect(onUpdate).toHaveBeenCalledWith({ deadline: 'Até 15 de Outubro' });
    });

    it('calls onInteraction when form is submitted in read-only mode', () => {
        const onInteraction = vi.fn();
        const onValidate = vi.fn().mockReturnValue(true);
        render(<RSVPSection {...defaultProps} readOnly={true} onInteraction={onInteraction} onValidate={onValidate} />);

        // Fill form
        const nameInput = screen.getByPlaceholderText(/Ex: Maria & João Silva/i);
        const contactInput = screen.getByPlaceholderText(/seu-email@exemplo.com/i);
        const submitButton = screen.getByText(/Confirmar Agora/i);

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(contactInput, { target: { value: 'john@example.com' } });

        // Select attendance
        const dropdown = screen.getByRole('combobox');
        fireEvent.change(dropdown, { target: { value: 'Sim, Eu vou!' } });

        fireEvent.click(submitButton);

        expect(onValidate).toHaveBeenCalledWith('rsvp-contact', 'john@example.com', expect.any(Object));
        expect(onInteraction).toHaveBeenCalledWith(expect.objectContaining({
            type: 'RSVP_SUBMIT',
            payload: expect.objectContaining({
                name: 'John Doe',
                contact: 'john@example.com',
                contactType: 'email',
                attendance: 'Sim, Eu vou!'
            })
        }));

        expect(screen.getByText('Obrigado!')).toBeInTheDocument();
    });

    it('shows error message when validation fails', () => {
        const onInteraction = vi.fn();
        const onValidate = vi.fn().mockReturnValue(false);
        render(<RSVPSection {...defaultProps} readOnly={true} onInteraction={onInteraction} onValidate={onValidate} />);

        const nameInput = screen.getByPlaceholderText(/Ex: Maria & João Silva/i);
        const contactInput = screen.getByPlaceholderText(/seu-email@exemplo.com/i);
        const submitButton = screen.getByText(/Confirmar Agora/i);

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(contactInput, { target: { value: 'invalid-email' } });

        // Select attendance
        const dropdown = screen.getByRole('combobox');
        fireEvent.change(dropdown, { target: { value: 'Sim, Eu vou!' } });

        fireEvent.click(submitButton);

        expect(onInteraction).not.toHaveBeenCalled();
        const errorMsg = screen.getByTestId('contact-error');
        expect(errorMsg).toBeInTheDocument();
        expect(errorMsg).toHaveTextContent(/e-mail válido/i);
    });
});
