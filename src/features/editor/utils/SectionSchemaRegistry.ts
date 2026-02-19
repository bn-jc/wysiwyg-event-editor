import type { SectionDefinition, SectionType } from '../types';

export const AVAILABLE_FONTS = [
    { name: 'Padrão (Corpo)', value: 'inherit' },
    { name: 'Padrão (Título)', value: 'Josefin Sans' },
    { name: 'Elegante (Sacramento)', value: 'Sacramento' },
    { name: 'Clássico (Cinzel)', value: 'Cinzel' },
    { name: 'Sofisticado (Playfair)', value: 'Playfair Display' },
    { name: 'Moderno (Montserrat)', value: 'Montserrat' },
    { name: 'Manuscrito (Great Vibes)', value: 'Great Vibes' }
];

export const AVAILABLE_SIZES = [
    { name: 'Padrão', value: 'inherit' },
    { name: 'Pequeno', value: 'text-sm' },
    { name: 'Médio', value: 'text-base' },
    { name: 'Grande', value: 'text-lg' },
    { name: 'Extra-Grande', value: 'text-xl' },
    { name: 'Título (P)', value: 'text-3xl' },
    { name: 'Título (M)', value: 'text-4xl' },
    { name: 'Título (G)', value: 'text-5xl' },
    { name: 'Título (GG)', value: 'text-6xl' },
    { name: 'Gigante', value: 'text-8xl' }
];

export const AVAILABLE_BUTTON_SHAPES = [
    { name: 'Padrão (Arredondado)', value: 'rounded-2xl' },
    { name: 'Quadrado', value: 'rounded-none' },
    { name: 'Suave', value: 'rounded-lg' },
    { name: 'Pílula', value: 'rounded-full' }
];

export const AVAILABLE_BUTTON_ALIGNMENTS = [
    { name: 'Centro', value: 'center' },
    { name: 'Esquerda', value: 'left' },
    { name: 'Direita', value: 'right' },
    { name: 'Largura Total', value: 'full' }
];

