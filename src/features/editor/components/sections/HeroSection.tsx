import React from 'react';
import type { SectionRendererProps } from '../../types';
import { InlineText } from '../common/InlineText';

export const HeroSection: React.FC<SectionRendererProps> = ({
    section,
    globalStyles,
    onUpdate,
    device,
    readOnly
}) => {
    const { content } = section;
    const isMobile = device === 'mobile';

    return (
        <section
            className="px-6 flex flex-col items-center bg-transparent"
            style={{
                paddingTop: section.styles?.paddingTop || '80px',
                paddingBottom: section.styles?.paddingBottom || '80px',
                backgroundColor: section.styles?.backgroundColor
            }}
        >
            <div
                className="max-w-2xl w-full flex flex-col items-center text-center"
                style={{ gap: section.styles?.gap || '40px' }}
            >
                <InlineText
                    tagName="h2"
                    value={content.title}
                    onChange={(val) => onUpdate({ title: val })}
                    className={isMobile ? "text-4xl" : "text-5xl"}
                    readOnly={readOnly}
                    style={{
                        fontFamily: globalStyles.fontFamilyTitle,
                        color: section.styles?.color || globalStyles.primaryColor
                    }}
                />

                {content.imageUrl && (
                    <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden shadow-lg border-8 border-white group">
                        <svg width="0" height="0" className="absolute">
                            <defs>
                                <clipPath id="mask-heart" clipPathUnits="objectBoundingBox">
                                    <path d="M0.5,0.9 C0.2,0.7,0,0.5,0,0.3 C0,0.1,0.2,0,0.4,0 C0.55,0,0.65,0.1,0.75,0.2 C0.85,0.1,0.95,0,1.1,0 C1.3,0,1.5,0.1,1.5,0.3 C1.5,0.5,1.3,0.7,1,0.9 L0.75,1.1 L0.5,0.9 Z" transform="scale(0.66, 0.9) translate(0.01, 0)" />
                                </clipPath>
                                <clipPath id="mask-arch" clipPathUnits="objectBoundingBox">
                                    <path d="M0,1 L0,0.5 A0.5,0.5 0 0 1 1,0.5 L1,1 z" />
                                </clipPath>
                                <clipPath id="mask-diamond" clipPathUnits="objectBoundingBox">
                                    <path d="M0.5,0 L1,0.5 L0.5,1 L0,0.5 z" />
                                </clipPath>
                                <clipPath id="mask-hexagon" clipPathUnits="objectBoundingBox">
                                    <path d="M0.5,0 L1,0.25 L1,0.75 L0.5,1 L0,0.75 L0,0.25 z" />
                                </clipPath>
                                <clipPath id="mask-scallop" clipPathUnits="objectBoundingBox">
                                    <path d="M0.5,0 C0.3,0 0,0.2 0,0.5 C0,0.8 0.3,1 0.5,1 C0.7,1 1,0.8 1,0.5 C1,0.2 0.7,0 0.5,0 M0.2,0.2 Q0,0 0,0.2 T0.2,0.4 M0.8,0.2 Q1,0 1,0.2 T0.8,0.4" />
                                </clipPath>
                                <clipPath id="mask-star" clipPathUnits="objectBoundingBox">
                                    <path d="M0.5,0 L0.6,0.35 L1,0.35 L0.7,0.6 L0.8,1 L0.5,0.75 L0.2,1 L0.3,0.6 L0,0.35 L0.4,0.35 z" />
                                </clipPath>
                                <clipPath id="mask-cloud" clipPathUnits="objectBoundingBox">
                                    <path d="M0.25,0.4 C0.1,0.4,0,0.55,0,0.7 C0,0.85,0.1,1,0.25,1 L0.75,1 C0.9,1,1,0.85,1,0.7 C1,0.55,0.9,0.4,0.75,0.4 C0.75,0.2,0.6,0,0.45,0 C0.3,0,0.25,0.2,0.25,0.4 z" />
                                </clipPath>
                                <clipPath id="mask-squircle" clipPathUnits="objectBoundingBox">
                                    <path d="M0.5,0 C0.1,0,0,0.1,0,0.5 S0.1,1,0.5,1 S1,0.9,1,0.5 S0.9,0,0.5,0 z" />
                                </clipPath>
                                <clipPath id="mask-shield" clipPathUnits="objectBoundingBox">
                                    <path d="M0,0 L1,0 L1,0.6 C1,0.8,0.7,1,0.5,1 C0.3,1,0,0.8,0,0.6 z" />
                                </clipPath>
                            </defs>
                        </svg>
                        <img
                            src={content.imageUrl}
                            alt="Hero"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            style={{
                                clipPath: content.imageMask && content.imageMask !== 'none' && content.imageMask !== 'circle'
                                    ? `url(#mask-${content.imageMask})`
                                    : 'none',
                                borderRadius: content.imageMask === 'circle' ? '50%' : '0'
                            }}
                        />
                    </div>
                )}

                {content.showRecipient && (
                    <div className="flex gap-2 items-baseline opacity-60 mb-2">
                        <InlineText
                            tagName="span"
                            value={content.recipientPrefix || 'Convidado:'}
                            onChange={(val) => onUpdate({ recipientPrefix: val })}
                            className="text-xs uppercase tracking-tighter font-bold"
                            readOnly={readOnly}
                        />
                        <InlineText
                            tagName="span"
                            value={content.recipientName || '[Nome]'}
                            onChange={(val) => onUpdate({ recipientName: val })}
                            className="text-md italic"
                            readOnly={readOnly}
                        />
                    </div>
                )}

                <InlineText
                    tagName="p"
                    value={content.subtitle}
                    onChange={(val) => onUpdate({ subtitle: val })}
                    className="text-lg leading-relaxed opacity-80"
                    readOnly={readOnly}
                    style={{ color: section.styles?.color || globalStyles.secondaryColor }}
                />
            </div>
        </section>
    );
};
