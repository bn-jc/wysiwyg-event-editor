import React, { useCallback } from 'react';
import type { SectionDefinition, SectionContent } from '../types';
import { ColorPicker } from './common/ColorPicker';
import { PropertyNavigator, type PropertyCategory } from './PropertyNavigator';
import { SECTION_TEMPLATES, AVAILABLE_FONTS, AVAILABLE_SIZES, AVAILABLE_BUTTON_SHAPES, AVAILABLE_BUTTON_ALIGNMENTS } from '../utils/SectionSchemaRegistry';
import { Trash2, ChevronDown, ChevronUp, Plus, Image as ImageIcon, Type, Maximize, PenTool, Sparkles, XCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

interface PropertyEditorProps {
    section: SectionDefinition;
    onUpdate: (content: Partial<SectionContent>) => void;
    onUpdateStyles: (styles: React.CSSProperties) => void;
    onDelete: () => void;
    onMove: (direction: 'up' | 'down') => void;
    selectedElementKey?: string | null;
    onElementSelect?: (key: string | null) => void;
    activeCategory?: PropertyCategory;
    onCategoryChange?: (category: PropertyCategory) => void;
    isDark?: boolean;
}

export const PropertyEditor: React.FC<PropertyEditorProps> = ({
    section,
    onUpdate,
    onUpdateStyles,
    onDelete,
    onMove,
    selectedElementKey,
    onElementSelect,
    activeCategory = 'section',
    onCategoryChange,
    isDark = false
}) => {
    const [collapsedGroups, setCollapsedGroups] = React.useState<Record<string, boolean>>({});

    const toggleGroup = (group: string) => {
        setCollapsedGroups(prev => ({ ...prev, [group]: !prev[group] }));
    };

    const clearSelection = useCallback(() => {
        onElementSelect?.(null);
    }, [onElementSelect]);
    const template = SECTION_TEMPLATES[section.type as keyof typeof SECTION_TEMPLATES];

    const handleChange = (key: string, value: any) => {
        onUpdate({ [key]: value });
    };

    const CategoryHeaders: Record<import('./PropertyNavigator').PropertyCategory, string> = {
        section: 'Opções da Seção',
        button: 'Estilos do Botão',
        text: 'Personalização de Texto',
        image: 'Configurações de Imagem',
        form: 'Campos do Formulário',
        items: 'Lista de Itens'
    };

    const getFieldCategory = (key: string): PropertyCategory => {
        const k = key.toLowerCase();
        if (k.includes('button')) return 'button';
        if (k.includes('image') || k.includes('photo') || k.includes('mask') || k.includes('overlay') || k === 'imagedecoration') return 'image';
        if (k.includes('decoration')) return 'section';
        if (k.includes('label') || k.includes('placeholder') || k.includes('deadline') || k.includes('attendance') || k.includes('messagefield') || k.includes('contacttype')) return 'form';
        if (k.includes('items') || k.includes('agenda')) return 'items';
        if (k.includes('font') || k.includes('size') || k.includes('color') || k === 'title' || k === 'subtitle' || k === 'names' || k === 'date' || k === 'description' || k === 'address' || k === 'venue' || k === 'footertext') {
            // Check if it's a specific element's font/color
            if (k.includes('button')) return 'button';
            if (k.includes('recipient')) return 'section';
            return 'text';
        }
        return 'section';
    };

    const renderField = (key: string, value: any) => {
        const category = getFieldCategory(key);
        if (category !== activeCategory) return null;

        const isSelected = selectedElementKey && key.toLowerCase().includes(selectedElementKey.toLowerCase());
        const FieldLabels: Record<string, string> = {
            title: 'Título',
            subtitle: 'Subtítulo',
            names: 'Nomes',
            date: 'Data',
            buttonLabel: 'Texto do Botão',
            backgroundImage: 'Imagem de Fundo',
            recipientName: 'Nome do Destinatário',
            description: 'Descrição / Convite',
            giftItems: 'Itens de Presente',
            bankDetails: 'Dados Bancários',
            showBankDetails: 'Mostrar Dados Bancários',
            navPosition: 'Posição da Barra',
            navVariant: 'Estilo Visual',
            navShape: 'Formato dos Cantos',
            isSticky: 'Fixar no Topo/Laterais',
            isTransparent: 'Fundo Transparente',
            opacity: 'Opacidade do Fundo',
            blurAmount: 'Intensidade do Desfoque',
            activeHighlight: 'Destaque de Seção Ativa',
            activeColor: 'Cor do Destaque',
            isScrollable: 'Permitir Scroll Lateral',
            showGifts: 'Mostrar Lista de Sugestões',
            imageScale: 'Tamanho da Foto',
            imageDecoration: 'Decoração da Foto',
            imageFeather: 'Suavização das Bordas',
            backgroundEffect: 'Efeito de Fundo (Animado)',
            backgroundEffectColor: 'Cor do Efeito',
            backgroundEffectDirection: 'Direção do Efeito',
            backgroundParticles: 'Elementos de Fundo (Estáticos)',
            backgroundParticlesColor: 'Cor dos Elementos',
            backgroundEffectStart: 'Início do Efeito (s)',
            backgroundEffectEnd: 'Fim do Efeito (s)',
            deadlineLabel: 'Rótulo do Prazo',
            attendanceLabel: 'Rótulo de Comparecimento',
            attendanceOptions: 'Opções de Resposta',
            nameLabel: 'Rótulo do Nome',
            namePlaceholder: 'Dica do Nome',
            emailLabel: 'Rótulo do E-mail',
            emailPlaceholder: 'Dica do E-mail',
            showMessageField: 'Campo de Mensagem',
            messageLabel: 'Rótulo da Mensagem',
            messagePlaceholder: 'Dica da Mensagem',
            footerText: 'Texto de Rodapé',
            contactType: 'Tipo de Contacto',
            phoneLabel: 'Rótulo do Telefone',
            phonePlaceholder: 'Dica do Telefone',
            titleFont: 'Fonte do Título',
            titleColor: 'Cor do Título',
            titleSize: 'Tamanho do Título',
            subtitleFont: 'Fonte do Subtítulo',
            subtitleColor: 'Cor do Subtítulo',
            subtitleSize: 'Tamanho do Subtítulo',
            namesFont: 'Fonte dos Nomes',
            namesColor: 'Cor dos Nomes',
            namesSize: 'Tamanho dos Nomes',
            dateFont: 'Fonte da Data',
            dateColor: 'Cor da Data',
            dateSize: 'Tamanho da Data',
            descriptionFont: 'Fonte da Descrição',
            descriptionColor: 'Cor da Descrição',
            descriptionSize: 'Tamanho da Descrição',
            buttonFont: 'Fonte do Botão',
            buttonColor: 'Cor do Botão',
            buttonSize: 'Tamanho do Botão',
            recipientFont: 'Fonte do Destinatário',
            recipientColor: 'Cor do Destinatário',
            recipientSize: 'Tamanho do Destinatário',
            deadlineFont: 'Fonte do Prazo',
            deadlineColor: 'Cor do Prazo',
            deadlineSize: 'Tamanho do Prazo',
            deadlineLabelFont: 'Fonte do Rótulo do Prazo',
            deadlineLabelColor: 'Cor do Rótulo do Prazo',
            deadlineLabelSize: 'Tamanho do Rótulo do Prazo',
            fieldLabelFont: 'Fonte dos Rótulos dos Campos',
            fieldLabelColor: 'Cor dos Rótulos dos Campos',
            fieldLabelSize: 'Tamanho dos Rótulos dos Campos',
            fieldPlaceholderFont: 'Fonte das Dicas (Placeholders)',
            fieldPlaceholderColor: 'Cor das Dicas (Placeholders)',
            fieldPlaceholderSize: 'Tamanho das Dicas (Placeholders)',
            footerFont: 'Fonte do Rodapé',
            footerColor: 'Cor do Rodapé',
            footerSize: 'Tamanho do Rodapé',
            itemTimeFont: 'Fonte do Horário',
            itemTimeColor: 'Cor do Horário',
            itemTimeSize: 'Tamanho do Horário',
            itemLabelFont: 'Fonte do Rótulo do Item',
            itemLabelColor: 'Cor do Rótulo do Item',
            itemLabelSize: 'Tamanho do Rótulo do Item',
            itemLocationFont: 'Fonte da Localização',
            itemLocationColor: 'Cor da Localização',
            itemLocationSize: 'Tamanho da Localização',
            emptyStateFont: 'Fonte do Texto Vazio',
            emptyStateColor: 'Cor do Texto Vazio',
            emptyStateSize: 'Tamanho do Texto Vazio',
            timerFont: 'Fonte do Contador',
            timerColor: 'Cor do Contador',
            timerSize: 'Tamanho do Contador',
            timerLabelFont: 'Fonte dos Rótulos (Dias/Horas)',
            timerLabelColor: 'Cor dos Rótulos (Dias/Horas)',
            timerLabelSize: 'Tamanho dos Rótulos (Dias/Horas)',
            finishMessageFont: 'Fonte da Mensagem de Fim',
            finishMessageColor: 'Cor da Mensagem de Fim',
            finishMessageSize: 'Tamanho da Mensagem de Fim',
            giftNameFont: 'Fonte do Nome do Item',
            giftNameColor: 'Cor do Nome do Item',
            giftNameSize: 'Tamanho do Nome do Item',
            giftDescriptionFont: 'Fonte da Descrição do Item',
            giftDescriptionColor: 'Cor da Descrição do Item',
            giftDescriptionSize: 'Tamanho da Descrição do Item',
            bankLabelFont: 'Fonte dos Rótulos Bancários',
            bankLabelColor: 'Cor dos Rótulos Bancários',
            bankLabelSize: 'Tamanho dos Rótulos Bancários',
            bankValueFont: 'Fonte dos Dados Bancários',
            bankValueColor: 'Cor dos Dados Bancários',
            bankValueSize: 'Tamanho dos Dados Bancários',
            linkFont: 'Fonte dos Links',
            linkColor: 'Cor dos Links',
            linkSize: 'Tamanho dos Links',
            buttonShape: 'Forma do Botão',
            buttonAlignment: 'Alinhamento do Botão',
            imageUrl: 'URL da Imagem',
            linkUrl: 'URL do Link',
            imageOverlayText: 'Texto sobre a Imagem',
            imageOverlayIcon: 'Ícone sobre a Imagem',
            imageOverlayPosition: 'Posição do Texto',
            imageOverlayVariant: 'Estilo do Texto',
            imageOverlayColor: 'Cor do Texto',
            overlayColor: 'Cor do Texto',
            sectionDecoration: 'Decoração da Seção',
            sectionDecorationColor: 'Cor da Decoração'
        };

        if (key === 'messageLabel' || key === 'messagePlaceholder') {
            if (section.content.showMessageField === false) return null;
        }

        if (['backgroundEffectColor', 'backgroundParticlesColor', 'backgroundEffectDirection', 'backgroundEffectStart', 'backgroundEffectEnd', 'sectionDecorationColor'].includes(key)) {
            return null;
        }

        const label = FieldLabels[key] || key;

        if (key.endsWith('Font')) {
            return (
                <div key={key} className={cn(
                    "flex flex-col gap-2 mb-6 p-4 rounded-2xl transition-all duration-500",
                    isSelected
                        ? (isDark ? "bg-blue-500/10 ring-1 ring-blue-500/50" : "bg-blue-50 ring-1 ring-blue-200 shadow-md")
                        : "bg-transparent ring-1 ring-transparent hover:ring-gray-200"
                )}>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Type size={12} /> {label}
                    </label>
                    <div className="relative">
                        <select
                            value={value || 'inherit'}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className={cn(
                                "w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all shadow-sm",
                                isDark ? "bg-[#2d333b] border-[#3d444d] text-gray-200 hover:bg-gray-700" : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-white"
                            )}
                            style={{ fontFamily: value !== 'inherit' ? value : 'inherit' }}
                        >
                            {AVAILABLE_FONTS.map(font => (
                                <option key={font.value} value={font.value} style={{ fontFamily: font.value !== 'inherit' ? font.value : 'inherit' }}>
                                    {font.name}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            );
        }

        if (key.endsWith('Size')) {
            return (
                <div key={key} className={cn(
                    "flex flex-col gap-2 mb-6 p-4 rounded-2xl transition-all duration-500",
                    isSelected
                        ? (isDark ? "bg-blue-500/10 ring-1 ring-blue-500/50" : "bg-blue-50 ring-1 ring-blue-200 shadow-md")
                        : "bg-transparent ring-1 ring-transparent hover:ring-gray-200"
                )}>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Maximize size={12} /> {label}
                    </label>
                    <div className="relative">
                        <select
                            value={value || 'inherit'}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className={cn(
                                "w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all shadow-sm",
                                isDark ? "bg-[#2d333b] border-[#3d444d] text-gray-200 hover:bg-gray-700" : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-white"
                            )}
                        >
                            {AVAILABLE_SIZES.map(size => (
                                <option key={size.value} value={size.value}>
                                    {size.name}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            );
        }

        if (key.endsWith('Color')) {
            return (
                <div key={key} className={cn(
                    "flex flex-col gap-2 mb-6 p-4 rounded-2xl transition-all duration-500",
                    isSelected
                        ? (isDark ? "bg-blue-500/10 ring-1 ring-blue-500/50" : "bg-blue-50 ring-1 ring-blue-200 shadow-md")
                        : "bg-transparent ring-1 ring-transparent hover:ring-gray-200"
                )}>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest cursor-default">{label}</label>
                    <ColorPicker
                        value={value || '#000000'}
                        onChange={(val) => handleChange(key, val)}
                        isDark={isDark}
                    />
                </div>
            );
        }

        if (key === 'imageMask') {
            return (
                <div key={key} className="flex flex-col gap-2 mb-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                    <div className="relative">
                        <select
                            value={value}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className={cn(
                                "w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all shadow-sm",
                                isDark ? "bg-[#2d333b] border-[#3d444d] text-gray-200 hover:bg-gray-700" : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-white"
                            )}
                        >
                            <option value="none">Nenhuma</option>
                            <option value="heart">Coração</option>
                            <option value="circle">Círculo</option>
                            <option value="arch">Arco</option>
                            <option value="diamond">Diamante</option>
                            <option value="hexagon">Hexágono</option>
                            <option value="scallop">Ondulado</option>
                            <option value="star">Estrela</option>
                            <option value="cloud">Nuvem</option>
                            <option value="squircle">Squircle</option>
                            <option value="shield">Escudo</option>
                            <option value="triangle">Triângulo</option>
                            <option value="pentagon">Pentágono</option>
                            <option value="octagon">Octágono</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            );
        }

        if (key === 'sectionDecoration') {
            const isRestricted = ['NavSection', 'SplashSection', 'SeparatorSection'].includes(section.type);
            if (isRestricted) return null;

            const showColorPicker = value && value !== 'none';
            return (
                <div key={key} className="flex flex-col gap-0">
                    <div className="flex flex-col gap-2 mb-6">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                        <div className="relative">
                            <select
                                value={value || 'none'}
                                onChange={(e) => handleChange(key, e.target.value)}
                                className={cn(
                                    "w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all shadow-sm",
                                    isDark ? "bg-[#2d333b] border-[#3d444d] text-gray-200 hover:bg-gray-700" : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-white"
                                )}
                            >
                                <option value="none">Nenhuma</option>
                                <option value="gold">Borda Dourada</option>
                                <option value="floral">Arranjo Floral</option>
                                <option value="leaf">Folhas Orgânicas</option>
                                <option value="outline">Linha de Contorno</option>
                                <option value="glow">Brilho (Aura)</option>
                                <option value="dots">Pontilhado</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                    {showColorPicker && (
                        <div className="contents">
                            <ColorPicker
                                label={FieldLabels['sectionDecorationColor']}
                                value={section.content['sectionDecorationColor'] || ''}
                                onChange={(color) => handleChange('sectionDecorationColor', color)}
                            />
                        </div>
                    )}
                </div>
            );
        }

        if (key === 'imageDecoration') {
            return (
                <div key={key} className="flex flex-col gap-2 mb-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                    <div className="relative">
                        <select
                            value={value}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:bg-white transition-all shadow-sm"
                        >
                            <option value="none">Nenhuma</option>
                            <option value="gold">Moldura Dourada</option>
                            <option value="floral">Arranjo Floral</option>
                            <option value="leaf">Folhas Orgânicas</option>
                            <option value="outline">Contorno da Forma</option>
                            <option value="glow">Brilho Sutil (Aura)</option>
                            <option value="dots">Linha de Pontos</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            );
        }

        if (key === 'variant' && section.type === 'SeparatorSection') {
            return (
                <div key={key} className="flex flex-col gap-2 mb-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Estilo</label>
                    <div className="relative">
                        <select
                            value={value}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className={cn(
                                "w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all shadow-sm",
                                isDark ? "bg-[#2d333b] border-[#3d444d] text-gray-200 hover:bg-gray-700" : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-white"
                            )}
                        >
                            <option value="line">Linha Simples</option>
                            <option value="flourish">Ornamento Clássico</option>
                            <option value="dots">Pontos Relicário</option>
                            <option value="wave">Ondas do Mar</option>
                            <option value="diamond">Diamante Central</option>
                            <option value="heart">Coração Central</option>
                            <option value="stars">Brilhos/Estrelas</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            );
        }

        if (key === 'navPosition') {
            return (
                <div key={key} className="flex flex-col gap-2 mb-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                    <div className="relative">
                        <select
                            value={value || 'top'}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className={cn(
                                "w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all shadow-sm",
                                isDark ? "bg-[#2d333b] border-[#3d444d] text-gray-200 hover:bg-gray-700" : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-white"
                            )}
                        >
                            <option value="top">Topo</option>
                            <option value="bottom">Rodapé</option>
                            <option value="left">Lateral Esquerda</option>
                            <option value="right">Lateral Direita</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            );
        }

        if (key === 'navVariant') {
            return (
                <div key={key} className="flex flex-col gap-2 mb-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                    <div className="relative">
                        <select
                            value={value || 'classic'}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className={cn(
                                "w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all shadow-sm",
                                isDark ? "bg-[#2d333b] border-[#3d444d] text-gray-200 hover:bg-gray-700" : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-white"
                            )}
                        >
                            <option value="classic">Clássico</option>
                            <option value="material">Material Design</option>
                            <option value="liquid-glass">Liquid Glass</option>
                            <option value="minimal">Minimalista</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            );
        }

        if (key === 'activeHighlight') {
            return (
                <div key={key} className="flex flex-col gap-2 mb-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                    <div className="relative">
                        <select
                            value={value || 'underline'}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className={cn(
                                "w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all shadow-sm",
                                isDark ? "bg-[#2d333b] border-[#3d444d] text-gray-200 hover:bg-gray-700" : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-white"
                            )}
                        >
                            <option value="none">Nenhum</option>
                            <option value="underline">Sublinhado</option>
                            <option value="color">Cor Relevante</option>
                            <option value="pill">Fundo Pill</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            );
        }

        if (key.includes('OverlayPosition') || key === 'overlayPosition') {
            return (
                <div key={key} className="flex flex-col gap-2 mb-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                    <div className="relative">
                        <select
                            value={value || 'center'}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className={cn(
                                "w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all shadow-sm",
                                isDark ? "bg-[#2d333b] border-[#3d444d] text-gray-200 hover:bg-gray-700" : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-white"
                            )}
                        >
                            <option value="center">Centro</option>
                            <option value="top-left">Canto Superior Esquerdo</option>
                            <option value="top-right">Canto Superior Direito</option>
                            <option value="bottom-left">Canto Inferior Esquerdo</option>
                            <option value="bottom-right">Canto Inferior Direito</option>
                            <option value="center-bottom">Centro Baixo</option>
                            <option value="center-top">Centro Topo</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            );
        }

        if (key.includes('OverlayVariant') || key === 'overlayVariant') {
            return (
                <div key={key} className="flex flex-col gap-2 mb-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                    <div className="relative">
                        <select
                            value={value || 'glass'}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className={cn(
                                "w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all shadow-sm",
                                isDark ? "bg-[#2d333b] border-[#3d444d] text-gray-200 hover:bg-gray-700" : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-white"
                            )}
                        >
                            <option value="glass">Cristal (Glass)</option>
                            <option value="solid">Sólido</option>
                            <option value="outline">Apenas Contorno</option>
                            <option value="minimal">Minimalista (Sombra)</option>
                            <option value="gradient">Portal (Gradiente)</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            );
        }

        if (key.includes('OverlayIcon') || key === 'overlayIcon') {
            return (
                <div key={key} className="flex flex-col gap-2 mb-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                    <div className="relative">
                        <select
                            value={value || 'none'}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className={cn(
                                "w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all shadow-sm",
                                isDark ? "bg-[#2d333b] border-[#3d444d] text-gray-200 hover:bg-gray-700" : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-white"
                            )}
                        >
                            <option value="none">Nenhum</option>
                            <option value="heart">Coração</option>
                            <option value="star">Estrela</option>
                            <option value="sparkles">Brilhos</option>
                            <option value="camera">Câmara</option>
                            <option value="map-pin">Localização</option>
                            <option value="gift">Presente</option>
                            <option value="plane">Avião</option>
                            <option value="calendar">Calendário</option>
                            <option value="info">Info</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            );
        }

        if (['isSticky', 'isTransparent', 'isScrollable'].includes(key)) {
            return (
                <div key={key} className="flex items-center justify-between mb-6 p-4 rounded-2xl bg-gray-500/5 ring-1 ring-gray-500/10">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                    <button
                        onClick={() => handleChange(key, !value)}
                        className={cn(
                            "w-12 h-6 rounded-full transition-all duration-300 relative",
                            value ? "bg-blue-500" : (isDark ? "bg-white/10" : "bg-gray-200")
                        )}
                    >
                        <div className={cn(
                            "w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-sm",
                            value ? "left-7" : "left-1"
                        )} />
                    </button>
                </div>
            );
        }

        if (key === 'opacity' || key === 'blurAmount') {
            const min = 0;
            const max = key === 'opacity' ? 100 : 20;
            return (
                <div key={key} className="flex flex-col gap-4 mb-6">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                        <span className="text-xs font-mono text-blue-500">{value}{key === 'opacity' ? '%' : 'px'}</span>
                    </div>
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={value}
                        onChange={(e) => handleChange(key, parseInt(e.target.value))}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>
            );
        }

        if (key === 'padding' && section.type === 'SeparatorSection') {
            return (
                <div key={key} className="flex flex-col gap-2 mb-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Espaçamento</label>
                    <div className="relative">
                        <select
                            value={value}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:bg-white transition-all shadow-sm"
                        >
                            <option value="small">Reduzido</option>
                            <option value="medium">Equilibrado</option>
                            <option value="large">Amplo</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            );
        }

        if (key === 'icon' && section.type === 'SplashSection') {
            return (
                <div key={key} className="flex flex-col gap-2 mb-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ícone de Destaque</label>
                    <div className="relative">
                        <select
                            value={value}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:bg-white transition-all shadow-sm"
                        >
                            <option value="none">Nenhum</option>
                            <option value="heart">Coração</option>
                            <option value="diamond">Diamante</option>
                            <option value="star">Estrela</option>
                            <option value="sparkles">Brilhos / Magia</option>
                            <option value="wine">Brinde / Celebração</option>
                            <option value="music">Música / Festa</option>
                            <option value="camera">Fotografia</option>
                            <option value="bird">Pomba (Baptismo)</option>
                            <option value="graduationCap">Graduação / Formatura</option>
                            <option value="ring">Anéis / Casamento</option>
                            <option value="cake">Bolo / Aniversário</option>
                            <option value="party">Festa / Celebração</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            );
        }

        if (key === 'lineVariant' && section.type === 'SplashSection') {
            return (
                <div key={key} className="flex flex-col gap-2 mb-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Estilo da Divisória</label>
                    <div className="relative">
                        <select
                            value={value}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:bg-white transition-all shadow-sm"
                        >
                            <option value="line">Linha Simples</option>
                            <option value="heart">Coração Minimalista</option>
                            <option value="diamond">Diamante Elegante</option>
                            <option value="dots">Três Pontos</option>
                            <option value="stars">Brilhos / Estrelas</option>
                            <option value="flourish">Ornamento Clássico</option>
                            <option value="leaf">Folha Orgânica</option>
                            <option value="double-line">Linha Dupla</option>
                            <option value="wave">Onda Suave</option>
                            <option value="none">Nenhum</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            );
        }

        if (key === 'navShape' || key === 'buttonShape') {
            return (
                <div key={key} className={cn(
                    "flex flex-col gap-2 mb-6 p-4 rounded-2xl transition-all duration-500",
                    isSelected
                        ? (isDark ? "bg-blue-500/10 ring-1 ring-blue-500/50" : "bg-blue-50 ring-1 ring-blue-200 shadow-md")
                        : "bg-transparent ring-1 ring-transparent hover:ring-gray-200"
                )}>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                    <div className="grid grid-cols-2 gap-2">
                        {AVAILABLE_BUTTON_SHAPES.map(shape => (
                            <button
                                key={shape.value}
                                onClick={() => handleChange(key, shape.value)}
                                className={cn(
                                    "px-3 py-2 text-xs rounded-lg border transition-all flex flex-col items-center gap-1",
                                    value === shape.value
                                        ? "bg-blue-50 border-blue-200 text-blue-600 ring-2 ring-blue-100"
                                        : (isDark ? "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600" : "bg-white border-gray-200 text-gray-600 hover:border-gray-300")
                                )}
                            >
                                <span className="font-medium">{shape.name}</span>
                                <div className={cn("w-8 h-3 bg-current opacity-20", shape.value)}></div>
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        if (key === 'buttonAlignment') {
            return (
                <div key={key} className={cn(
                    "flex flex-col gap-2 mb-6 p-4 rounded-2xl transition-all duration-500",
                    isSelected
                        ? (isDark ? "bg-blue-500/10 ring-1 ring-blue-500/50" : "bg-blue-50 ring-1 ring-blue-200 shadow-md")
                        : "bg-transparent ring-1 ring-transparent hover:ring-gray-200"
                )}>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        {label}
                    </label>
                    <div className="flex bg-gray-100 p-1 rounded-xl gap-1">
                        {AVAILABLE_BUTTON_ALIGNMENTS.map((align: any) => (
                            <button
                                key={align.value}
                                onClick={() => handleChange(key, align.value)}
                                className={cn(
                                    "flex-1 py-2 px-1 rounded-lg text-[10px] font-bold transition-all uppercase tracking-tighter",
                                    value === align.value ? "bg-white text-blue-600 shadow-sm scale-100" : "text-gray-400 hover:text-gray-600"
                                )}
                            >
                                {align.name}
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        if (key === 'contactType' && section.type === 'RSVPSection') {
            return (
                <div key={key} className="flex flex-col gap-2 mb-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                    <div className="relative">
                        <select
                            value={value}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className={cn(
                                "w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all shadow-sm",
                                isDark ? "bg-[#2d333b] border-[#3d444d] text-gray-200 hover:bg-gray-700" : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-white"
                            )}
                        >
                            <option value="email">E-mail</option>
                            <option value="phone">Chamada Telefónica</option>
                            <option value="sms">SMS</option>
                            <option value="whatsapp">WhatsApp</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            );
        }

        if (key === 'backgroundEffect' || key === 'backgroundParticles') {
            const colorKey = key === 'backgroundEffect' ? 'backgroundEffectColor' : 'backgroundParticlesColor';
            const showColorPicker = value && value !== 'none';

            return (
                <div key={key} className="flex flex-col gap-0">
                    <div className="flex flex-col gap-2 mb-6">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                        <div className="relative">
                            <select
                                value={value || 'none'}
                                onChange={(e) => handleChange(key, e.target.value)}
                                className={cn(
                                    "w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all shadow-sm",
                                    isDark ? "bg-[#2d333b] border-[#3d444d] text-gray-200 hover:bg-gray-700" : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-white"
                                )}
                            >
                                <option value="none">Nenhum</option>
                                <option value="hearts">Corações</option>
                                <option value="wine">Taças de Vinho</option>
                                <option value="birds">Pássaros</option>
                                <option value="flowers">Flores</option>
                                <option value="bubbles">Bolhas</option>
                                <option value="confetti">Confetes</option>
                                <option value="stars">Estrelas/Brilhos</option>
                                <option value="leaves">Folhas</option>
                                <option value="balloons">Balões</option>
                                <option value="hats">Hats/Capelos</option>
                                <option value="roses">Rosas</option>
                                <option value="rings">Alianças</option>
                                <option value="cakes">Bolos</option>
                                <option value="sparkles">Brilhos</option>
                                <option value="fireworks">Fogo de Artifício</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                    {showColorPicker && (
                        <div className="contents">
                            <ColorPicker
                                label={FieldLabels[colorKey]}
                                value={section.content[colorKey] || '#FFFFFF'}
                                onChange={(color) => handleChange(colorKey, color)}
                            />
                            {key === 'backgroundEffect' && (
                                <>
                                    <div className="flex flex-col gap-2 mb-6">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">
                                            {FieldLabels['backgroundEffectDirection']}
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={section.content.backgroundEffectDirection || 'up'}
                                                onChange={(e) => handleChange('backgroundEffectDirection', e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:bg-white transition-all shadow-sm"
                                            >
                                                <option value="up">De Baixo para Cima (Padrão)</option>
                                                <option value="down">De Cima para Baixo</option>
                                                <option value="left">Da Direita para Esquerda</option>
                                                <option value="right">Da Esquerda para Direita</option>
                                                <option value="random">Aleatório (Misto)</option>
                                            </select>
                                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* timing controls */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">
                                                {FieldLabels['backgroundEffectStart']}
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="300"
                                                    value={section.content.backgroundEffectStart || 0}
                                                    onChange={(e) => handleChange('backgroundEffectStart', parseInt(e.target.value) || 0)}
                                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 hover:bg-white transition-all shadow-sm font-mono"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">
                                                {FieldLabels['backgroundEffectEnd']}
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="300"
                                                    value={section.content.backgroundEffectEnd || 0}
                                                    onChange={(e) => handleChange('backgroundEffectEnd', parseInt(e.target.value) || 0)}
                                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 hover:bg-white transition-all shadow-sm font-mono"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-gray-400 mb-6 -mt-4 italic">
                                        * Use 0 para sempre ativos. O fim deve ser maior que o início.
                                    </p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            );
        }

        if (key === 'color' && section.type === 'SeparatorSection') {
            return (
                <div key={key}>
                    <ColorPicker
                        label="Cor da Divisória"
                        value={value || '#000000'}
                        onChange={(color) => handleChange(key, color)}
                    />
                </div>
            );
        }

        if (key === 'gradient' && section.type === 'SeparatorSection') {
            return (
                <div key={key} className="flex flex-col gap-2 mb-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">Gradiente</label>
                    <div className="relative">
                        <select
                            value={value}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className={cn(
                                "w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all shadow-sm",
                                isDark ? "bg-[#2d333b] border-[#3d444d] text-gray-200 hover:bg-gray-700" : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-white"
                            )}
                        >
                            <option value="none">Nenhum (Cor Sólida)</option>
                            <option value="sunset">Sunset (Laranja/Rosa)</option>
                            <option value="ocean">Ocean (Azul/Roxo)</option>
                            <option value="gold">Gold (Dourado)</option>
                            <option value="silver">Silver (Prata)</option>
                            <option value="lavender">Lavender (Roxo/Coral)</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            );
        }

        if (key === 'imageScale' || key === 'imageFeather') {
            const isFeather = key === 'imageFeather';
            return (
                <div key={key} className="flex flex-col gap-2 mb-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                    <div className="flex gap-4 items-center">
                        <input
                            type="range"
                            min={isFeather ? "0" : "0.5"}
                            max={isFeather ? "40" : "2"}
                            step={isFeather ? "1" : "0.1"}
                            value={value || (isFeather ? 0 : 1)}
                            onChange={(e) => handleChange(key, parseFloat(e.target.value))}
                            className="flex-1 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <span className="text-xs font-mono text-gray-400 w-8">
                            {isFeather ? `${value || 0}px` : `${Math.round((value || 1) * 100)}%`}
                        </span>
                    </div>
                </div>
            );
        }

        if (key.toLowerCase().includes('image') || key === 'imageUrl') {
            return (
                <div key={key} className="flex flex-col gap-2 mb-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className={cn(
                                "flex-1 border rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-500 transition-all shadow-sm",
                                isDark ? "bg-[#2d333b] border-[#3d444d] text-gray-200 hover:bg-gray-700" : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-white"
                            )}
                            placeholder="https://..."
                        />
                        <button className={cn(
                            "p-3 rounded-xl border transition-all shadow-sm",
                            isDark ? "bg-[#2a2f36] border-[#3d444d] text-gray-400 hover:text-blue-400" : "bg-gray-100 border-gray-100 text-gray-400 hover:text-blue-500 hover:bg-white"
                        )}>
                            <ImageIcon size={18} />
                        </button>
                    </div>
                </div>
            );
        }

        if (Array.isArray(value)) {
            return (
                <div key={key} className="flex flex-col gap-2 mb-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                    {value.map((item: any, idx: number) => (
                        <div key={idx} className={cn(
                            "p-4 rounded-2xl border mb-2 group shadow-sm hover:shadow-md transition-all relative",
                            isDark ? "bg-[#2d333b] border-[#3d444d]" : "bg-gray-50 border-gray-100"
                        )}>
                            {typeof item === 'string' ? (
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => {
                                            const newList = [...value];
                                            newList[idx] = e.target.value;
                                            handleChange(key, newList);
                                        }}
                                        className={cn(
                                            "flex-1 border rounded-lg px-2 py-2 text-xs font-medium",
                                            isDark ? "bg-black/20 border-white/5 text-gray-200" : "bg-white/50 border-gray-100 text-gray-900"
                                        )}
                                    />
                                </div>
                            ) : (
                                Object.entries(item).map(([iKey, iVal]) => (
                                    <div key={iKey} className="mb-2 last:mb-0">
                                        <span className="text-[8px] font-black text-gray-300 uppercase tracking-tighter mb-1 block">
                                            {{
                                                type: 'Tipo',
                                                content: 'Conteúdo',
                                                style: 'Estilo',
                                                listType: 'Tipo de Lista',
                                                format: 'Formato',
                                                contentFont: 'Fonte',
                                                contentColor: 'Cor',
                                                contentSize: 'Tamanho',
                                                itemFont: 'Fonte dos Itens',
                                                itemColor: 'Cor dos Itens',
                                                itemSize: 'Tamanho dos Itens',
                                                url: 'URL da Imagem',
                                                overlayText: 'Texto Overlay',
                                                overlayIcon: 'Ícone Overlay',
                                                overlayPosition: 'Posição',
                                                overlayVariant: 'Estilo',
                                                overlayColor: 'Cor'
                                            }[iKey] || iKey}
                                        </span>
                                        {iKey === 'icon' || iKey === 'overlayIcon' ? (
                                            <div className="relative">
                                                <select
                                                    value={iVal as string}
                                                    onChange={(e) => {
                                                        const newList = [...value];
                                                        newList[idx] = { ...item, [iKey]: e.target.value };
                                                        handleChange(key, newList);
                                                    }}
                                                    className="w-full bg-transparent border-none p-0 text-xs focus:ring-0 font-bold text-gray-700 appearance-none cursor-pointer"
                                                >
                                                    <option value="none">Nenhum</option>
                                                    <option value="gift">Presente Default</option>
                                                    <option value="plane">Viagem / Avião</option>
                                                    <option value="utensils">Cozinha / Jantar</option>
                                                    <option value="home">Casa / Lar</option>
                                                    <option value="dollar">Dinheiro / Cash</option>
                                                    <option value="bank">Banco / Transferência</option>
                                                    <option value="card">Cartão</option>
                                                    <option value="info">Informação</option>
                                                    <option value="heart">Coração</option>
                                                    <option value="star">Estrela</option>
                                                    <option value="sparkles">Brilhos</option>
                                                    <option value="map-pin">Pin</option>
                                                </select>
                                                <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                            </div>
                                        ) : iKey === 'overlayPosition' ? (
                                            <div className="relative">
                                                <select
                                                    value={iVal as string}
                                                    onChange={(e) => {
                                                        const newList = [...value];
                                                        newList[idx] = { ...item, [iKey]: e.target.value };
                                                        handleChange(key, newList);
                                                    }}
                                                    className="w-full bg-transparent border-none p-0 text-xs focus:ring-0 font-bold text-gray-700 appearance-none cursor-pointer"
                                                >
                                                    <option value="center">Centro</option>
                                                    <option value="top-left">Top Left</option>
                                                    <option value="top-right">Top Right</option>
                                                    <option value="bottom-left">Bottom Left</option>
                                                    <option value="bottom-right">Bottom Right</option>
                                                </select>
                                                <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                            </div>
                                        ) : iKey === 'overlayVariant' ? (
                                            <div className="relative">
                                                <select
                                                    value={iVal as string}
                                                    onChange={(e) => {
                                                        const newList = [...value];
                                                        newList[idx] = { ...item, [iKey]: e.target.value };
                                                        handleChange(key, newList);
                                                    }}
                                                    className="w-full bg-transparent border-none p-0 text-xs focus:ring-0 font-bold text-gray-700 appearance-none cursor-pointer"
                                                >
                                                    <option value="glass">Glass</option>
                                                    <option value="solid">Sólido</option>
                                                    <option value="outline">Outline</option>
                                                </select>
                                                <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                            </div>
                                        ) : iKey === 'type' ? (
                                            <div className="relative">
                                                <select
                                                    value={iVal as string}
                                                    onChange={(e) => {
                                                        const newList = [...value];
                                                        const newType = e.target.value;

                                                        if (newType === 'list') {
                                                            newList[idx] = {
                                                                type: 'list',
                                                                listType: 'unordered',
                                                                format: 'disc',
                                                                items: ['Novo item']
                                                            };
                                                        } else if (newType === 'image') {
                                                            newList[idx] = { type: 'image', url: 'https://images.unsplash.com/photo-1522673607200-164883eeba4c?w=800' };
                                                        } else {
                                                            newList[idx] = { type: 'text', content: 'Novo texto', style: 'paragraph' };
                                                        }
                                                        handleChange(key, newList);
                                                    }}
                                                    className="w-full bg-transparent border-none p-0 text-xs focus:ring-0 font-bold text-gray-700 appearance-none cursor-pointer"
                                                >
                                                    <option value="text">Texto</option>
                                                    <option value="image">Imagem</option>
                                                    <option value="list">Lista</option>
                                                </select>
                                                <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                            </div>
                                        ) : iKey === 'style' ? (
                                            <div className="relative">
                                                <select
                                                    value={iVal as string}
                                                    onChange={(e) => {
                                                        const newList = [...value];
                                                        newList[idx] = { ...item, [iKey]: e.target.value };
                                                        handleChange(key, newList);
                                                    }}
                                                    className="w-full bg-transparent border-none p-0 text-xs focus:ring-0 font-bold text-gray-700 appearance-none cursor-pointer"
                                                >
                                                    <option value="heading">Título</option>
                                                    <option value="paragraph">Parágrafo</option>
                                                </select>
                                                <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                            </div>
                                        ) : iKey === 'listType' ? (
                                            <div className="relative">
                                                <select
                                                    value={iVal as string}
                                                    onChange={(e) => {
                                                        const newList = [...value];
                                                        const newType = e.target.value;
                                                        newList[idx] = {
                                                            ...item,
                                                            listType: newType,
                                                            format: newType === 'ordered' ? 'decimal' : 'disc'
                                                        };
                                                        handleChange(key, newList);
                                                    }}
                                                    className="w-full bg-transparent border-none p-0 text-xs focus:ring-0 font-bold text-gray-700 appearance-none cursor-pointer"
                                                >
                                                    <option value="ordered">Numerada</option>
                                                    <option value="unordered">Simples (Marcadores)</option>
                                                </select>
                                                <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                            </div>
                                        ) : iKey === 'format' ? (
                                            <div className="relative">
                                                <select
                                                    value={iVal as string}
                                                    onChange={(e) => {
                                                        const newList = [...value];
                                                        newList[idx] = { ...item, [iKey]: e.target.value };
                                                        handleChange(key, newList);
                                                    }}
                                                    className="w-full bg-transparent border-none p-0 text-xs focus:ring-0 font-bold text-gray-700 appearance-none cursor-pointer"
                                                >
                                                    {item.listType === 'ordered' ? (
                                                        <>
                                                            <option value="decimal">1, 2, 3... (Algébrico)</option>
                                                            <option value="upper-roman">I, II, III... (Romano)</option>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <option value="disc">Círculo (Ponto)</option>
                                                            <option value="square">Quadrado</option>
                                                            <option value="triangle">Triângulo</option>
                                                            <option value="diamond">Diamante</option>
                                                        </>
                                                    )}
                                                </select>
                                                <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                            </div>
                                        ) : (iKey.endsWith('Font') || iKey.endsWith('Size') || iKey.endsWith('Color')) ? (
                                            <div className="mt-1">
                                                {iKey.endsWith('Font') ? (
                                                    <div className="relative">
                                                        <select
                                                            value={iVal as string || 'inherit'}
                                                            onChange={(e) => {
                                                                const newList = [...value];
                                                                newList[idx] = { ...item, [iKey]: e.target.value };
                                                                handleChange(key, newList);
                                                            }}
                                                            className="w-full bg-transparent border-none p-0 text-[10px] focus:ring-0 font-medium text-gray-500 appearance-none cursor-pointer"
                                                            style={{ fontFamily: iVal !== 'inherit' ? iVal as string : 'inherit' }}
                                                        >
                                                            {AVAILABLE_FONTS.map(font => (
                                                                <option key={font.value} value={font.value} style={{ fontFamily: font.value !== 'inherit' ? font.value : 'inherit' }}>
                                                                    {font.name.split(' (')[0]}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown size={10} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                                    </div>
                                                ) : iKey.endsWith('Size') ? (
                                                    <div className="relative">
                                                        <select
                                                            value={iVal as string || 'inherit'}
                                                            onChange={(e) => {
                                                                const newList = [...value];
                                                                newList[idx] = { ...item, [iKey]: e.target.value };
                                                                handleChange(key, newList);
                                                            }}
                                                            className="w-full bg-transparent border-none p-0 text-[10px] focus:ring-0 font-medium text-gray-500 appearance-none cursor-pointer"
                                                        >
                                                            {AVAILABLE_SIZES.map(size => (
                                                                <option key={size.value} value={size.value}>
                                                                    {size.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown size={10} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                                    </div>
                                                ) : (
                                                    <ColorPicker
                                                        value={iVal as string || '#000000'}
                                                        onChange={(val) => {
                                                            const newList = [...value];
                                                            newList[idx] = { ...item, [iKey]: val };
                                                            handleChange(key, newList);
                                                        }}
                                                        isDark={isDark}
                                                    />
                                                )}
                                            </div>
                                        ) : iKey === 'items' ? (
                                            <div className="flex flex-col gap-2">
                                                {(iVal as string[]).map((listItem, lIdx) => (
                                                    <div key={lIdx} className="flex gap-2 items-center">
                                                        <input
                                                            type="text"
                                                            value={listItem}
                                                            onChange={(e) => {
                                                                const newList = [...value];
                                                                const newItems = [...(newList[idx].items as string[])];
                                                                newItems[lIdx] = e.target.value;
                                                                newList[idx] = { ...item, items: newItems };
                                                                handleChange(key, newList);
                                                            }}
                                                            className="flex-1 bg-white/50 border border-gray-100 rounded-lg px-2 py-1 text-[10px] font-medium"
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                const newList = [...value];
                                                                const newItems = (newList[idx].items as string[]).filter((_, i) => i !== lIdx);
                                                                newList[idx] = { ...item, items: newItems };
                                                                handleChange(key, newList);
                                                            }}
                                                            className="text-gray-300 hover:text-red-500"
                                                        >
                                                            <Trash2 size={10} />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    onClick={() => {
                                                        const newList = [...value];
                                                        const newItems = [...(newList[idx].items as string[]), 'Novo item'];
                                                        newList[idx] = { ...item, items: newItems };
                                                        handleChange(key, newList);
                                                    }}
                                                    className="text-[8px] text-blue-500 font-bold flex items-center gap-1 mt-1"
                                                >
                                                    <Plus size={10} /> ADD ITEM DA LISTA
                                                </button>
                                            </div>
                                        ) : (
                                            <input
                                                type="text"
                                                readOnly={iKey === 'targetId'}
                                                value={iVal as string}
                                                onChange={(e) => {
                                                    if (iKey === 'targetId') return;
                                                    const newList = [...value];
                                                    newList[idx] = { ...item, [iKey]: e.target.value };
                                                    handleChange(key, newList);
                                                }}
                                                className={cn(
                                                    "w-full bg-transparent border-none p-0 text-xs focus:ring-0 font-bold placeholder:text-gray-300",
                                                    iKey === 'targetId' ? "text-gray-400 cursor-not-allowed" : "text-gray-700"
                                                )}
                                                placeholder={`Digitar ${iKey}...`}
                                            />
                                        )}
                                    </div>
                                ))
                            )}
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                <button
                                    onClick={() => {
                                        if (idx === 0) return;
                                        const newList = [...value];
                                        [newList[idx], newList[idx - 1]] = [newList[idx - 1], newList[idx]];
                                        handleChange(key, newList);
                                    }}
                                    className="p-1.5 text-gray-300 hover:text-blue-500"
                                >
                                    <ChevronUp size={14} />
                                </button>
                                <button
                                    onClick={() => {
                                        if (idx === value.length - 1) return;
                                        const newList = [...value];
                                        [newList[idx], newList[idx + 1]] = [newList[idx + 1], newList[idx]];
                                        handleChange(key, newList);
                                    }}
                                    className="p-1.5 text-gray-300 hover:text-blue-500"
                                >
                                    <ChevronDown size={14} />
                                </button>
                                <button
                                    onClick={() => {
                                        const newList = value.filter((_: any, i: number) => i !== idx);
                                        handleChange(key, newList);
                                    }}
                                    className="p-1.5 text-gray-300 hover:text-red-500"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {section.type === 'AgendaSection' && key === 'items' && (
                        <button
                            onClick={() => {
                                handleChange(key, [...value, { time: '00:00', label: 'Novo Evento', location: 'Local' }]);
                            }}
                            className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-100 rounded-2xl text-[8px] text-gray-400 hover:border-blue-200 hover:text-blue-500 transition-all font-black tracking-widest leading-tight mt-2"
                        >
                            <Plus size={12} /> ADD ITEM DE AGENDA
                        </button>
                    )}

                    {section.type === 'CustomSection' && key === 'elements' && (
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            <button
                                onClick={() => {
                                    handleChange(key, [...value, { type: 'text', content: 'Novo parágrafo', style: 'paragraph' }]);
                                }}
                                className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-100 rounded-2xl text-[8px] text-gray-400 hover:border-blue-200 hover:text-blue-500 transition-all font-black tracking-widest leading-tight"
                            >
                                <Plus size={12} /> ADD TEXTO
                            </button>
                            <button
                                onClick={() => {
                                    handleChange(key, [...value, { type: 'image', url: 'https://images.unsplash.com/photo-1522673607200-164883eeba4c?w=800' }]);
                                }}
                                className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-100 rounded-2xl text-[8px] text-gray-400 hover:border-blue-200 hover:text-blue-500 transition-all font-black tracking-widest leading-tight"
                            >
                                <Plus size={12} /> ADD IMAGEM
                            </button>
                            <button
                                onClick={() => {
                                    handleChange(key, [...value, { type: 'list', listType: 'unordered', format: 'disc', items: ['Novo item'] }]);
                                }}
                                className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-100 rounded-2xl text-[8px] text-gray-400 hover:border-blue-200 hover:text-blue-500 transition-all font-black tracking-widest leading-tight"
                            >
                                <Plus size={12} /> ADD LISTA
                            </button>
                        </div>
                    )}
                    {section.type === 'GiftsSection' && key === 'giftItems' && (
                        <button
                            onClick={() => {
                                handleChange(key, [...value, { id: Date.now().toString(), name: 'Nova Sugestão', description: 'Detalhes aqui...', icon: 'gift' }]);
                            }}
                            className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-100 rounded-2xl text-[8px] text-gray-400 hover:border-blue-200 hover:text-blue-500 transition-all font-black tracking-widest leading-tight mt-2"
                        >
                            <Plus size={12} /> ADD SUGESTÃO DE PRESENTE
                        </button>
                    )}

                    {section.type === 'RSVPSection' && key === 'attendanceOptions' && (
                        <button
                            onClick={() => {
                                handleChange(key, [...value, 'Nova Opção']);
                            }}
                            className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-100 rounded-2xl text-[8px] text-gray-400 hover:border-blue-200 hover:text-blue-500 transition-all font-black tracking-widest leading-tight mt-2"
                        >
                            <Plus size={12} /> ADD OPÇÃO DE RESPOSTA
                        </button>
                    )}
                </div>
            );
        }

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            return (
                <div key={key} className={cn(
                    "flex flex-col gap-2 mb-6 p-4 rounded-2xl border",
                    isDark ? "bg-[#2d333b] border-[#3d444d]" : "bg-gray-50 border-gray-100"
                )}>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</label>
                    {Object.entries(value).map(([iKey, iVal]) => (
                        <div key={iKey} className="flex flex-col gap-1 mb-3 last:mb-0">
                            <span className="text-[8px] font-black text-gray-300 uppercase tracking-tighter">{iKey}</span>
                            <input
                                type="text"
                                value={iVal as string}
                                onChange={(e) => {
                                    handleChange(key, { ...value, [iKey]: e.target.value });
                                }}
                                className={cn(
                                    "w-full border rounded-lg p-2 text-xs focus:ring-2 focus:ring-blue-500 transition-all shadow-sm font-medium",
                                    isDark ? "bg-black/20 border-white/5 text-gray-200" : "bg-white border-gray-100 text-gray-700 hover:bg-white"
                                )}
                                placeholder={`Digitar ${iKey}...`}
                            />
                        </div>
                    ))}
                </div>
            );
        }

        if (key === 'showRecipient' || key === 'showMessageField' || (section.type === 'GiftsSection' && (key === 'showBankDetails' || key === 'showGifts'))) {
            return (
                <div key={key} className={cn(
                    "flex items-center justify-between mb-6 p-4 rounded-2xl border",
                    isDark ? "bg-blue-900/20 border-blue-800/40" : "bg-blue-50/50 border-blue-100/50"
                )}>
                    <label className={cn(
                        "text-[10px] font-black uppercase tracking-widest",
                        isDark ? "text-blue-400" : "text-blue-600"
                    )}>{label}</label>
                    <button
                        onClick={() => handleChange(key, !value)}
                        className={cn(
                            "w-12 h-6 rounded-full transition-all relative",
                            value ? 'bg-blue-500' : (isDark ? 'bg-gray-700' : 'bg-gray-200')
                        )}
                    >
                        <div className={cn(
                            "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                            value ? 'right-1' : 'left-1'
                        )} />
                    </button>
                </div>
            );
        }

        return (
            <div key={key} className="flex flex-col gap-2 mb-6">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                <textarea
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                    rows={value.toString().length > 30 ? 3 : 1}
                    className={cn(
                        "w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 resize-none transition-all shadow-sm font-medium",
                        isDark ? "bg-[#2d333b] border-[#3d444d] text-gray-200 hover:bg-gray-700" : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-white"
                    )}
                    placeholder={`Digitar ${label.toLowerCase()}...`}
                />
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.25em] mb-1.5 block leading-none">Editor de Seção</span>
                    <h2 className={cn(
                        "text-xl font-black leading-none",
                        isDark ? "text-white" : "text-gray-900"
                    )}>{template?.name || 'Seção'}</h2>
                </div>
                <div className="flex gap-1">
                    <button
                        onClick={() => onMove('up')}
                        title="Mover para cima"
                        className={cn(
                            "p-2.5 rounded-xl transition-all border border-transparent",
                            isDark ? "hover:bg-gray-800 text-gray-500 hover:text-white" : "hover:bg-gray-100 text-gray-300 hover:text-gray-900 hover:border-gray-100"
                        )}
                    >
                        <ChevronUp size={20} />
                    </button>
                    <button
                        onClick={() => onMove('down')}
                        title="Mover para baixo"
                        className={cn(
                            "p-2.5 rounded-xl transition-all border border-transparent",
                            isDark ? "hover:bg-gray-800 text-gray-500 hover:text-white" : "hover:bg-gray-100 text-gray-300 hover:text-gray-900 hover:border-gray-100"
                        )}
                    >
                        <ChevronDown size={20} />
                    </button>
                </div>
            </div>

            <div className="relative flex-1 overflow-y-auto no-scrollbar pr-1">
                <div className="grid grid-cols-1">
                    <div className={cn(
                        "mb-8 p-5 rounded-[2rem] transition-all duration-500",
                        isDark
                            ? "bg-[#1e2329]/50 border border-white/5 backdrop-blur-md shadow-2xl"
                            : "bg-gray-50/80 border border-gray-100 backdrop-blur-md shadow-xl"
                    )}>
                        <PropertyNavigator
                            activeCategory={activeCategory}
                            onCategoryChange={onCategoryChange || (() => { })}
                            availableCategories={['section', 'button', 'text', 'image', 'form', 'items'].filter(cat => {
                                if (cat === 'form') return section.type === 'RSVPSection' || section.type === 'GuestbookSection';
                                if (cat === 'items') return section.type === 'AgendaSection' || section.type === 'GiftsSection';
                                if (cat === 'button') return ['SplashSection', 'HeroSection', 'RSVPSection', 'GuestbookSection'].includes(section.type);
                                if (cat === 'image') return ['SplashSection', 'HeroSection'].includes(section.type);
                                return true;
                            }) as PropertyCategory[]}
                            isDark={isDark}
                        />
                    </div>

                    <div className="space-y-6">
                        {/* Grouped Properties */}
                        <div className={cn(
                            "rounded-3xl border transition-all duration-300 overflow-hidden",
                            isDark ? "bg-[#1a1d23] border-[#2d333b]" : "bg-white border-gray-100 shadow-sm"
                        )}>
                            <button
                                onClick={() => toggleGroup('main')}
                                className={cn(
                                    "w-full flex items-center justify-between p-5 text-left transition-colors",
                                    isDark ? "hover:bg-white/5" : "hover:bg-gray-50"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-8 h-8 rounded-xl flex items-center justify-center",
                                        isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"
                                    )}>
                                        <PenTool size={16} />
                                    </div>
                                    <h2 className={cn(
                                        "text-sm font-black uppercase tracking-widest",
                                        isDark ? "text-white" : "text-black"
                                    )}>
                                        {CategoryHeaders[activeCategory]}
                                    </h2>
                                    {selectedElementKey && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); clearSelection(); }}
                                            className="text-[10px] text-blue-500 font-bold hover:underline flex items-center gap-1"
                                        >
                                            <XCircle size={10} /> LIMPAR
                                        </button>
                                    )}
                                </div>
                                <ChevronDown
                                    size={18}
                                    className={cn(
                                        "transition-transform duration-300 opacity-30",
                                        collapsedGroups['main'] && "rotate-180"
                                    )}
                                />
                            </button>

                            <div className={cn(
                                "transition-all duration-500 ease-in-out",
                                collapsedGroups['main'] ? "max-h-0 opacity-0" : "max-h-[2000px] opacity-100 p-5 pt-0"
                            )}>
                                <div className="grid grid-cols-1 gap-6 pt-4 border-t border-dashed border-gray-500/20">
                                    {Array.from(new Set([
                                        ...Object.keys(template?.defaultData || {}),
                                        ...Object.keys(section.content || {})
                                    ])).map(key => renderField(key, section.content[key] ?? template?.defaultData?.[key]))}
                                </div>
                            </div>
                        </div>

                        {/* Section Styles (Always in its own beautiful group) */}
                        <div className={cn(
                            "rounded-3xl border transition-all duration-300 overflow-hidden",
                            isDark ? "bg-[#1a1d23] border-[#2d333b]" : "bg-white border-gray-100 shadow-sm"
                        )}>
                            <button
                                onClick={() => toggleGroup('styles')}
                                className={cn(
                                    "w-full flex items-center justify-between p-5 text-left transition-colors",
                                    isDark ? "hover:bg-white/5" : "hover:bg-gray-50"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-8 h-8 rounded-xl flex items-center justify-center",
                                        isDark ? "bg-purple-500/10 text-purple-400" : "bg-purple-50 text-purple-600"
                                    )}>
                                        <Sparkles size={16} />
                                    </div>
                                    <h2 className={cn(
                                        "text-sm font-black uppercase tracking-widest",
                                        isDark ? "text-white" : "text-black"
                                    )}>
                                        Aparência & Fundo
                                    </h2>
                                </div>
                                <ChevronDown
                                    size={18}
                                    className={cn(
                                        "transition-transform duration-300 opacity-30",
                                        collapsedGroups['styles'] && "rotate-180"
                                    )}
                                />
                            </button>

                            <div className={cn(
                                "transition-all duration-500 ease-in-out",
                                collapsedGroups['styles'] ? "max-h-0 opacity-0" : "max-h-[1000px] opacity-100 p-5 pt-0"
                            )}>
                                <div className="grid grid-cols-1 gap-8 pt-4 border-t border-dashed border-gray-500/20">
                                    {/* Vertical Padding */}
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex justify-between items-center">
                                            Espaçamento Vertical
                                            <span className="bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full text-[9px] font-bold">
                                                {section.styles?.paddingTop || '80'}px
                                            </span>
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="200"
                                            step="8"
                                            value={parseInt(String(section.styles?.paddingTop || '80'))}
                                            onChange={(e) => {
                                                const val = `${e.target.value}px`;
                                                onUpdateStyles({ paddingTop: val, paddingBottom: val });
                                            }}
                                            className={cn(
                                                "w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-blue-600",
                                                isDark ? "bg-gray-800" : "bg-gray-100 outline-none"
                                            )}
                                        />
                                    </div>

                                    {/* Color Pickers in a Row */}
                                    <div className="grid grid-cols-1 gap-4">
                                        <ColorPicker
                                            label="Cor de Fundo"
                                            value={(section.styles?.backgroundColor as string) || '#ffffff'}
                                            onChange={(color) => onUpdateStyles({ backgroundColor: color })}
                                            isDark={isDark}
                                        />

                                        <ColorPicker
                                            label="Cor do Texto"
                                            value={(section.styles?.color as string) || '#000000'}
                                            onChange={(color) => onUpdateStyles({ color: color })}
                                            isDark={isDark}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-12 space-y-3 pb-8 px-2">
                    <button
                        onClick={onDelete}
                        className={cn(
                            "w-full flex items-center justify-center gap-3 p-5 text-[10px] font-black tracking-[0.3em] transition-all border group rounded-[2rem] active:scale-95",
                            isDark
                                ? "text-red-400 hover:bg-red-950/20 border-red-900/30 hover:border-red-500/50"
                                : "text-red-500 hover:bg-red-50 border-red-100 hover:border-red-200"
                        )}
                    >
                        <Trash2 size={16} className="group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                        ELIMINAR SEÇÃO
                    </button>
                </div>
            </div>
        </div>
    );
};
