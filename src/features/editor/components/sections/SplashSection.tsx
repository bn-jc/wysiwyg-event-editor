import React from 'react';
import type { SectionRendererProps } from '../../types';
import { InlineText } from '../common/InlineText';

export const SplashSection: React.FC<SectionRendererProps> = ({
    section,
    globalStyles,
    onUpdate
}) => {
    const { content } = section;

    return (
        <div
            className="relative h-[100vh] min-h-[600px] w-full flex flex-col items-center justify-center text-white overflow-hidden"
            style={{ backgroundColor: globalStyles.primaryColor }}
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
            <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
                <InlineText
                    tagName="p"
                    value={content.title || 'Bem-vindos ao nosso evento'}
                    onChange={(val) => onUpdate({ title: val })}
                    className="text-sm md:text-md uppercase tracking-[0.3em] font-medium opacity-90"
                />

                <InlineText
                    tagName="h1"
                    value={content.coupleNames || 'Sofia & Tiago'}
                    onChange={(val) => onUpdate({ coupleNames: val })}
                    className="text-6xl md:text-8xl py-4"
                    style={{ fontFamily: globalStyles.fontFamilyTitle }}
                />

                <div className="w-16 h-[1px] bg-white/40 mb-2" />

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
