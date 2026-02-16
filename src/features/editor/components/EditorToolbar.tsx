import React from 'react';
import { LayoutGrid, Save, Smartphone, Tablet, Eye, Type, Globe, Music, Palette, Sparkle } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { DeviceType, ViewMode, EventLayout } from '../types';

interface EditorToolbarProps {
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    device: DeviceType;
    setDevice: (device: DeviceType) => void;
    onSave: () => void;
    selectedCount: number;
    globalStyles: EventLayout['globalStyles'];
    onUpdateGlobalStyles: (styles: Partial<EventLayout['globalStyles']>) => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
    viewMode,
    setViewMode,
    device,
    setDevice,
    onSave,
    selectedCount,
    globalStyles,
    onUpdateGlobalStyles
}) => {
    const isPreview = viewMode === 'preview';

    return (
        <div className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm z-30">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                        <LayoutGrid size={18} />
                    </div>
                    <h1 className="text-sm font-black tracking-tighter text-gray-900 border-r pr-6 border-gray-100">
                        CONVITE PREMIUM
                    </h1>
                </div>

                <div className="flex gap-1 p-1 bg-gray-100/80 rounded-xl">
                    <button
                        onClick={() => setViewMode('edit')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                            viewMode === 'edit' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}>
                        <Type size={14} /> EDITAR
                    </button>
                    <button
                        onClick={() => setViewMode('preview')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                            viewMode === 'preview' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}>
                        <Eye size={14} /> PREVER
                    </button>
                </div>

                <div className="h-6 w-[1px] bg-gray-100" />

                {/* Global Theme Controls */}
                {!isPreview && (
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

                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                            <Globe size={14} className="text-gray-400" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase select-none">PT-PT</span>
                        </div>

                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 group">
                            <Music size={14} className="text-gray-400" />
                            <span className="text-[10px] font-bold text-gray-500 truncate max-w-[80px]">Piano Class.</span>
                        </div>

                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                            <Sparkle size={14} className="text-gray-400" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Efeitos</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4">
                <div className="flex gap-1 p-1 bg-gray-100/80 rounded-xl">
                    <button
                        onClick={() => setDevice('tablet')}
                        className={cn(
                            "p-2 rounded-lg transition-all",
                            device === 'tablet' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
                        )}
                    >
                        <Tablet size={18} />
                    </button>
                    <button
                        onClick={() => setDevice('mobile')}
                        className={cn(
                            "p-2 rounded-lg transition-all",
                            device === 'mobile' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
                        )}
                    >
                        <Smartphone size={18} />
                    </button>
                </div>

                <div className="w-[1px] h-6 bg-gray-200" />

                <button
                    onClick={onSave}
                    className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-xl text-xs font-bold transition-all shadow-xl active:scale-95"
                >
                    <Save size={16} /> GUARDAR
                </button>
            </div>
        </div>
    );
};
