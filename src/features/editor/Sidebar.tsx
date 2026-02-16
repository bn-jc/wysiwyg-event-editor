import React from 'react';
import { Layers, Sparkles, Image as ImageIcon, Calendar, MessageSquare } from 'lucide-react';

interface SidebarProps {
    onAddSection: (templateId: string) => void;
    onToggleLayers: () => void;
    isLayersOpen: boolean;
    readOnly?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
    onAddSection,
    onToggleLayers,
    isLayersOpen,
    readOnly = false
}) => {
    if (readOnly) return null;

    const categories = [
        {
            id: 'essentials',
            name: 'Essenciais',
            items: [
                { id: 'splash-01', name: 'Portão', icon: Sparkles },
                { id: 'hero-01', name: 'Início', icon: ImageIcon },
            ]
        },
        {
            id: 'details',
            name: 'Detalhes',
            items: [
                { id: 'agenda-01', name: 'Agenda', icon: Calendar },
                { id: 'rsvp-01', name: 'RSVP', icon: MessageSquare },
            ]
        }
    ];

    return (
        <div className="w-16 flex flex-col items-center py-4 bg-white border-r border-gray-200 h-full shadow-sm z-20 overflow-y-auto no-scrollbar">
            {/* Layers Toggle */}
            <div className="flex flex-col items-center gap-1 mb-6">
                <button
                    onClick={onToggleLayers}
                    className={`p-3 rounded-xl transition-colors border ${isLayersOpen ? 'bg-blue-100 text-blue-600 border-blue-200' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-600'}`}
                >
                    <Layers size={24} />
                </button>
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-tighter">Camadas</span>
            </div>

            <div className="w-8 h-[1px] bg-gray-100 mb-6" />

            {/* Section Templates */}
            {categories.map(cat => (
                <div key={cat.id} className="flex flex-col items-center gap-4 w-full mb-6">
                    <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">{cat.name}</span>
                    {cat.items.map(item => (
                        <div key={item.id} className="flex flex-col items-center gap-1 group relative px-2">
                            <button
                                onClick={() => onAddSection(item.id)}
                                className="p-3 rounded-xl bg-gray-50 hover:bg-white text-gray-700 hover:text-blue-600 transition-all border border-gray-100 hover:border-blue-200 hover:scale-110 shadow-sm active:scale-95"
                                title={`Adicionar ${item.name}`}
                            >
                                <item.icon size={22} />
                            </button>
                            <span className="text-[10px] font-medium text-gray-500">{item.name}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
