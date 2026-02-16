import type { SectionDefinition, SectionType } from '../types';

export const SECTION_TEMPLATES: Record<SectionType, { name: string; defaultData: any }> = {
    SplashSection: {
        name: 'Splash Screen (Portão)',
        defaultData: {
            title: 'Bem-vindos ao nosso evento',
            names: 'John & Jane',
            date: '12 de Dezembro de 2026',
            buttonLabel: 'Ver Convite',
            backgroundImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
            icon: 'heart',
            lineVariant: 'line'
        }
    },
    HeroSection: {
        name: 'Hero Clássico',
        defaultData: {
            title: 'O Nosso Grande Dia',
            subtitle: 'Estamos muito felizes em partilhar este momento convosco.',
            imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
            imageMask: 'heart'
        }
    },
    AgendaSection: {
        name: 'Agenda do Evento',
        defaultData: {
            title: 'Programação',
            items: [
                { time: '10:00', label: 'Cerimónia Religiosa', location: 'Igreja de Santo António' },
                { time: '13:00', label: 'Almoço e Recepção', location: 'Salão de Festas Central' }
            ]
        }
    },
    RSVPSection: {
        name: 'Confirmação de Presença',
        defaultData: {
            title: 'Confirme a sua Presença',
            deadline: 'Até 30 de Novembro',
            deadlineLabel: 'Por favor responda até ',
            buttonLabel: ' Confirmar Agora',
            // Extended fields for inline editing
            nameLabel: 'Seu Nome Completo',
            namePlaceholder: 'Ex: Maria & João Silva',
            emailLabel: 'E-mail para Contacto',
            emailPlaceholder: 'seu-email@exemplo.com',
            messageLabel: 'Mensagem para os Noivos',
            messagePlaceholder: 'Alguma restrição alimentar ou mensagem especial?',
            footerText: 'Estamos ansiosos por celebrar este dia especial convosco!',
            attendanceLabel: 'Você vai?',
            attendanceOptions: ['Sim, Eu vou!', 'Desculpe, não posso ir']
        }
    },
    GuestbookSection: {
        name: 'Mural de Recados',
        defaultData: {
            title: 'Deixe uma Mensagem',
            subtitle: 'Partilhe o seu amor e desejos para os noivos.',
            nameLabel: 'Seu Nome',
            messageLabel: 'Sua Mensagem',
            buttonLabel: 'Publicar Mensagem',
            emptyStateText: 'Seja o primeiro a deixar uma mensagem!',
            messages: [
                { name: 'Tia Maria', message: 'Muitas felicidades aos noivos! Que Deus abençoe esta união.', date: '2 horas atrás' },
                { name: 'João & Ana', message: 'Ansiosos pelo grande dia! Vai ser lindo.', date: '5 horas atrás' }
            ]
        }
    },
    CountdownSection: {
        name: 'Contagem Decrescente',
        defaultData: {
            title: 'Faltam apenas...',
            targetDate: '2026-12-12T10:00:00',
            finishMessage: 'O Grande Dia Chegou!',
        }
    },
    SeparatorSection: {
        name: 'Separador',
        defaultData: {
            variant: 'line', // 'line', 'flourish', 'dots'
            padding: 'medium', // 'small', 'medium', 'large'
            color: '',
            gradient: 'none'
        }
    },
    CustomSection: {
        name: 'Seção Personalizada',
        defaultData: {
            elements: [
                { type: 'text', content: 'A Nossa História', style: 'heading' },
                { type: 'image', url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800' },
                { type: 'text', content: 'Era uma vez...', style: 'paragraph' },
                {
                    type: 'list',
                    listType: 'unordered',
                    format: 'disc',
                    items: ['Amizade', 'Parceria', 'Amor']
                }
            ]
        }
    }
};

/**
 * Creates a new section definition with a unique ID and default content
 * based on the provided section type.
 * 
 * @param type The type of section to create (e.g., 'HeroSection', 'SplashSection')
 * @returns A complete SectionDefinition with default values
 */
export const createSection = (type: SectionType): SectionDefinition => {
    const template = SECTION_TEMPLATES[type];
    return {
        id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type,
        content: template ? { ...template.defaultData } : {},
    };
};
