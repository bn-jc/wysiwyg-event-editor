import React from 'react';
import type { SectionRendererProps } from '../../types';
import { cn } from '@/utils/cn';
import { InlineText } from '../common/InlineText';

import { Heart, Diamond, Star, Sparkles, Wine, Music, Camera, Bird, GraduationCap, Leaf, Gem, Dessert, PartyPopper } from 'lucide-react';

const IconMap: Record<string, React.FC<any>> = {
    heart: Heart,
    diamond: Diamond,
    star: Star,
    sparkles: Sparkles,
    wine: Wine,
    music: Music,
    camera: Camera,
    bird: Bird,
    graduationCap: GraduationCap,
    leaf: Leaf,
    ring: Gem,
    cake: Dessert,
    party: PartyPopper
};

export const SplashSection: React.FC<SectionRendererProps> = ({
    section,
    globalStyles,
    onUpdate,
    readOnly,
    onOpen,
    onElementSelect,
    isDark,
    externalInputState
}) => {
    const { content } = section;
    const externalValues = externalInputState?.values[section.id] || {};
    const recipientName = externalValues.recipientName || content.recipientName || '[Nome]';

    return (
        <div
            className="relative h-[100vh] min-h-[600px] w-full flex flex-col items-center justify-center overflow-hidden bg-transparent"
            style={{
                backgroundColor: isDark
                    ? (globalStyles.themeShades?.dark.background || '#121212')
                    : (section.styles?.backgroundColor || globalStyles.themeShades?.light.background || '#ffffff'),
                color: isDark
                    ? (globalStyles.themeShades?.dark.text || '#E0E0E0')
                    : (section.styles?.color || globalStyles.themeShades?.light.text || '#1a1a1a')
            }}
        >
            {/* Background Image with Overlay */}
            {content.backgroundImage && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={content.backgroundImage}
                        alt="Background"
                        className={cn("w-full h-full object-cover transition-opacity duration-1000", isDark ? "opacity-45" : "opacity-60")}
                    />
                    <div className={cn("absolute inset-0 transition-colors duration-1000", isDark ? "bg-black/65" : "bg-black/40")} />
                </div>
            )}

            {/* Content */}
            <div
                className="relative z-10 flex flex-col items-center px-6 text-center"
                style={{ gap: section.styles?.gap || '24px' }}
            >
                <InlineText
                    tagName="p"
                    value={content.title || 'Bem-vindos ao nosso evento'}
                    onChange={(val) => onUpdate({ title: val })}
                    onSelectElement={() => onElementSelect?.('title')}
                    className={cn(
                        "uppercase tracking-[0.3em] font-medium opacity-90",
                        content.titleSize && content.titleSize !== 'inherit' ? content.titleSize : "text-sm md:text-md"
                    )}
                    readOnly={readOnly}
                    style={{
                        fontFamily: content.titleFont && content.titleFont !== 'inherit' ? content.titleFont : 'inherit',
                        color: content.titleColor || 'inherit'
                    }}
                />

                {content.showRecipient && (
                    <div
                        className={cn(
                            "flex gap-2 items-baseline opacity-70 mt-2",
                            content.recipientSize && content.recipientSize !== 'inherit' ? content.recipientSize : ""
                        )}
                        style={{
                            fontFamily: content.recipientFont && content.recipientFont !== 'inherit' ? content.recipientFont : 'inherit',
                            color: content.recipientColor || 'inherit'
                        }}
                    >
                        <InlineText
                            tagName="span"
                            value={content.recipientPrefix || 'Para:'}
                            onChange={(val) => onUpdate({ recipientPrefix: val })}
                            onSelectElement={() => onElementSelect?.('recipientPrefix')}
                            className="text-xs uppercase tracking-widest font-bold"
                            readOnly={readOnly}
                        />
                        <InlineText
                            tagName="span"
                            value={recipientName}
                            onChange={(val) => onUpdate({ recipientName: val })}
                            onSelectElement={() => onElementSelect?.('recipientName')}
                            className="text-lg italic font-serif"
                            readOnly={readOnly}
                        />
                    </div>
                )}

                {content.icon && content.icon !== 'none' && (
                    <div className="py-2">
                        {(() => {
                            const SelectedIcon = IconMap[content.icon];
                            return SelectedIcon ? <SelectedIcon size={48} strokeWidth={1} className="opacity-80" /> : null;
                        })()}
                    </div>
                )}

                <InlineText
                    tagName="h1"
                    value={content.names || 'John & Jane'}
                    onChange={(val) => onUpdate({ names: val })}
                    onSelectElement={() => onElementSelect?.('names')}
                    className={cn(
                        "py-4",
                        content.namesSize && content.namesSize !== 'inherit' ? content.namesSize : "text-6xl md:text-8xl"
                    )}
                    readOnly={readOnly}
                    style={{
                        fontFamily: content.namesFont && content.namesFont !== 'inherit' ? content.namesFont : globalStyles.fontFamilyTitle,
                        color: content.namesColor || 'inherit'
                    }}
                />

                <div className="flex items-center justify-center w-full mb-4 h-12">
                    {(() => {
                        const variant = content.lineVariant || 'line';
                        if (variant === 'none') return null;

                        switch (variant) {
                            case 'heart':
                                return (
                                    <div className="flex items-center gap-4 w-32">
                                        <div className="h-[1px] flex-1 bg-white/40" />
                                        <Heart size={16} fill="white" className="opacity-80" />
                                        <div className="h-[1px] flex-1 bg-white/40" />
                                    </div>
                                );
                            case 'diamond':
                                return (
                                    <div className="flex items-center gap-4 w-32">
                                        <div className="h-[1px] flex-1 bg-white/40" />
                                        <div className="w-2.5 h-2.5 bg-white rotate-45 opacity-80" />
                                        <div className="h-[1px] flex-1 bg-white/40" />
                                    </div>
                                );
                            case 'dots':
                                return (
                                    <div className="flex gap-3">
                                        {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 bg-white/60 rounded-full" />)}
                                    </div>
                                );
                            case 'stars':
                                return (
                                    <div className="flex items-center gap-3">
                                        <Star size={10} fill="white" className="opacity-40" />
                                        <Star size={14} fill="white" className="opacity-80" />
                                        <Star size={10} fill="white" className="opacity-40" />
                                    </div>
                                );
                            case 'flourish':
                                return (
                                    <svg width="120" height="24" viewBox="0 0 120 24" className="opacity-60">
                                        <path d="M10 12 C 30 2, 45 22, 60 12 S 90 2, 110 12" stroke="white" strokeWidth="1.5" fill="none" />
                                        <circle cx="60" cy="12" r="3" fill="white" />
                                    </svg>
                                );
                            case 'leaf':
                                return (
                                    <div className="flex items-center gap-4 w-32">
                                        <div className="h-[1px] flex-1 bg-white/30" />
                                        <Leaf size={16} fill="white" className="opacity-80" />
                                        <div className="h-[1px] flex-1 bg-white/30" />
                                    </div>
                                );
                            case 'double-line':
                                return (
                                    <div className="flex flex-col gap-1 w-20">
                                        <div className="h-[1px] w-full bg-white/40" />
                                        <div className="h-[1px] w-full bg-white/20" />
                                    </div>
                                );
                            case 'wave':
                                return (
                                    <svg width="60" height="12" viewBox="0 0 60 12" className="opacity-60">
                                        <path d="M0 6 Q 7.5 0, 15 6 T 30 6 T 45 6 T 60 6" stroke="white" strokeWidth="2" fill="none" />
                                    </svg>
                                );
                            case 'line':
                            default:
                                return <div className="w-16 h-[1px]" style={{ backgroundColor: section.styles?.color ? `${section.styles.color}66` : 'rgba(255,255,255,0.4)' }} />;
                        }
                    })()}
                </div>

                <InlineText
                    tagName="p"
                    value={content.date || '20 de Junho de 2026'}
                    onChange={(val) => onUpdate({ date: val })}
                    onSelectElement={() => onElementSelect?.('date')}
                    className={cn(
                        "font-light opacity-90 tracking-wide",
                        content.dateSize && content.dateSize !== 'inherit' ? content.dateSize : "text-lg md:text-xl"
                    )}
                    readOnly={readOnly}
                    style={{
                        fontFamily: content.dateFont && content.dateFont !== 'inherit' ? content.dateFont : 'inherit',
                        color: content.dateColor || 'inherit'
                    }}
                />

                <div
                    className={cn(
                        "mt-12 w-full flex",
                        content.buttonAlignment === 'left' ? "justify-start" :
                            content.buttonAlignment === 'right' ? "justify-end" :
                                content.buttonAlignment === 'full' ? "justify-center" : "justify-center"
                    )}
                >
                    <button
                        onClick={readOnly ? onOpen : () => { }}
                        onMouseDown={(e) => {
                            if (!readOnly) {
                                e.stopPropagation();
                                onElementSelect?.('buttonLabel');
                            }
                        }}
                        className={cn(
                            "px-10 py-4 transition-all shadow-2xl active:scale-95 whitespace-nowrap",
                            content.buttonSize && content.buttonSize !== 'inherit'
                                ? content.buttonSize
                                : "text-xs",
                            content.buttonShape || "rounded-full",
                            content.buttonAlignment === 'full' && "w-full",
                            !content.buttonColor && "bg-white text-black hover:scale-105"
                        )}
                        style={{
                            fontFamily: content.buttonFont && content.buttonFont !== 'inherit' ? content.buttonFont : globalStyles.fontFamilyBody,
                            color: content.buttonColor || 'inherit',
                            backgroundColor: content.buttonColor ? `${content.buttonColor}11` : undefined,
                            border: content.buttonColor ? `1px solid ${content.buttonColor}` : undefined,
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em'
                        }}
                    >
                        <InlineText
                            tagName="span"
                            value={content.buttonLabel || 'Abrir Convite'}
                            onChange={(val) => onUpdate({ buttonLabel: val })}
                            onSelectElement={() => onElementSelect?.('buttonLabel')}
                            readOnly={readOnly}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};
