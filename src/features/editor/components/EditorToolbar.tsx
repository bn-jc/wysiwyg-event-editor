import React from 'react';
import { LayoutGrid, Save, Smartphone, Tablet, Monitor, Eye, Type, Music, Palette, Sparkle, Code } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { DeviceType, ViewMode, EventLayout } from '../types';
import { generateStandaloneHtml } from '../utils/exportHtml';
import type { ContainerMode } from '../hooks/useContainerSize';

interface EditorToolbarProps {
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    device: DeviceType;
    setDevice: (device: DeviceType) => void;
    onSave: () => void;
    selectedCount: number;
    globalStyles: EventLayout['globalStyles'];
    onUpdateGlobalStyles: (styles: Partial<EventLayout['globalStyles']>) => void;
    musicUrl?: string;
    onUpdateMusic: (url?: string) => void;
    effects?: EventLayout['effects'];
    onUpdateEffects: (effects: EventLayout['effects']) => void;
    layout: EventLayout;
    containerMode?: ContainerMode;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
    viewMode,
    setViewMode,
    device,
    setDevice,
    onSave,
    globalStyles,
    onUpdateGlobalStyles,
    musicUrl,
    onUpdateMusic,
    effects,
    onUpdateEffects,
    layout,
    containerMode = 'wide'
}) => {
    const isPreview = viewMode === 'preview';
    const isMobile = containerMode === 'mobile';
    const isCompact = containerMode === 'compact';

    const handleExport = () => {
        const html = generateStandaloneHtml(layout);
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${layout.name || 'convite'}.html`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className={cn(
            "flex h-16 items-center justify-between border-b bg-white shadow-sm z-30 transition-all",
            isMobile ? "px-2" : "px-6"
        )}>
            <div className="flex items-center gap-4">
                {!isMobile && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                            <LayoutGrid size={18} />
                        </div>
                        {!isCompact && (
                            <h1 className="text-sm font-black tracking-tighter text-gray-900 border-r pr-6 border-gray-100">
                                CONVITE PREMIUM
                            </h1>
                        )}
                    </div>
                )}

                <div className="flex gap-1 p-1 bg-gray-100/80 rounded-xl">
                    <button
                        onClick={() => setViewMode('edit')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                            viewMode === 'edit' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700",
                            isMobile && "px-2"
                        )}>
                        <Type size={14} /> {!isMobile && "EDITAR"}
                    </button>
                    <button
                        onClick={() => setViewMode('preview')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                            viewMode === 'preview' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700",
                            isMobile && "px-2"
                        )}>
                        <Eye size={14} /> {!isMobile && "PREVER"}
                    </button>
                </div>

                {!isMobile && <div className="h-6 w-[1px] bg-gray-100" />}

                {/* Global Theme Controls - Hide on mobile/compact to save space */}
                {!isPreview && !isMobile && !isCompact && (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                            <Palette size={14} className="text-gray-400" />
                            <input
                                type="color"
                                value={globalStyles.primaryColor}
                                onChange={(e) => onUpdateGlobalStyles({ primaryColor: e.target.value })}
                                className="w-4 h-4 rounded-full overflow-hidden p-0 border-none cursor-pointer"
                            />
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Tema</span>
                        </div>

                        {/* Layout Mode Toggle */}
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                            <LayoutGrid size={14} className="text-gray-400" />
                            <div className="flex gap-1">
                                <button
                                    onClick={() => onUpdateGlobalStyles({ layoutMode: 'boxed' })}
                                    className={cn(
                                        "p-1 rounded transition-all",
                                        (!globalStyles.layoutMode || globalStyles.layoutMode === 'boxed')
                                            ? "bg-white text-blue-600 shadow-sm"
                                            : "text-gray-400 hover:text-gray-600"
                                    )}
                                    title="Boxed Layout"
                                >
                                    <div className="w-3 h-3 border-2 border-current rounded-sm" />
                                </button>
                                <button
                                    onClick={() => onUpdateGlobalStyles({ layoutMode: 'full' })}
                                    className={cn(
                                        "p-1 rounded transition-all",
                                        globalStyles.layoutMode === 'full'
                                            ? "bg-white text-blue-600 shadow-sm"
                                            : "text-gray-400 hover:text-gray-600"
                                    )}
                                    title="Full Width Layout"
                                >
                                    <div className="w-4 h-3 bg-current rounded-sm opacity-50" />
                                </button>
                            </div>
                        </div>

                        {/* Language - Optional for now */}

                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                            <Music size={14} className="text-gray-400" />
                            <select
                                value={musicUrl || ''}
                                onChange={(e) => onUpdateMusic(e.target.value || undefined)}
                                className="bg-transparent text-[10px] font-bold text-gray-500 border-none p-0 focus:ring-0 cursor-pointer w-20"
                            >
                                <option value="">Sem Música</option>
                                <option value="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3">Piano</option>
                                <option value="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3">Marcha</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                            <Sparkle size={14} className="text-gray-400" />
                            <select
                                value={effects || 'none'}
                                onChange={(e) => onUpdateEffects(e.target.value as any)}
                                className="bg-transparent text-[10px] font-bold text-gray-500 border-none p-0 focus:ring-0 cursor-pointer w-20"
                            >
                                <option value="none">Sem Efeitos</option>
                                <option value="confetti">Confetes</option>
                                <option value="hearts">Corações</option>
                                <option value="balloons">Balões</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                {/* Device Toggles - Hide on mobile to prioritize actions */}
                {!isMobile && (
                    <div className="flex gap-1 p-1 bg-gray-100/80 rounded-xl">
                        <button
                            onClick={() => setDevice('desktop')}
                            className={cn(
                                "p-2 rounded-lg transition-all",
                                device === 'desktop' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                            )}
                            title="Desktop"
                        >
                            <Monitor size={18} />
                        </button>
                        <button
                            onClick={() => setDevice('tablet')}
                            className={cn(
                                "p-2 rounded-lg transition-all",
                                device === 'tablet' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                            )}
                            title="Tablet"
                        >
                            <Tablet size={18} />
                        </button>
                        <button
                            onClick={() => setDevice('mobile')}
                            className={cn(
                                "p-2 rounded-lg transition-all",
                                device === 'mobile' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                            )}
                            title="Smartphone"
                        >
                            <Smartphone size={18} />
                        </button>
                    </div>
                )}

                {!isMobile && <div className="w-[1px] h-6 bg-gray-200" />}

                <button
                    onClick={handleExport}
                    className={cn(
                        "flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold transition-all",
                        isMobile && "px-2"
                    )}
                    title="Exportar HTML"
                >
                    <Code size={14} />
                    {!isMobile && <span>HTML</span>}
                </button>

                <button
                    onClick={onSave}
                    className={cn(
                        "flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-black/10 transition-all hover:scale-105 active:scale-95",
                        isMobile && "px-3"
                    )}
                >
                    <Save size={14} />
                    {!isMobile && <span>GUARDAR</span>}
                </button>
            </div>
        </div>
    );
};
