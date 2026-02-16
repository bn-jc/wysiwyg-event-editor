import React from 'react';
import type { SectionDefinition, SectionContent } from '../types';
import { SECTION_TEMPLATES } from '../utils/SectionSchemaRegistry';
import { Trash2, ChevronDown, ChevronUp, Plus, Image as ImageIcon } from 'lucide-react';

interface PropertyEditorProps {
    section: SectionDefinition;
    onUpdate: (content: Partial<SectionContent>) => void;
    onDelete: () => void;
    onMove: (direction: 'up' | 'down') => void;
}

export const PropertyEditor: React.FC<PropertyEditorProps> = ({
    section,
    onUpdate,
    onDelete,
    onMove
}) => {
    const template = SECTION_TEMPLATES[section.templateId as keyof typeof SECTION_TEMPLATES];

    const handleChange = (key: string, value: any) => {
        onUpdate({ [key]: value });
    };

    const renderField = (key: string, value: any) => {
        const labelMap: Record<string, string> = {
            title: 'Título',
            subtitle: 'Subtítulo',
            coupleNames: 'Nomes do Casal',
            date: 'Data',
            buttonLabel: 'Texto do Botão',
            backgroundImage: 'Imagem de Fundo',
            imageUrl: 'URL da Imagem',
            imageMask: 'Máscara da Imagem',
            items: 'Itens da Agenda',
            deadline: 'Prazo Limite'
        };

        const label = labelMap[key] || key;

        if (key === 'imageMask') {
            return (
                <div key={key} className="flex flex-col gap-2 mb-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                    <select
                        value={value}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:bg-white transition-all shadow-sm"
                    >
                        <option value="none">Nenhuma</option>
                        <option value="heart">Coração</option>
                        <option value="circle">Círculo</option>
                        <option value="scallop">Ondulado</option>
                    </select>
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
                    {value.map((item, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-2 group shadow-sm hover:shadow-md transition-all relative">
                            {Object.entries(item).map(([iKey, iVal]) => (
                                <div key={iKey} className="mb-2 last:mb-0">
                                    <span className="text-[8px] font-black text-gray-300 uppercase tracking-tighter mb-1 block">{iKey}</span>
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
                                </div>
                            ))}
                            <button
                                onClick={() => {
                                    const newList = value.filter((_, i) => i !== idx);
                                    handleChange(key, newList);
                                }}
                                className="absolute top-2 right-2 p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => {
                            const newItem = value[0] ? { ...value[0] } : { time: '', label: '', location: '' };
                            const blankItem = Object.fromEntries(Object.keys(newItem).map(k => [k, '']));
                            handleChange(key, [...value, blankItem]);
                        }}
                        className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-100 rounded-2xl text-[10px] text-gray-400 hover:border-blue-200 hover:text-blue-500 transition-all font-black tracking-widest mt-2"
                    >
                        <Plus size={14} /> ADICIONAR ITEM
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

            <div className="flex-1 overflow-y-auto no-scrollbar pr-1">
                <div className="grid grid-cols-1">
                    {Object.entries(section.content).map(([key, value]) => renderField(key, value))}
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
