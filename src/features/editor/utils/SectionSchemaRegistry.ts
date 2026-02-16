import type { SectionDefinition } from '../types';

export const SECTION_TEMPLATES = {
    'splash-01': {
        name: 'Splash Screen (Portão)',
        defaultData: {
            title: 'Bem-vindos ao nosso evento',
            coupleNames: 'Minda & Datizua',
            date: '12 de Dezembro de 2026',
            buttonLabel: 'Ver Convite',
            backgroundImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
        }
    },
    'hero-01': {
        name: 'Hero Clássico',
        defaultData: {
            title: 'O Nosso Grande Dia',
            subtitle: 'Estamos muito felizes em partilhar este momento convosco.',
            imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
            imageMask: 'heart'
        }
    },
    'agenda-01': {
        name: 'Agenda do Evento',
        defaultData: {
            title: 'Programação',
            items: [
                { time: '10:00', label: 'Cerimónia Religiosa', location: 'Igreja de Santo António' },
                { time: '13:00', label: 'Almoço e Recepção', location: 'Salão de Festas Central' }
            ]
        }
    },
    'rsvp-01': {
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
            footerText: 'Estamos ansiosos por celebrar este dia especial convosco!'
        }
    }
};

export const createSection = (templateId: string): SectionDefinition => {
    const template = SECTION_TEMPLATES[templateId as keyof typeof SECTION_TEMPLATES];
    return {
        id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        templateId,
        content: template ? { ...template.defaultData } : {},
    };
};