export const SECTION_TEMPLATES: Record<SectionType, { name: string; defaultData: any }> = {
    SplashSection: {
        name: 'Splash Screen (Portão)',
        defaultData: {
            title: 'Bem-vindos ao nosso evento',
            titleFont: 'inherit',
            titleColor: '',
            titleSize: 'inherit',
            names: 'John & Jane',
            namesFont: 'inherit',
            namesColor: '',
            namesSize: 'inherit',
            date: '12 de Dezembro de 2026',
            dateFont: 'inherit',
            dateColor: '',
            dateSize: 'inherit',
            buttonLabel: 'Ver Convite',
            buttonFont: 'inherit',
            buttonColor: '',
            buttonSize: 'inherit',
            buttonShape: 'rounded-full',
            buttonAlignment: 'center',
            backgroundImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
            icon: 'heart',
            lineVariant: 'line',
            showRecipient: false,
            recipientPrefix: 'Para:',
            recipientName: '[Nome do Convidado]',
            recipientFont: 'inherit',
            recipientColor: '',
            recipientSize: 'inherit',
            transitionType: 'fade', // 'fade', 'book', 'envelope', 'curtain', 'zoom', 'blur', 'parallax', 'heart', 'star'
            transitionDuration: 1000
        }
    },
    HeroSection: {
        name: 'Hero Clássico',
        defaultData: {
            title: 'O Nosso Grande Dia',
            titleFont: 'inherit',
            titleColor: '',
            titleSize: 'inherit',
            subtitle: 'Estamos muito felizes em partilhar este momento convosco.',
            subtitleFont: 'inherit',
            subtitleColor: '',
            subtitleSize: 'inherit',
            imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
            imageMask: 'heart',
            showRecipient: false,
            recipientPrefix: 'Convidado:',
            recipientName: '[Nome]',
            recipientFont: 'inherit',
            recipientColor: '',
            recipientSize: 'inherit',
            imageScale: 1,
            imageDecoration: 'none',
            imageFeather: 0,
            backgroundEffect: 'none',
            backgroundEffectColor: '#FFC0CB',
            backgroundEffectDirection: 'up',
            backgroundEffectStart: 0,
            backgroundEffectEnd: 0,
            backgroundParticles: 'none',
            backgroundParticlesColor: '#60A5FA',
            buttonLabel: '',
            buttonFont: 'inherit',
            buttonColor: '',
            buttonSize: 'inherit',
            buttonShape: 'rounded-full',
            buttonAlignment: 'center',
            imageOverlayText: '',
            imageOverlayIcon: 'none',
            imageOverlayPosition: 'center',
            imageOverlayVariant: 'glass',
            imageOverlayColor: ''
        }
    },
    AgendaSection: {
        name: 'Agenda do Evento',
        defaultData: {
            title: 'Programação',
            titleFont: 'inherit',
            titleColor: '',
            titleSize: 'inherit',
            itemTimeFont: 'inherit',
            itemTimeColor: '',
            itemTimeSize: 'inherit',
            itemLabelFont: 'inherit',
            itemLabelColor: '',
            itemLabelSize: 'inherit',
            itemLocationFont: 'inherit',
            itemLocationColor: '',
            itemLocationSize: 'inherit',
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
            backgroundParticlesColor: '#60A5FA',
            sectionDecoration: 'none',
            sectionDecorationColor: ''
        }
    },
    RSVPSection: {
        name: 'Confirmação de Presença',
        defaultData: {
            title: 'Confirme a sua Presença',
            titleFont: 'inherit',
            titleColor: '',
            titleSize: 'inherit',
            deadline: 'Até 30 de Novembro',
            deadlineFont: 'inherit',
            deadlineColor: '',
            deadlineSize: 'inherit',
            deadlineLabel: 'Por favor responda até ',
            deadlineLabelFont: 'inherit',
            deadlineLabelColor: '',
            deadlineLabelSize: 'inherit',
            buttonLabel: ' Confirmar Agora',
            buttonFont: 'inherit',
            buttonColor: '',
            buttonSize: 'inherit',
            buttonShape: 'rounded-2xl',
            buttonAlignment: 'full',
            // Extended fields for inline editing
            nameLabel: 'Seu Nome Completo',
            emailLabel: 'E-mail para Contacto',
            phoneLabel: 'Telemóvel para Contacto',
            messageLabel: 'Mensagem para os Noivos',
            fieldLabelFont: 'inherit',
            fieldLabelColor: '',
            fieldLabelSize: 'inherit',
            namePlaceholder: 'Ex: Maria & João Silva',
            emailPlaceholder: 'seu-email@exemplo.com',
            phonePlaceholder: 'Ex: +258 84 123 4567',
            messagePlaceholder: 'Alguma restrição alimentar ou mensagem especial?',
            fieldPlaceholderFont: 'inherit',
            fieldPlaceholderColor: '',
            fieldPlaceholderSize: 'inherit',
            showMessageField: true,
            footerText: 'Estamos ansiosos por celebrar este dia especial convosco!',
            footerFont: 'inherit',
            footerColor: '',
            footerSize: 'inherit',
            attendanceOptions: ['Sim, Eu vou!', 'Desculpe, não posso ir'],
            contactType: 'email', // 'email', 'phone', 'sms', 'whatsapp'
            backgroundEffect: 'none',
            backgroundEffectColor: '#FFC0CB',
            backgroundEffectDirection: 'up',
            backgroundEffectStart: 0,
            backgroundEffectEnd: 0,
            backgroundParticles: 'none',
            backgroundParticlesColor: '#60A5FA',
            sectionDecoration: 'none',
            sectionDecorationColor: ''
        }
    },
    GuestbookSection: {
        name: 'Mural de Recados',
        defaultData: {
            title: 'Deixe uma Mensagem',
            titleFont: 'inherit',
            titleColor: '',
            titleSize: 'inherit',
            subtitle: 'Partilhe o seu amor e desejos para os noivos.',
            subtitleFont: 'inherit',
            subtitleColor: '',
            subtitleSize: 'inherit',
            nameLabel: 'Seu Nome',
            messageLabel: 'Sua Mensagem',
            fieldLabelFont: 'inherit',
            fieldLabelColor: '',
            fieldLabelSize: 'inherit',
            buttonLabel: 'Publicar Mensagem',
            buttonFont: 'inherit',
            buttonColor: '',
            buttonSize: 'inherit',
            buttonShape: 'rounded-2xl',
            buttonAlignment: 'full',
            emptyStateText: 'Seja o primeiro a deixar uma mensagem!',
            emptyStateFont: 'inherit',
            emptyStateColor: '',
            emptyStateSize: 'inherit',
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
            backgroundParticlesColor: '#60A5FA',
            sectionDecoration: 'none',
            sectionDecorationColor: ''
        }
    },
    CountdownSection: {
        name: 'Contagem Decrescente',
        defaultData: {
            title: 'Faltam apenas...',
            titleFont: 'inherit',
            titleColor: '',
            titleSize: 'inherit',
            targetDate: '2026-12-12T10:00:00',
            timerFont: 'inherit',
            timerColor: '',
            timerSize: 'inherit',
            timerLabelFont: 'inherit',
            timerLabelColor: '',
            timerLabelSize: 'inherit',
            finishMessage: 'O Grande Dia Chegou!',
            finishMessageFont: 'inherit',
            finishMessageColor: '',
            finishMessageSize: 'inherit',
            backgroundEffect: 'none',
            backgroundEffectColor: '#FFC0CB',
            backgroundEffectDirection: 'up',
            backgroundEffectStart: 0,
            backgroundEffectEnd: 0,
            backgroundParticles: 'none',
            backgroundParticlesColor: '#60A5FA',
            sectionDecoration: 'none',
            sectionDecorationColor: ''
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
            backgroundParticlesColor: '#60A5FA',
            sectionDecoration: 'none',
            sectionDecorationColor: ''
        }
    },
    CustomSection: {
        name: 'Seção Personalizada',
        defaultData: {
            elements: [
                {
                    type: 'text',
                    content: 'A Nossa História',
                    style: 'heading',
                    contentFont: 'inherit',
                    contentColor: '',
                    contentSize: 'inherit'
                },
                {
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800',
                    overlayText: '',
                    overlayIcon: 'none',
                    overlayPosition: 'center',
                    overlayVariant: 'glass',
                    overlayColor: ''
                },
                {
                    type: 'text',
                    content: 'Era uma vez...',
                    style: 'paragraph',
                    contentFont: 'inherit',
                    contentColor: '',
                    contentSize: 'inherit'
                },
                {
                    type: 'list',
                    listType: 'unordered',
                    format: 'disc',
                    items: ['Amizade', 'Parceria', 'Amor'],
                    itemFont: 'inherit',
                    itemColor: '',
                    itemSize: 'inherit'
                },
                {
                    type: 'video',
                    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                },
                {
                    type: 'gallery',
                    columns: 2,
                    gap: '1rem',
                    galleryImages: [
                        { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800', caption: 'Love' },
                        { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', caption: 'Together' }
                    ]
                }
            ],
            backgroundEffect: 'none',
            backgroundEffectColor: '#FFC0CB',
            backgroundEffectDirection: 'up',
            backgroundEffectStart: 0,
            backgroundEffectEnd: 0,
            backgroundParticles: 'none',
            backgroundParticlesColor: '#60A5FA',
            sectionDecoration: 'none',
            sectionDecorationColor: ''
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
            linkFont: 'inherit',
            linkColor: '',
            linkSize: 'inherit',
            navPosition: 'top', // 'top', 'bottom', 'left', 'right'
            navVariant: 'classic', // 'classic', 'material', 'liquid-glass', 'minimal'
            isSticky: true,
            isTransparent: false,
            opacity: 95,
            blurAmount: 8,
            activeHighlight: 'underline', // 'none', 'underline', 'color', 'pill'
            activeColor: '', // Falls back to primary
            isScrollable: true,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            textColor: '#333333',
            navShape: 'rounded-2xl', // 'rounded-none', 'rounded-lg', 'rounded-2xl', 'rounded-full'
            backgroundEffect: 'none',
            backgroundEffectColor: '#FFC0CB',
            backgroundEffectDirection: 'up',
            backgroundEffectStart: 0,
            backgroundEffectEnd: 0,
            backgroundParticles: 'none',
            backgroundParticlesColor: '#60A5FA',
            sectionDecoration: 'none',
            sectionDecorationColor: ''
        }
    },
    GiftsSection: {
        name: 'Lista de Presentes',
        defaultData: {
            title: 'Lista de Presentes',
            titleFont: 'inherit',
            titleColor: '',
            titleSize: 'inherit',
            description: 'A sua presença é o nosso maior presente, mas se desejar mimos, aqui estão algumas sugestões:',
            descriptionFont: 'inherit',
            descriptionColor: '',
            descriptionSize: 'inherit',
            giftNameFont: 'inherit',
            giftNameColor: '',
            giftNameSize: 'inherit',
            giftDescriptionFont: 'inherit',
            giftDescriptionColor: '',
            giftDescriptionSize: 'inherit',
            giftItems: [
                { id: '1', name: 'Contribuição para Lua de Mel', description: 'Ajude-nos a realizar a viagem dos nossos sonhos.', icon: 'plane', imageUrl: '', linkUrl: '', overlayText: '', overlayIcon: 'none', overlayPosition: 'center', overlayVariant: 'glass', overlayColor: '' },
                { id: '2', name: 'Artigos de Cozinha', description: 'Para as nossas futuras jantaradas.', icon: 'utensils', imageUrl: '', linkUrl: '', overlayText: '', overlayIcon: 'none', overlayPosition: 'center', overlayVariant: 'glass', overlayColor: '' }
            ],
            bankDetails: {
                bankName: 'Banco ABC',
                accountName: 'John & Jane',
                accountNumber: '123456789',
                nib: '0001 0002 0003 0004 0005 6',
                iban: 'MZ59 0001 0002 0003 0004 0005 6'
            },
            bankLabelFont: 'inherit',
            bankLabelColor: '',
            bankLabelSize: 'inherit',
            bankValueFont: 'inherit',
            bankValueColor: '',
            bankValueSize: 'inherit',
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
