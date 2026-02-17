import React from 'react';
import { Layers, Sparkles, Image as ImageIcon, Calendar, MessageSquare, PenTool, Clock, Minus, Menu } from 'lucide-react';

import type { SectionType } from './types';
import type { ContainerMode } from './hooks/useContainerSize';
import { cn } from '@/utils/cn';

interface SidebarItem {
    id: SectionType;
    name: string;
    icon: React.FC<any>;
}

interface SidebarCategory {
    id: string;
    name: string;
    items: SidebarItem[];
}

interface SidebarProps {
    onAddSection: (type: SectionType) => void;
    onToggleLayers: () => void;
    isLayersOpen: boolean;
    readOnly?: boolean;
    mode?: ContainerMode;
    hasSplash?: boolean;
    isDark?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
    onAddSection,
    onToggleLayers,
    isLayersOpen,
    readOnly = false,
    mode = 'wide',
    hasSplash = false,
    isDark = false
}) => {
    if (readOnly) return null;
    const [collapsed, setCollapsed] = React.useState(mode !== 'wide');

    // Auto-collapse when mode changes to non-wide
    React.useEffect(() => {
        if (mode !== 'wide') {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    }, [mode]);

    const categories: SidebarCategory[] = [
        {
            id: 'essentials',
            name: 'Essenciais',
            items: [
                { id: 'SplashSection', name: 'Portão', icon: Sparkles },
                { id: 'HeroSection', name: 'Início', icon: ImageIcon },
                { id: 'CountdownSection', name: 'Contagem', icon: Clock },
                { id: 'SeparatorSection', name: 'Divisor', icon: Minus },
            ]
        },
        {
            id: 'details',
            name: 'Detalhes',
            items: [
                { id: 'AgendaSection', name: 'Agenda', icon: Calendar },
                { id: 'RSVPSection', name: 'RSVP', icon: MessageSquare },
                { id: 'GuestbookSection', name: 'Mural', icon: PenTool },
            ]
        },
        {
            id: 'custom',
            name: 'Personalizado',
            items: [
                { id: 'CustomSection', name: 'Seção Livre', icon: Layers },
            ]
        }
    ];

    const isMobile = mode === 'mobile';

    return (
        <div className={cn(
            "flex flex-col items-center py-4 h-full shadow-sm z-20 transition-all duration-300",
            isDark ? "bg-[#1a1d23] border-r border-[#2d333b]" : "bg-white border-r border-gray-200",
            collapsed ? "w-14" : "w-24", // Slimmer when collapsed
            isMobile && "absolute bottom-0 left-0 w-full h-auto border-r-0 border-t flex-row justify-around py-2 z-50 overflow-x-auto"
        )}>
            {/* Toggle Button for Desktop/Compact */}
            {!isMobile && (
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className={cn(
                        "mb-4 p-2 transition-colors",
                        isDark ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-gray-600"
                    )}
                >
                    <Menu size={20} />
                </button>
            )}

            {/* Layers Toggle */}
            <div className={cn("flex flex-col items-center gap-1 mb-6", isMobile && "mb-0")}>
                <button
                    onClick={onToggleLayers}
                    className={cn(
                        "p-3 rounded-xl transition-colors border",
                        isLayersOpen
                            ? (isDark ? 'bg-blue-900/40 text-blue-400 border-blue-800' : 'bg-blue-100 text-blue-600 border-blue-200')
                            : (isDark ? 'bg-[#2d333b] text-gray-400 border-[#3d444d] hover:bg-gray-700' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-600'),
                        isMobile && "p-2"
                    )}
                >
                    <Layers size={isMobile ? 20 : 24} />
                </button>
                {!collapsed && !isMobile && <span className="text-[10px] font-medium text-gray-500 uppercase tracking-tighter">Camadas</span>}
            </div>

            {!isMobile && <div className={cn("w-8 h-[1px] mb-6", isDark ? "bg-gray-800" : "bg-gray-100")} />}

            {/* Section Templates */}
            <div className={cn("flex flex-col items-center gap-4 w-full", isMobile && "flex-row gap-2")}>
                {categories.map(cat => (
                    <div key={cat.id} className={cn("flex flex-col items-center gap-2 w-full", !isMobile && "mb-4", isMobile && "flex-row gap-1 border-r pr-2 last:border-0")}>
                        {!collapsed && !isMobile && <span className={cn("text-[8px] font-bold uppercase tracking-widest", isDark ? "text-gray-500" : "text-gray-500")}>{cat.name}</span>}

                        {cat.items.map(item => {
                            const isDisabled = item.id === 'SplashSection' && hasSplash;
                            return (
                                <div key={item.id} className="flex flex-col items-center gap-1 group relative px-1">
                                    <button
                                        onClick={() => !isDisabled && onAddSection(item.id)}
                                        disabled={isDisabled}
                                        className={cn(
                                            "p-3 rounded-xl transition-all border shadow-sm active:scale-95",
                                            isDark
                                                ? "bg-[#2d333b] hover:bg-[#323942] text-gray-300 hover:text-blue-400 border-[#3d444d] hover:border-blue-800"
                                                : "bg-gray-50 hover:bg-white text-gray-700 hover:text-blue-600 border-gray-100 hover:border-blue-200",
                                            !collapsed && "hover:scale-110",
                                            isMobile && "p-2",
                                            isDisabled && "opacity-40 cursor-not-allowed grayscale"
                                        )}
                                        title={isDisabled ? "Apenas uma Portão é permitida" : `Adicionar ${item.name}`}
                                    >
                                        <item.icon size={isMobile ? 18 : 22} />
                                    </button>
                                    {!collapsed && !isMobile && (
                                        <span className={cn("text-[10px] font-medium", isDark ? "text-gray-400" : "text-gray-500", isDisabled && "opacity-40")}>
                                            {item.name}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};
