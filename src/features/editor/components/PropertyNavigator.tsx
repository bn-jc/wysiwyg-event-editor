import React from 'react';
import { cn } from '@/utils/cn';
import { Layout, Type, MousePointer2, Image as ImageIcon, ClipboardList, Package } from 'lucide-react';

export type PropertyCategory = 'section' | 'button' | 'text' | 'image' | 'form' | 'items';

interface PropertyNavigatorProps {
    activeCategory: PropertyCategory;
    onCategoryChange: (category: PropertyCategory) => void;
    availableCategories: PropertyCategory[];
    isDark?: boolean;
}

const CategoryMeta: Record<PropertyCategory, { label: string; icon: React.FC<any>; description: string }> = {
    section: {
        label: 'Seção',
        icon: Layout,
        description: 'Layout e fundo da seção'
    },
    button: {
        label: 'Botão',
        icon: MousePointer2,
        description: 'Estilos do botão de ação'
    },
    text: {
        label: 'Textos',
        icon: Type,
        description: 'Tipografia e cores'
    },
    image: {
        label: 'Imagem',
        icon: ImageIcon,
        description: 'Ajustes de imagem e máscara'
    },
    form: {
        label: 'Formulário',
        icon: ClipboardList,
        description: 'Configurações de campos'
    },
    items: {
        label: 'Itens',
        icon: Package,
        description: 'Gestão de lista de itens'
    }
};

export const PropertyNavigator: React.FC<PropertyNavigatorProps> = ({
    activeCategory,
    onCategoryChange,
    availableCategories,
    isDark = false
}) => {
    return (
        <div className={cn(
            "w-full flex flex-col gap-4",
            isDark ? "text-gray-400" : "text-gray-500"
        )}>
            {/* Header with Title */}
            <div className="flex items-center justify-between px-1">
                <span className={cn(
                    "text-[10px] font-black uppercase tracking-[0.2em] opacity-50",
                    isDark ? "text-white" : "text-black"
                )}>
                    Navegador
                </span>
                <span className={cn(
                    "text-[8px] font-medium opacity-30",
                    isDark ? "text-white" : "text-black"
                )}>
                    {availableCategories.length} categorias
                </span>
            </div>

            {/* Horizontal Chip List */}
            <div className="flex flex-wrap gap-2">
                {availableCategories.map((cat) => {
                    const Meta = CategoryMeta[cat];
                    const Icon = Meta.icon;
                    const isActive = activeCategory === cat;

                    return (
                        <button
                            key={cat}
                            onClick={() => onCategoryChange(cat)}
                            className={cn(
                                "flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 relative",
                                isActive
                                    ? (isDark
                                        ? "bg-blue-600/20 text-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.1)] ring-1 ring-blue-500/30"
                                        : "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.2)] scale-105 z-10")
                                    : (isDark
                                        ? "bg-[#2d333b]/50 hover:bg-[#323942] text-gray-400"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-500 hover:scale-105")
                            )}
                            title={Meta.description}
                        >
                            <Icon size={14} className={cn(
                                "transition-transform duration-300",
                                isActive && "scale-110"
                            )} />
                            <span className="text-[10px] font-bold tracking-tight">
                                {Meta.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
