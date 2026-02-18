import React from 'react';
import { LayoutGrid, Smartphone, Tablet, Monitor, Eye, Type, Music, Palette, Sun, Moon } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { DeviceType, ViewMode, EventLayout } from '../types';
import type { ContainerMode } from '../hooks/useContainerSize';
import { ColorPicker } from './common/ColorPicker';
import { getTranslation } from '../utils/translations';

interface EditorToolbarProps {
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    device: DeviceType;
    setDevice: (device: DeviceType) => void;
    selectedCount: number;
    globalStyles: EventLayout['globalStyles'];
    onUpdateGlobalStyles: (styles: Partial<EventLayout['globalStyles']>) => void;
    musicUrl?: string;
    onUpdateMusic: (url?: string) => void;
    containerMode?: ContainerMode;
    onPlay: () => void;
    isDark?: boolean;
    onToggleDark?: () => void;
    language?: string;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
    viewMode,
    setViewMode,
    device,
    setDevice,
    globalStyles,
    onUpdateGlobalStyles,
    musicUrl,
    onUpdateMusic,
    containerMode = 'wide',
    onPlay,
    isDark,
    onToggleDark,
    language = 'pt-PT'
}) => {
    const t = getTranslation(language);
    const [showColorPicker, setShowColorPicker] = React.useState(false);
    const pickerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setShowColorPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isPreview = viewMode === 'preview';
    const isMobile = containerMode === 'mobile';
    const isCompact = containerMode === 'compact';

    return (
        <div className={cn(
            "flex h-16 items-center justify-between border-b shadow-sm z-30 transition-all",
            isDark ? "bg-[#1a1d23] border-[#2d333b]" : "bg-white border-gray-100",
            isMobile ? "px-2" : "px-6"
        )}>
            <div className="flex items-center gap-4">
                {!isMobile && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                            <LayoutGrid size={18} />
                        </div>
                        {!isCompact && (
                            <h1 className={cn(
                                "text-sm font-black tracking-tighter border-r pr-6",
                                isDark ? "text-white border-[#2d333b]" : "text-gray-900 border-gray-100"
                            )}>
                                CONVITE PREMIUM
                            </h1>
                        )}
                    </div>
                )}

                <div className={cn(
                    "flex gap-1 p-1 rounded-xl",
                    isDark ? "bg-[#2d333b]" : "bg-gray-100/80"
                )}>
                    <button
                        onClick={() => setViewMode('edit')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                            viewMode === 'edit'
                                ? (isDark ? "bg-[#1a1d23] text-blue-400 shadow-lg" : "bg-white text-blue-600 shadow-sm")
                                : (isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"),
                            isMobile && "px-2"
                        )}>
                        <Type size={14} /> {!isMobile && t.toolbar.edit}
                    </button>
                    <button
                        onClick={() => setViewMode('preview')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                            viewMode === 'preview'
                                ? (isDark ? "bg-[#1a1d23] text-blue-400 shadow-lg" : "bg-white text-blue-600 shadow-sm")
                                : (isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"),
                            isMobile && "px-2"
                        )}>
                        <Eye size={14} /> {!isMobile && t.toolbar.preview}
                    </button>
                </div>

                {onToggleDark && (
                    <button
                        onClick={onToggleDark}
                        className={cn(
                            "p-2 rounded-xl transition-all",
                            isDark
                                ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        )}
                        title={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
                    >
                        {isDark ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                )}

                {!isMobile && <div className="h-6 w-[1px] bg-gray-100" />}

                {/* Global Theme Controls - Hide on mobile/compact to save space */}
                {!isPreview && !isMobile && !isCompact && (
                    <div className="flex items-center gap-4">
                        <div className="relative" ref={pickerRef}>
                            <button
                                onClick={() => setShowColorPicker(!showColorPicker)}
                                className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 hover:bg-white transition-all shadow-sm"
                            >
                                <Palette size={14} className="text-gray-400" />
                                <div
                                    className="w-4 h-4 rounded-full border border-gray-200"
                                    style={{ backgroundColor: globalStyles.primaryColor }}
                                />
                                <span className="text-[10px] font-bold text-gray-400 uppercase">{t.toolbar.theme}</span>
                            </button>

                            {showColorPicker && (
                                <div className="absolute top-full left-0 mt-2 p-4 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 w-64 animate-in fade-in zoom-in-95">
                                    <div className="space-y-4">
                                        <div className="pt-0">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3">{t.toolbar.lightMode}</span>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">{t.toolbar.background}</span>
                                                    <ColorPicker
                                                        value={globalStyles.themeShades?.light.background || '#ffffff'}
                                                        onChange={(color) => {
                                                            const currentShades = globalStyles.themeShades || {
                                                                light: { background: '#ffffff', text: '#1a1a1a' },
                                                                dark: { background: '#121212', text: '#e0e0e0' }
                                                            };
                                                            onUpdateGlobalStyles({
                                                                themeShades: {
                                                                    ...currentShades,
                                                                    light: { ...currentShades.light, background: color }
                                                                }
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">{t.toolbar.text}</span>
                                                    <ColorPicker
                                                        value={globalStyles.themeShades?.light.text || '#1a1a1a'}
                                                        onChange={(color) => {
                                                            const currentShades = globalStyles.themeShades || {
                                                                light: { background: '#ffffff', text: '#1a1a1a' },
                                                                dark: { background: '#121212', text: '#e0e0e0' }
                                                            };
                                                            onUpdateGlobalStyles({
                                                                themeShades: {
                                                                    ...currentShades,
                                                                    light: { ...currentShades.light, text: color }
                                                                }
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-2 border-t border-gray-100">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3">{t.toolbar.darkMode}</span>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">{t.toolbar.background}</span>
                                                    <ColorPicker
                                                        value={globalStyles.themeShades?.dark.background || '#121212'}
                                                        onChange={(color) => {
                                                            const currentShades = globalStyles.themeShades || {
                                                                light: { background: '#ffffff', text: '#1a1a1a' },
                                                                dark: { background: '#121212', text: '#e0e0e0' }
                                                            };
                                                            onUpdateGlobalStyles({
                                                                themeShades: {
                                                                    ...currentShades,
                                                                    dark: { ...currentShades.dark, background: color }
                                                                }
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">{t.toolbar.text}</span>
                                                    <ColorPicker
                                                        value={globalStyles.themeShades?.dark.text || '#e0e0e0'}
                                                        onChange={(color) => {
                                                            const currentShades = globalStyles.themeShades || {
                                                                light: { background: '#ffffff', text: '#1a1a1a' },
                                                                dark: { background: '#121212', text: '#e0e0e0' }
                                                            };
                                                            onUpdateGlobalStyles({
                                                                themeShades: {
                                                                    ...currentShades,
                                                                    dark: { ...currentShades.dark, text: color }
                                                                }
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
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
                                    title={t.toolbar.boxed}
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
                                    title={t.toolbar.full}
                                >
                                    <div className="w-4 h-3 bg-current rounded-sm opacity-50" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                            <Music size={14} className="text-gray-400" />
                            <select
                                value={musicUrl || ''}
                                onChange={(e) => onUpdateMusic(e.target.value || undefined)}
                                className="bg-transparent text-[10px] font-bold text-gray-500 border-none p-0 focus:ring-0 cursor-pointer w-20"
                            >
                                <option value="">{t.toolbar.noMusic}</option>
                                <option value="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3">{t.toolbar.piano}</option>
                                <option value="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3">{t.toolbar.march}</option>
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
                            title={t.toolbar.desktop}
                        >
                            <Monitor size={18} />
                        </button>
                        <button
                            onClick={() => setDevice('tablet')}
                            className={cn(
                                "p-2 rounded-lg transition-all",
                                device === 'tablet' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                            )}
                            title={t.toolbar.tablet}
                        >
                            <Tablet size={18} />
                        </button>
                        <button
                            onClick={() => setDevice('mobile')}
                            className={cn(
                                "p-2 rounded-lg transition-all",
                                device === 'mobile' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                            )}
                            title={t.toolbar.mobile}
                        >
                            <Smartphone size={18} />
                        </button>
                    </div>
                )}

                {!isMobile && <div className="w-[1px] h-6 bg-gray-200" />}

                <button
                    onClick={onPlay}
                    className={cn(
                        "flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-2xl text-xs font-black shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95",
                        isMobile && "px-3"
                    )}
                >
                    <LayoutGrid size={16} className="fill-current" />
                    {!isMobile && <span>{t.toolbar.play}</span>}
                </button>
            </div>
        </div>
    );
};
