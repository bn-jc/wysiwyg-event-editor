import React from 'react';
import type { SectionRendererProps } from '../../types';
import { InlineText } from '../common/InlineText';
import { Heart, Diamond, Star, Sparkles, Wine, Music, Camera, Bird, GraduationCap, Leaf } from 'lucide-react';

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
    leaf: Leaf
};

export const SplashSection: React.FC<SectionRendererProps> = ({
    section,
    globalStyles,
    onUpdate
}) => {
    const { content } = section;

    return (
        <div
            className="relative h-[100vh] min-h-[600px] w-full flex flex-col items-center justify-center overflow-hidden bg-transparent"
            style={{
                backgroundColor: section.styles?.backgroundColor || globalStyles.primaryColor,
                color: section.styles?.color || '#ffffff'
            }}
        >
            {/* Background Image with Overlay */}
            {content.backgroundImage && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={content.backgroundImage}
                        alt="Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-black/40" />
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
                    className="text-sm md:text-md uppercase tracking-[0.3em] font-medium opacity-90"
                />

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
                    className="text-6xl md:text-8xl py-4"
                    style={{ fontFamily: globalStyles.fontFamilyTitle }}
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
                    className="text-lg md:text-xl font-light opacity-90 tracking-wide"
                />

                <button
                    className="mt-12 px-10 py-4 bg-white text-black rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl active:scale-95 whitespace-nowrap"
                    style={{ fontFamily: globalStyles.fontFamilyBody }}
                >
                    <InlineText
                        tagName="span"
                        value={content.buttonLabel || 'Abrir Convite'}
                        onChange={(val) => onUpdate({ buttonLabel: val })}
                    />
                </button>
            </div>
        </div>
    );
};
