import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { GuestbookSection } from './GuestbookSection';
import { SECTION_TEMPLATES } from '../../utils/SectionSchemaRegistry';

const mockGlobalStyles = {
    fontFamilyTitle: 'Arial',
    fontFamilyBody: 'Arial',
    primaryColor: '#000',
    secondaryColor: '#333'
};

const defaultProps = {
    section: {
        id: 'guestbook-1',
        type: 'GuestbookSection' as const,
        content: SECTION_TEMPLATES['GuestbookSection'].defaultData
    },
    isActive: false,
    onSelect: vi.fn(),
    onUpdate: vi.fn(),
    readOnly: false,
    globalStyles: mockGlobalStyles,
    index: 0,
    device: 'desktop' as const
};

describe('GuestbookSection', () => {
    it('renders correctly', () => {
        render(<GuestbookSection {...defaultProps} />);
        expect(screen.getByText('Deixe uma Mensagem')).toBeInTheDocument();
        expect(screen.getByText('Publicar Mensagem')).toBeInTheDocument();
    });

    it('disables submit button when inputs are empty', () => {
        render(<GuestbookSection {...defaultProps} />);
        const button = screen.getByRole('button', { name: /Publicar Mensagem/i });
        expect(button).toBeDisabled();
    });

    it('enables submit button when inputs are filled', () => {
        render(<GuestbookSection {...defaultProps} />);

        const nameInput = screen.getByPlaceholderText('Ex: Tio Manel');
        const messageInput = screen.getByPlaceholderText('Escreva algo bonito...');

        fireEvent.change(nameInput, { target: { value: 'Tester' } });
        fireEvent.change(messageInput, { target: { value: 'Hello world' } });

        const button = screen.getByRole('button', { name: /Publicar Mensagem/i });
        expect(button).not.toBeDisabled();
    });

    it('calls onUpdate with new message when submitted', async () => {
        const onUpdate = vi.fn();
        render(<GuestbookSection {...defaultProps} onUpdate={onUpdate} />);

        const nameInput = screen.getByPlaceholderText('Ex: Tio Manel');
        const messageInput = screen.getByPlaceholderText('Escreva algo bonito...');
        const button = screen.getByRole('button', { name: /Publicar Mensagem/i });

        fireEvent.change(nameInput, { target: { value: 'Tester' } });
        fireEvent.change(messageInput, { target: { value: 'Hello world' } });
        fireEvent.click(button);

        expect(onUpdate).toHaveBeenCalled();
        const callArg = onUpdate.mock.calls[0][0];
        expect(callArg.messages).toHaveLength(3); // 2 default + 1 new
        expect(callArg.messages[0]).toMatchObject({
            name: 'Tester',
            message: 'Hello world',
            date: 'Agora mesmo'
        });
    });

    it('calls onUpdate when title or subtitle is edited', () => {
        const onUpdate = vi.fn();
        render(<GuestbookSection {...defaultProps} onUpdate={onUpdate} />);

        const title = screen.getByText('Deixe uma Mensagem');
        fireEvent.focus(title);
        fireEvent.input(title, { target: { innerText: 'Mural de Carinho' } });
        fireEvent.blur(title);
        expect(onUpdate).toHaveBeenCalledWith({ title: 'Mural de Carinho' });

        const subtitle = screen.getByText('Partilhe o seu amor e desejos para os noivos.');
        fireEvent.focus(subtitle);
        fireEvent.input(subtitle, { target: { innerText: 'Novas palavras' } });
        fireEvent.blur(subtitle);
        expect(onUpdate).toHaveBeenCalledWith({ subtitle: 'Novas palavras' });
    });
});
