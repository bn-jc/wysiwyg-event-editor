import type { SectionDefinition } from '../types';

export const SECTION_EXAMPLES: Record<string, SectionDefinition[]> = {
    SplashSection: [
        {
            id: 'splash-wedding',
            type: 'SplashSection',
            content: {
                title: 'O Casamento de',
                names: 'Beatriz & Carlos',
                date: '20 de Junho de 2026',
                buttonLabel: 'Descobrir mais',
                backgroundImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
                icon: 'heart',
                lineVariant: 'heart',
                showRecipient: true,
                recipientPrefix: 'Caro(a):',
                recipientName: 'Convidado Especial'
            },
            styles: { backgroundColor: '#fdf2f2', color: '#7c2d12' }
        },
        {
            id: 'splash-baptism',
            type: 'SplashSection',
            content: {
                title: 'O Baptismo de',
                names: 'Lucas Miguel',
                date: '15 de Agosto de 2026',
                buttonLabel: 'Entrar',
                backgroundImage: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?w=1200',
                icon: 'bird',
                lineVariant: 'leaf',
                showRecipient: false
            },
            styles: { backgroundColor: '#f0f9ff', color: '#0c4a6e' }
        }
    ],
    HeroSection: [
        {
            id: 'hero-modern',
            type: 'HeroSection',
            content: {
                title: 'A Nossa História',
                subtitle: 'Desde o primeiro dia até ao sempre.',
                imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
                imageMask: 'heart',
                imageScale: 1.2,
                imageDecoration: 'none',
                imageFeather: 10,
                showRecipient: true,
                recipientPrefix: 'Convidado:',
            },
            styles: { paddingTop: '100px', paddingBottom: '100px' }
        },
        {
            id: 'hero-classic',
            type: 'HeroSection',
            content: {
                title: 'Sejam Bem-vindos',
                subtitle: 'É uma honra ter-vos connosco neste dia especial.',
                imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?w=800',
                imageMask: 'circle',
                imageScale: 1,
                imageDecoration: 'dots',
                backgroundEffect: 'wine',
                backgroundEffectColor: '#800020',
                backgroundParticles: 'flowers',
                backgroundParticlesColor: '#FFD700'
            }
        }
    ],
    AgendaSection: [
        {
            id: 'agenda-full',
            type: 'AgendaSection',
            content: {
                title: 'Nossa Agenda',
                items: [
                    { time: '10:00', label: 'Cerimónia Civil', location: 'Conservatória de Maputo' },
                    { time: '13:00', label: 'Recepção e Buffet', location: 'Jardim dos Noivos' },
                    { time: '16:00', label: 'Corte do Bolo', location: 'Salão Principal' },
                    { time: '20:00', label: 'Festa e DJ', location: 'Pista de Dança' }
                ]
            },
            styles: { textAlign: 'left' }
        }
    ],
    RSVPSection: [
        {
            id: 'rsvp-standard',
            type: 'RSVPSection',
            content: {
                title: 'Confirmação de Presença',
                deadline: '15 de Novembro',
                deadlineLabel: 'Por favor, confirme até ',
                buttonLabel: 'Confirmar Agora',
                nameLabel: 'Nome Completo',
                emailLabel: 'E-mail',
                messageLabel: 'Alguma alergia alimentar?',
                attendanceOptions: ['Sim, com certeza!', 'Infelizmente não poderei ir']
            },
            styles: { backgroundColor: '#fff7ed' }
        }
    ],
    GuestbookSection: [
        {
            id: 'guestbook-active',
            type: 'GuestbookSection',
            content: {
                title: 'Mural de Carinho',
                subtitle: 'Deixe as suas palavras para o novo casal.',
                messages: [
                    { name: 'Tia Sónia', message: 'Muitas felicidades! Vocês merecem o mundo.', date: '1 dia atrás' },
                    { name: 'Primo André', message: 'Que festa linda! Estou ansioso.', date: '3 horas atrás' }
                ]
            }
        }
    ],
    CountdownSection: [
        {
            id: 'countdown-wedding',
            type: 'CountdownSection',
            content: {
                title: 'Falta pouco para o "Sim"',
                targetDate: '2026-12-12T10:00:00',
                finishMessage: 'O Grande Dia é Hoje!'
            }
        }
    ],
    SeparatorSection: [
        {
            id: 'sep-flourish',
            type: 'SeparatorSection',
            content: { variant: 'flourish', padding: 'large', color: '#b45309' }
        },
        {
            id: 'sep-dots',
            type: 'SeparatorSection',
            content: { variant: 'dots', padding: 'small', gradient: 'gold' }
        }
    ],
    NavSection: [
        {
            id: 'nav-floating',
            type: 'NavSection',
            content: {
                links: [
                    { label: 'Início', targetId: 'top' },
                    { label: 'Agenda', targetId: 'agenda' },
                    { label: 'Local', targetId: 'location' },
                    { label: 'Gifts', targetId: 'gifts' }
                ],
                style: 'floating',
                alignment: 'center'
            }
        }
    ],
    GiftsSection: [
        {
            id: 'gifts-registry',
            type: 'GiftsSection',
            content: {
                title: 'Nossa Lista de Sonhos',
                description: 'A vossa presença é o que mais importa. Se ainda assim quiserem nos mimar:',
                giftItems: [
                    { id: '1', name: 'Lua de Mel na Tailândia', description: 'Ajude-nos a relaxar nas praias.', icon: 'plane' },
                    { id: '2', name: 'Mobiliário de Cozinha', description: 'Para as nossas futuras receitas.', icon: 'utensils' }
                ],
                bankDetails: {
                    bankName: 'Standard Bank',
                    accountName: 'B. & C.',
                    nib: '0000 0000 0000 0000 0000 0'
                },
                showBankDetails: true,
                showGifts: true
            }
        }
    ],
    CustomSection: [
        {
            id: 'custom-story',
            type: 'CustomSection',
            content: {
                elements: [
                    { type: 'text', content: 'Era uma vez...', style: 'heading' },
                    { type: 'image', url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800' },
                    { type: 'text', content: 'Dois jovens que se conheceram numa tarde de chuva.', style: 'paragraph' }
                ]
            }
        }
    ]
};
