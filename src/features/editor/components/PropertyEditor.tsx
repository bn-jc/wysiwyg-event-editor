import React from 'react';
import type { SectionDefinition, SectionContent } from '../types';
import { ColorPicker } from './common/ColorPicker';
import { SECTION_TEMPLATES } from '../utils/SectionSchemaRegistry';
import { Trash2, ChevronDown, ChevronUp, Plus, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface PropertyEditorProps {
    section: SectionDefinition;
    onUpdate: (content: Partial<SectionContent>) => void;
    onUpdateStyles: (styles: React.CSSProperties) => void;
    onDelete: () => void;
    onMove: (direction: 'up' | 'down') => void;
    isDark?: boolean;
}

export const PropertyEditor: React.FC<PropertyEditorProps> = ({
    section,
    onUpdate,
    onUpdateStyles,
    onDelete,
    onMove,
    isDark = false
}) => {
    const template = SECTION_TEMPLATES[section.type as keyof typeof SECTION_TEMPLATES];

    const handleChange = (key: string, value: any) => {
        onUpdate({ [key]: value });
    };

    const renderField = (key: string, value: any) => {
        const labelMap: Record<string, string> = {
            title: 'Título',
            subtitle: 'Subtítulo',
            names: 'Nomes',
            date: 'Data',
            buttonLabel: 'Texto do Botão',
            backgroundImage: 'Imagem de Fundo',
            imageUrl: 'URL da Imagem',
            imageMask: 'Máscara da Imagem',
            items: 'Itens da Agenda',
            deadline: 'Prazo Limite',
            variant: 'Estilo',
            padding: 'Espaçamento',
            color: 'Cor personalizada',
            gradient: 'Gradiente',
            elements: 'Elementos da Seção',
            showRecipient: 'Personalizar p/ Convidado',
            recipientPrefix: 'Rótulo (ex: Para:)',
            recipientName: 'Nome do Destinatário',
            description: 'Descrição / Convite',
            giftItems: 'Itens de Presente',
            bankDetails: 'Dados Bancários',
            showBankDetails: 'Mostrar Dados Bancários',
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
            footerText: 'Texto de Rodapé'
        };

        if (key === 'messageLabel' || key === 'messagePlaceholder') {
            if (section.content.showMessageField === false) return null;
        }

        if (['backgroundEffectColor', 'backgroundParticlesColor', 'backgroundEffectDirection', 'backgroundEffectStart', 'backgroundEffectEnd'].includes(key)) {
            return null;
        }

        const label = labelMap[key] || key;

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
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:bg-white transition-all shadow-sm"
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
                                label={labelMap[colorKey]}
                                value={section.content[colorKey] || '#FFFFFF'}
                                onChange={(color) => handleChange(colorKey, color)}
                            />
                            {key === 'backgroundEffect' && (
                                <>
                                    <div className="flex flex-col gap-2 mb-6">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">
                                            {labelMap['backgroundEffectDirection']}
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
                                                {labelMap['backgroundEffectStart']}
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
                                                {labelMap['backgroundEffectEnd']}
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
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:bg-white transition-all shadow-sm"
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
                                        <span className="text-[8px] font-black text-gray-300 uppercase tracking-tighter mb-1 block">{iKey}</span>
                                        {iKey === 'icon' ? (
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
                                                    <option value="gift">Presente Default</option>
                                                    <option value="plane">Viagem / Avião</option>
                                                    <option value="utensils">Cozinha / Jantar</option>
                                                    <option value="home">Casa / Lar</option>
                                                    <option value="dollar">Dinheiro / Cash</option>
                                                    <option value="bank">Banco / Transferência</option>
                                                    <option value="card">Cartão</option>
                                                    <option value="info">Informação</option>
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
                                                value={iVal as string}
                                                onChange={(e) => {
                                                    const newList = [...value];
                                                    newList[idx] = { ...item, [iKey]: e.target.value };
                                                    handleChange(key, newList);
                                                }}
                                                className="w-full bg-transparent border-none p-0 text-xs focus:ring-0 font-bold text-gray-700 placeholder:text-gray-300"
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
                    {Object.entries(section.content).map(([key, value]) => renderField(key, value))}
                </div>

                {/* Section Styles */}
                <div className={cn("mt-8 pt-6 border-t", isDark ? "border-gray-800" : "border-gray-100")}>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-4 block leading-none">Aparência da Seção</span>

                    <div className="flex flex-col gap-2 mb-6">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left flex justify-between">
                            Espaçamento Vertical
                            <span className="text-blue-500">{section.styles?.paddingTop || '80'}px</span>
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
                                isDark ? "bg-gray-800" : "bg-gray-100"
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-2 mb-6">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left flex justify-between">
                            Espaçamento Interno (Gap)
                            <span className="text-blue-500">{section.styles?.gap || '24'}px</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="64"
                            step="4"
                            value={parseInt(String(section.styles?.gap || '24'))}
                            onChange={(e) => onUpdateStyles({ gap: `${e.target.value}px` })}
                            className={cn(
                                "w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-blue-600",
                                isDark ? "bg-gray-800" : "bg-gray-100"
                            )}
                        />
                    </div>

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

                    {section.type === 'AgendaSection' && (
                        <div className="flex flex-col gap-2 mb-6">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">
                                Alinhamento do Texto
                            </label>
                            <div className={cn(
                                "flex gap-2 p-1 rounded-xl border",
                                isDark ? "bg-[#2d333b] border-[#3d444d]" : "bg-gray-50 border-gray-100"
                            )}>
                                <button
                                    onClick={() => onUpdateStyles({ textAlign: 'left' })}
                                    className={cn(
                                        "flex-1 flex justify-center p-2 rounded-lg transition-all",
                                        section.styles?.textAlign === 'left'
                                            ? (isDark ? 'bg-gray-800 text-blue-400 shadow-lg' : 'bg-white text-blue-500 shadow-sm')
                                            : (isDark ? 'text-gray-500 hover:bg-gray-800' : 'text-gray-400 hover:bg-white')
                                    )}
                                >
                                    <AlignLeft size={16} />
                                </button>
                                <button
                                    onClick={() => onUpdateStyles({ textAlign: 'center' })}
                                    className={cn(
                                        "flex-1 flex justify-center p-2 rounded-lg transition-all",
                                        section.styles?.textAlign === 'center' || !section.styles?.textAlign
                                            ? (isDark ? 'bg-gray-800 text-blue-400 shadow-lg' : 'bg-white text-blue-500 shadow-sm')
                                            : (isDark ? 'text-gray-500 hover:bg-gray-800' : 'text-gray-400 hover:bg-white')
                                    )}
                                >
                                    <AlignCenter size={16} />
                                </button>
                                <button
                                    onClick={() => onUpdateStyles({ textAlign: 'right' })}
                                    className={cn(
                                        "flex-1 flex justify-center p-2 rounded-lg transition-all",
                                        section.styles?.textAlign === 'right'
                                            ? (isDark ? 'bg-gray-800 text-blue-400 shadow-lg' : 'bg-white text-blue-500 shadow-sm')
                                            : (isDark ? 'text-gray-500 hover:bg-gray-800' : 'text-gray-400 hover:bg-white')
                                    )}
                                >
                                    <AlignRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="mt-8">
                        <button
                            onClick={onDelete}
                            className={cn(
                                "w-full flex items-center justify-center gap-2 p-4 text-xs font-bold transition-all border border-transparent group rounded-2xl",
                                isDark
                                    ? "text-red-400 hover:bg-red-950/30 hover:border-red-900/50"
                                    : "text-red-500 hover:bg-red-50 hover:border-red-100"
                            )}
                        >
                            <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
                            ELIMINAR ESTA SEÇÃO
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
