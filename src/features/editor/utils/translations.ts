export type Locale = 'en-US' | 'pt-PT' | 'pt-MZ';

export interface TranslationSchema {
    toolbar: {
        edit: string;
        preview: string;
        theme: string;
        themeColor: string;
        lightMode: string;
        darkMode: string;
        background: string;
        text: string;
        music: string;
        noMusic: string;
        piano: string;
        march: string;
        play: string;
        boxed: string;
        full: string;
        desktop: string;
        tablet: string;
        mobile: string;
    };
    sidebar: {
        sections: string;
        addSection: string;
        layers: string;
        navbar: string;
        essentials: string;
        details: string;
    };
    sections: {
        splash: string;
        hero: string;
        agenda: string;
        rsvp: string;
        guestbook: string;
        countdown: string;
        separator: string;
        nav: string;
        gifts: string;
        custom: string;
    };
    common: {
        save: string;
        close: string;
        remove: string;
        moveUp: string;
        moveDown: string;
    };
}

export const TRANSLATIONS: Record<Locale, TranslationSchema> = {
    'en-US': {
        toolbar: {
            edit: 'EDIT',
            preview: 'PREVIEW',
            theme: 'Theme',
            themeColor: 'Theme Color',
            lightMode: 'Light Mode (Shades)',
            darkMode: 'Dark Mode (Shades)',
            background: 'Background',
            text: 'Text',
            music: 'Music',
            noMusic: 'No Music',
            piano: 'Piano',
            march: 'March',
            play: 'PLAY',
            boxed: 'Boxed Layout',
            full: 'Full Width Layout',
            desktop: 'Desktop',
            tablet: 'Tablet',
            mobile: 'Smartphone'
        },
        sidebar: {
            sections: 'SECTIONS',
            addSection: 'Add Section',
            layers: 'LAYERS',
            navbar: 'NAVBAR',
            essentials: 'ESSENTIALS',
            details: 'DETAILS'
        },
        sections: {
            splash: 'Welcome',
            hero: 'Hero',
            agenda: 'Agenda',
            rsvp: 'RSVP',
            guestbook: 'Guestbook',
            countdown: 'Countdown',
            separator: 'Separator',
            nav: 'Navigation',
            gifts: 'Gifts',
            custom: 'Custom'
        },
        common: {
            save: 'Save',
            close: 'Close',
            remove: 'Remove',
            moveUp: 'Move Up',
            moveDown: 'Move Down'
        }
    },
    'pt-PT': {
        toolbar: {
            edit: 'EDITAR',
            preview: 'PREVER',
            theme: 'Tema',
            themeColor: 'Cor do Tema',
            lightMode: 'Modo Claro (Shades)',
            darkMode: 'Modo Escuro (Shades)',
            background: 'Fundo',
            text: 'Texto',
            music: 'Música',
            noMusic: 'Sem Música',
            piano: 'Piano',
            march: 'Marcha',
            play: 'PLAY',
            boxed: 'Layout Boxed',
            full: 'Layout Inteiro',
            desktop: 'Desktop',
            tablet: 'Tablet',
            mobile: 'Smartphone'
        },
        sidebar: {
            sections: 'SECÇÕES',
            addSection: 'Adicionar Secção',
            layers: 'CAMADAS',
            navbar: 'BARRA DE NAVEGAÇÃO',
            essentials: 'ESSENCIAIS',
            details: 'DETALHES'
        },
        sections: {
            splash: 'Boas-vindas',
            hero: 'Início',
            agenda: 'Agenda',
            rsvp: 'RSVP',
            guestbook: 'Mural',
            countdown: 'Contagem',
            separator: 'Divisor',
            nav: 'Navegação',
            gifts: 'Presentes',
            custom: 'Extras'
        },
        common: {
            save: 'Guardar',
            close: 'Fechar',
            remove: 'Remover',
            moveUp: 'Subir',
            moveDown: 'Descer'
        }
    },
    'pt-MZ': {
        // Reuse pt-PT for pt-MZ
        toolbar: {
            edit: 'EDITAR',
            preview: 'PREVER',
            theme: 'Tema',
            themeColor: 'Cor do Tema',
            lightMode: 'Modo Claro (Shades)',
            darkMode: 'Modo Escuro (Shades)',
            background: 'Fundo',
            text: 'Texto',
            music: 'Música',
            noMusic: 'Sem Música',
            piano: 'Piano',
            march: 'Marcha',
            play: 'PLAY',
            boxed: 'Layout Boxed',
            full: 'Layout Inteiro',
            desktop: 'Desktop',
            tablet: 'Tablet',
            mobile: 'Smartphone'
        },
        sidebar: {
            sections: 'SECÇÕES',
            addSection: 'Adicionar Secção',
            layers: 'CAMADAS',
            navbar: 'BARRA DE NAVEGAÇÃO',
            essentials: 'ESSENCIAIS',
            details: 'DETALHES'
        },
        sections: {
            splash: 'Boas-vindas',
            hero: 'Início',
            agenda: 'Agenda',
            rsvp: 'RSVP',
            guestbook: 'Mural',
            countdown: 'Contagem',
            separator: 'Divisor',
            nav: 'Navegação',
            gifts: 'Presentes',
            custom: 'Extras'
        },
        common: {
            save: 'Gravar',
            close: 'Fechar',
            remove: 'Remover',
            moveUp: 'Subir',
            moveDown: 'Descer'
        }
    }
};

export const getTranslation = (locale: string): TranslationSchema => {
    return TRANSLATIONS[locale as Locale] || TRANSLATIONS['en-US'];
};
