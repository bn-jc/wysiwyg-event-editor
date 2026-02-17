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
            lineVariant: 'line',
            showRecipient: false,
            recipientPrefix: 'Para:',
            recipientName: '[Nome do Convidado]'
        }
    },
    HeroSection: {
        name: 'Hero Clássico',
        defaultData: {
            title: 'O Nosso Grande Dia',
            subtitle: 'Estamos muito felizes em partilhar este momento convosco.',
            imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
            imageMask: 'heart',
            showRecipient: false,
            recipientPrefix: 'Convidado:',
            recipientName: '[Nome]',
            imageScale: 1,
            imageDecoration: 'none',
            imageFeather: 0,
            backgroundEffect: 'none',
            backgroundEffectColor: '#FFC0CB',
            backgroundEffectDirection: 'up',
            backgroundEffectStart: 0,
            backgroundEffectEnd: 0,
            backgroundParticles: 'none',
            backgroundParticlesColor: '#60A5FA'
        }
    },
    AgendaSection: {
        name: 'Agenda do Evento',
        defaultData: {
            title: 'Programação',
            items: [
                { time: '10:00', label: 'Cerimónia Religiosa', location: 'Igreja de Santo António' },
                { time: '13:00', label: 'Almoço e Recepção', location: 'Salão de Festas Central' }
            ],
            backgroundEffect: 'none',
            backgroundEffectColor: '#FFC0CB',
            backgroundEffectDirection: 'up',
            backgroundEffectStart: 0,
            backgroundEffectEnd: 0,
            backgroundParticles: 'none',
            backgroundParticlesColor: '#60A5FA'
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
            showMessageField: true,
            footerText: 'Estamos ansiosos por celebrar este dia especial convosco!',
            attendanceLabel: 'Você vai?',
            attendanceOptions: ['Sim, Eu vou!', 'Desculpe, não posso ir'],
            backgroundEffect: 'none',
            backgroundEffectColor: '#FFC0CB',
            backgroundEffectDirection: 'up',
            backgroundEffectStart: 0,
            backgroundEffectEnd: 0,
            backgroundParticles: 'none',
            backgroundParticlesColor: '#60A5FA'
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
            ],
            backgroundEffect: 'none',
            backgroundEffectColor: '#FFC0CB',
            backgroundEffectDirection: 'up',
            backgroundEffectStart: 0,
            backgroundEffectEnd: 0,
            backgroundParticles: 'none',
            backgroundParticlesColor: '#60A5FA'
        }
    },
    CountdownSection: {
        name: 'Contagem Decrescente',
        defaultData: {
            title: 'Faltam apenas...',
            targetDate: '2026-12-12T10:00:00',
            finishMessage: 'O Grande Dia Chegou!',
            backgroundEffect: 'none',
            backgroundEffectColor: '#FFC0CB',
            backgroundEffectDirection: 'up',
            backgroundEffectStart: 0,
            backgroundEffectEnd: 0,
            backgroundParticles: 'none',
            backgroundParticlesColor: '#60A5FA'
        }
    },
    SeparatorSection: {
        name: 'Separador',
        defaultData: {
            variant: 'line', // 'line', 'flourish', 'dots'
            padding: 'medium', // 'small', 'medium', 'large'
            color: '',
            gradient: 'none',
            backgroundEffect: 'none',
            backgroundEffectColor: '#FFC0CB',
            backgroundEffectDirection: 'up',
            backgroundEffectStart: 0,
            backgroundEffectEnd: 0,
            backgroundParticles: 'none',
            backgroundParticlesColor: '#60A5FA'
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
            ],
            backgroundEffect: 'none',
            backgroundEffectColor: '#FFC0CB',
            backgroundEffectDirection: 'up',
            backgroundEffectStart: 0,
            backgroundEffectEnd: 0,
            backgroundParticles: 'none',
            backgroundParticlesColor: '#60A5FA'
        }
    },
    NavSection: {
        name: 'Barra de Navegação',
        defaultData: {
            links: [
                { label: 'Início', targetId: 'top' },
                { label: 'Agenda', targetId: 'agenda' },
                { label: 'RSVP', targetId: 'rsvp' }
            ],
            style: 'floating', // 'sticky', 'fixed', 'floating'
            alignment: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            textColor: '#333333',
            backgroundEffect: 'none',
            backgroundEffectColor: '#FFC0CB',
            backgroundEffectDirection: 'up',
            backgroundEffectStart: 0,
            backgroundEffectEnd: 0,
            backgroundParticles: 'none',
            backgroundParticlesColor: '#60A5FA'
        }
    },
    GiftsSection: {
        name: 'Lista de Presentes',
        defaultData: {
            title: 'Lista de Presentes',
            description: 'A sua presença é o nosso maior presente, mas se desejar mimos, aqui estão algumas sugestões:',
            giftItems: [
                { id: '1', name: 'Contribuição para Lua de Mel', description: 'Ajude-nos a realizar a viagem dos nossos sonhos.', icon: 'plane' },
                { id: '2', name: 'Artigos de Cozinha', description: 'Para as nossas futuras jantaradas.', icon: 'utensils' }
            ],
            bankDetails: {
                bankName: 'Banco ABC',
                accountName: 'John & Jane',
                accountNumber: '123456789',
                nib: '0001 0002 0003 0004 0005 6',
                iban: 'MZ59 0001 0002 0003 0004 0005 6'
            },
            showBankDetails: true,
            showGifts: true,
            backgroundEffect: 'none',
            backgroundEffectColor: '#FFC0CB',
            backgroundEffectDirection: 'up',
            backgroundEffectStart: 0,
            backgroundEffectEnd: 0,
            backgroundParticles: 'none',
            backgroundParticlesColor: '#60A5FA'
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
