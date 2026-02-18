import React, { useState } from 'react';
import {
    Layers,
    GripVertical,
    Box,
    EyeOff,
    Sparkles,
    Image as ImageIcon,
    Clock,
    Minus,
    Calendar,
    MessageSquare,
    PenTool,
    Gift,
    Menu
} from 'lucide-react';
import { cn } from '@/utils/cn';
import type { SectionDefinition, SectionType } from './types';
import { getTranslation } from './utils/translations';

interface SectionLayersPanelProps {
    sections: SectionDefinition[];
    activeSectionId: string | null;
    onSelect: (id: string) => void;
    onReorder: (startIndex: number, endIndex: number) => void;
    isDark?: boolean;
    language?: string;
}

const SECTION_ICONS: Record<SectionType, React.FC<any>> = {
    SplashSection: Sparkles,
    HeroSection: ImageIcon,
    CountdownSection: Clock,
    SeparatorSection: Minus,
    AgendaSection: Calendar,
    RSVPSection: MessageSquare,
    GuestbookSection: PenTool,
    GiftsSection: Gift,
    NavSection: Menu,
    CustomSection: Layers
};

const getSectionNames = (language: string): Record<SectionType, string> => {
    const t = getTranslation(language);
    return {
        SplashSection: t.sections.splash,
        HeroSection: t.sections.hero,
        CountdownSection: t.sections.countdown,
        SeparatorSection: t.sections.separator,
        AgendaSection: t.sections.agenda,
        RSVPSection: t.sections.rsvp,
        GuestbookSection: t.sections.guestbook,
        GiftsSection: t.sections.gifts,
        NavSection: t.sections.nav,
        CustomSection: t.sections.custom
    };
};

export const SectionLayersPanel: React.FC<SectionLayersPanelProps> = ({
    sections,
    activeSectionId,
    onSelect,
    onReorder,
    isDark = false,
    language = 'pt-PT'
}) => {
    const t = getTranslation(language);
    const SECTION_NAMES = getSectionNames(language);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const handleDragStart = (e: React.DragEvent, index: number) => {
        // Prevent dragging SplashSection if it's special
        if (sections[index].type === 'SplashSection') {
            e.preventDefault();
            return;
        }
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        // Add a ghost image or just let it be
        e.dataTransfer.setData('text/plain', index.toString());
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        // Prevent dragging anything to index 0 if index 0 is Splash
        if (index === 0 && sections[0].type === 'SplashSection') return;

        setDragOverIndex(index);
    };

    const handleDrop = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === null) return;

        // Final constraint check
        if (index === 0 && sections[0].type === 'SplashSection') return;

        onReorder(draggedIndex, index);
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    return (
        <div className={cn(
            "flex flex-col h-full border-r transition-all duration-300 w-64",
            isDark ? "bg-[#1a1d23] border-[#2d333b]" : "bg-white border-gray-200"
        )}>
            <div className={cn(
                "p-4 border-b font-bold text-xs uppercase tracking-widest flex items-center gap-2",
                isDark ? "text-gray-400 border-[#2d333b]" : "text-gray-500 border-gray-100"
            )}>
                <Layers size={14} className="text-blue-500" />
                {t.sidebar.sections}
            </div>

            <div className="flex-1 overflow-y-auto py-2 no-scrollbar">
                {sections.map((section, index) => {
                    const Icon = SECTION_ICONS[section.type] || Box;
                    const isActive = section.id === activeSectionId;
                    const isSplash = section.type === 'SplashSection';
                    const isDragging = draggedIndex === index;
                    const isDragOver = dragOverIndex === index;

                    return (
                        <div
                            key={section.id}
                            draggable={!isSplash}
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDrop={(e) => handleDrop(e, index)}
                            onDragEnd={handleDragEnd}
                            onClick={() => onSelect(section.id)}
                            className={cn(
                                "group relative flex items-center gap-3 px-4 py-3 cursor-pointer transition-all border-l-2",
                                isActive
                                    ? (isDark ? "bg-blue-900/20 border-blue-500 text-blue-100" : "bg-blue-50 border-blue-600 text-blue-900")
                                    : "border-transparent text-gray-500 hover:bg-gray-50",
                                isDark && !isActive && "hover:bg-[#2d333b] text-gray-400",
                                isDragging && "opacity-30",
                                isDragOver && (isDark ? "bg-blue-900/40" : "bg-blue-100"),
                                "mx-2 my-1 rounded-lg"
                            )}
                        >
                            {!isSplash && (
                                <div className={cn(
                                    "text-gray-300 group-hover:text-gray-400 cursor-grab active:cursor-grabbing",
                                    isDark ? "text-gray-600" : "text-gray-300"
                                )}>
                                    <GripVertical size={16} />
                                </div>
                            )}

                            {isSplash && <div className="w-4" />} {/* Spacer for splash */}

                            <div className={cn(
                                "p-1.5 rounded-md",
                                isActive
                                    ? (isDark ? "bg-blue-900/40 text-blue-400" : "bg-blue-100 text-blue-600")
                                    : (isDark ? "bg-gray-800 text-gray-500" : "bg-gray-100 text-gray-400")
                            )}>
                                <Icon size={14} />
                            </div>

                            <div className="flex flex-col min-w-0 flex-1">
                                <span className={cn(
                                    "text-xs font-semibold truncate",
                                    isActive ? (isDark ? "text-blue-100" : "text-blue-900") : (isDark ? "text-gray-300" : "text-gray-700")
                                )}>
                                    {section.content.title || SECTION_NAMES[section.type]}
                                </span>
                                <span className="text-[10px] opacity-60 truncate">
                                    {SECTION_NAMES[section.type]}
                                </span>
                            </div>

                            {section.isHidden && (
                                <EyeOff size={12} className="text-gray-400" />
                            )}
                        </div>
                    );
                })}
            </div>

            <div className={cn(
                "p-4 border-t text-[10px] font-medium italic",
                isDark ? "text-gray-500 border-[#2d333b]" : "text-gray-400 border-gray-100"
            )}>
                Dica: Arraste para reordenar
            </div>
        </div>
    );
};
