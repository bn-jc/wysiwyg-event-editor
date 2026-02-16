import React from 'react';
import type { SectionRendererProps } from '../../types';
import { InlineText } from '../common/InlineText';

export const HeroSection: React.FC<SectionRendererProps> = ({
    section,
    globalStyles,
    onUpdate
}) => {
    const { content } = section;

    return (
        <section className="py-20 px-6 flex flex-col items-center gap-10 bg-white">
            <div className="max-w-md w-full flex flex-col items-center text-center gap-6">
                <InlineText
                    tagName="h2"
                    value={content.title}
                    onChange={(val) => onUpdate({ title: val })}
                    className="text-4xl md:text-5xl"
                    style={{ fontFamily: globalStyles.fontFamilyTitle, color: globalStyles.primaryColor }}
                />

                {content.imageUrl && (
                    <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden shadow-lg border-8 border-white group">
                        <img
                            src={content.imageUrl}
                            alt="Hero"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            style={{
                                clipPath: content.imageMask === 'heart'
                                    ? 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")'
                                    : 'none',
                                borderRadius: content.imageMask === 'circle' ? '50%' : '0'
                            }}
                        />
                    </div>
                )}

                <InlineText
                    tagName="p"
                    value={content.subtitle}
                    onChange={(val) => onUpdate({ subtitle: val })}
                    className="text-lg leading-relaxed opacity-80"
                    style={{ color: globalStyles.secondaryColor }}
                />
            </div>
        </section>
    );
};
