import React from 'react';
import type { SectionDefinition, SectionContent } from '../types';
import { SECTION_TEMPLATES } from '../utils/SectionSchemaRegistry';
import { Trash2, ChevronDown, ChevronUp, Plus, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface PropertyEditorProps {
    section: SectionDefinition;
    onUpdate: (content: Partial<SectionContent>) => void;
    onUpdateStyles: (styles: React.CSSProperties) => void;
    onDelete: () => void;
    onMove: (direction: 'up' | 'down') => void;
}

export const PropertyEditor: React.FC<PropertyEditorProps> = ({
    section,
    onUpdate,
    onUpdateStyles,
    onDelete,
    onMove
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
            elements: 'Elementos da Seção'
        };

        const label = labelMap[key] || key;

        if (key === 'imageMask') {
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

        if (key === 'color' && section.type === 'SeparatorSection') {
            return (
                <div key={key} className="flex flex-col gap-2 mb-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">Cor da Divisória</label>
                    <div className="flex gap-2 items-center">
                        <input
                            type="color"
                            value={value || '#000000'}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className="w-12 h-12 bg-transparent border-none p-0 cursor-pointer rounded-lg overflow-hidden"
                        />
                        <input
                            type="text"
                            value={value || ''}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-500 hover:bg-white transition-all shadow-sm"
                            placeholder="Hex Code (ex: #FF0000)"
                        />
                    </div>
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

        if (key.toLowerCase().includes('image') || key === 'imageUrl') {
            return (
                <div key={key} className="flex flex-col gap-2 mb-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-500 hover:bg-white transition-all shadow-sm"
                            placeholder="https://..."
                        />
                        <button className="p-3 bg-gray-100 rounded-xl hover:bg-white border border-gray-100 text-gray-400 hover:text-blue-500 transition-all shadow-sm">
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
                        <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-2 group shadow-sm hover:shadow-md transition-all relative">
                            {Object.entries(item).map(([iKey, iVal]) => (
                                <div key={iKey} className="mb-2 last:mb-0">
                                    <span className="text-[8px] font-black text-gray-300 uppercase tracking-tighter mb-1 block">{iKey}</span>
                                    {iKey === 'type' ? (
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
                            ))}
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
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 resize-none hover:bg-white transition-all shadow-sm font-medium text-gray-700"
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
                    <h2 className="text-xl font-black text-gray-900 leading-none">{template?.name || 'Seção'}</h2>
                </div>
                <div className="flex gap-1">
                    <button
                        onClick={() => onMove('up')}
                        title="Mover para cima"
                        className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-300 hover:text-gray-900 transition-all border border-transparent hover:border-gray-100"
                    >
                        <ChevronUp size={20} />
                    </button>
                    <button
                        onClick={() => onMove('down')}
                        title="Mover para baixo"
                        className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-300 hover:text-gray-900 transition-all border border-transparent hover:border-gray-100"
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
                <div className="mt-8 pt-6 border-t border-gray-100">
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
                            className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
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
                            max="100"
                            step="4"
                            value={parseInt(String(section.styles?.gap || '24'))}
                            onChange={(e) => onUpdateStyles({ gap: `${e.target.value}px` })}
                            className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    <div className="flex flex-col gap-2 mb-6">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">Cor de Fundo</label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="color"
                                value={(section.styles?.backgroundColor as string) || '#ffffff'}
                                onChange={(e) => onUpdateStyles({ backgroundColor: e.target.value })}
                                className="w-12 h-12 bg-transparent border-none p-0 cursor-pointer rounded-lg overflow-hidden"
                            />
                            <input
                                type="text"
                                value={(section.styles?.backgroundColor as string) || ''}
                                onChange={(e) => onUpdateStyles({ backgroundColor: e.target.value })}
                                className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-500 hover:bg-white transition-all shadow-sm"
                                placeholder="Hex Code (ex: #FFFFFF)"
                            />
                        </div>
                    </div>

                    {/* Text Color Input */}
                    <div className="flex flex-col gap-2 mb-6">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">Cor do Texto</label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="color"
                                value={(section.styles?.color as string) || '#000000'}
                                onChange={(e) => onUpdateStyles({ color: e.target.value })}
                                className="w-12 h-12 bg-transparent border-none p-0 cursor-pointer rounded-lg overflow-hidden"
                            />
                            <input
                                type="text"
                                value={(section.styles?.color as string) || ''}
                                onChange={(e) => onUpdateStyles({ color: e.target.value })}
                                className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-500 hover:bg-white transition-all shadow-sm"
                                placeholder="Hex Code (ex: #000000)"
                            />
                        </div>
                    </div>

                    {section.type === 'AgendaSection' && (
                        <div className="flex flex-col gap-2 mb-6">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">Alinhamento do Texto</label>
                            <div className="flex gap-1 p-1 bg-gray-50 rounded-xl border border-gray-100">
                                <button
                                    onClick={() => onUpdateStyles({ textAlign: 'left' })}
                                    className={`flex-1 flex justify-center py-2 rounded-lg transition-all ${section.styles?.textAlign === 'left' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    <AlignLeft size={18} />
                                </button>
                                <button
                                    onClick={() => onUpdateStyles({ textAlign: 'center' })}
                                    className={`flex-1 flex justify-center py-2 rounded-lg transition-all ${(!section.styles?.textAlign || section.styles?.textAlign === 'center') ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    <AlignCenter size={18} />
                                </button>
                                <button
                                    onClick={() => onUpdateStyles({ textAlign: 'right' })}
                                    className={`flex-1 flex justify-center py-2 rounded-lg transition-all ${section.styles?.textAlign === 'right' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    <AlignRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
                <button
                    onClick={onDelete}
                    className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-2xl transition-all font-black text-xs tracking-[0.1em] shadow-sm hover:shadow-red-200"
                >
                    <Trash2 size={18} /> ELIMINAR SEÇÃO
                </button>
            </div>
        </div>
    );
};
