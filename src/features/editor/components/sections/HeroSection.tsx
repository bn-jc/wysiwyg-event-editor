import React from 'react';
import type { SectionRendererProps } from '../../types';
import { cn } from '@/utils/cn';
import { InlineText } from '../common/InlineText';


const MASK_PATHS: Record<string, { d: string; transform?: string }> = {
    heart: { d: "M0.5,0.9 C0.2,0.7,0,0.5,0,0.3 C0,0.1,0.2,0,0.4,0 C0.55,0,0.65,0.1,0.75,0.2 C0.85,0.1,0.95,0,1.1,0 C1.3,0,1.5,0.1,1.5,0.3 C1.5,0.5,1.3,0.7,1,0.9 L0.75,1.1 L0.5,0.9 Z", transform: "scale(0.66, 0.9) translate(0.01, 0)" },
    arch: { d: "M0,1 L0,0.5 A0.5,0.5 0 0 1 1,0.5 L1,1 z" },
    diamond: { d: "M0.5,0 L1,0.5 L0.5,1 L0,0.5 z" },
    hexagon: { d: "M0.5,0 L1,0.25 L1,0.75 L0.5,1 L0,0.75 L0,0.25 z" },
    scallop: { d: "M0.5,0 C0.3,0 0,0.2 0,0.5 C0,0.8 0.3,1 0.5,1 C0.7,1 1,0.8 1,0.5 C1,0.2 0.7,0 0.5,0 M0.2,0.2 Q0,0 0,0.2 T0.2,0.4 M0.8,0.2 Q1,0 1,0.2 T0.8,0.4" },
    star: { d: "M0.5,0 L0.6,0.35 L1,0.35 L0.7,0.6 L0.8,1 L0.5,0.75 L0.2,1 L0.3,0.6 L0,0.35 L0.4,0.35 z" },
    cloud: { d: "M0.25,0.4 C0.1,0.4,0,0.55,0,0.7 C0,0.85,0.1,1,0.25,1 L0.75,1 C0.9,1,1,0.85,1,0.7 C1,0.55,0.9,0.4,0.75,0.4 C0.75,0.2,0.6,0,0.45,0 C0.3,0,0.25,0.2,0.25,0.4 z" },
    squircle: { d: "M0.5,0 C0.1,0,0,0.1,0,0.5 S0.1,1,0.5,1 S1,0.9,1,0.5 S0.9,0,0.5,0 z" },
    shield: { d: "M0,0 L1,0 L1,0.6 C1,0.8,0.7,1,0.5,1 C0.3,1,0,0.8,0,0.6 z" },
    triangle: { d: "M0.5,0 L1,1 L0,1 z" },
    pentagon: { d: "M0.5,0 L1,0.38 L0.81,1 L0.19,1 L0,0.38 z" },
    octagon: { d: "M0.3,0 L0.7,0 L1,0.3 L1,0.7 L0.7,1 L0.3,1 L0,0.7 L0,0.3 z" },
    circle: { d: "M 0.5, 0.5 m -0.5, 0 a 0.5,0.5 0 1,0 1,0 a 0.5,0.5 0 1,0 -1,0" }
};

export const HeroSection: React.FC<SectionRendererProps> = ({
    section,
    globalStyles,
    onUpdate,
    device,
    readOnly,
    onElementSelect,
    isDark,
    externalInputState
}) => {
    const { content } = section;
    const isMobile = device === 'mobile';
    const activeMaskPath = content.imageMask && MASK_PATHS[content.imageMask];
    const externalValues = externalInputState?.values[section.id] || {};
    const recipientName = externalValues.recipientName || content.recipientName || '[Nome]';

    return (
        <section
            className={`px-6 flex flex-col ${content.layout === 'left' ? 'items-start' : 'items-center'} bg-transparent relative overflow-hidden`}
            style={{
                paddingTop: section.styles?.paddingTop || '80px',
                paddingBottom: section.styles?.paddingBottom || '80px',
                color: isDark
                    ? (globalStyles.themeShades?.dark.text || '#E0E0E0')
                    : (section.styles?.color || globalStyles.themeShades?.light.text || '#1a1a1a')
            }}
        >
            <div
                className={`max-w-2xl w-full flex flex-col ${content.layout === 'left' ? 'items-start text-left' : 'items-center text-center'}`}
                style={{ gap: section.styles?.gap || '40px' }}
            >
                <InlineText
                    tagName="h2"
                    value={content.title}
                    onChange={(val) => onUpdate({ title: val })}
                    onSelectElement={() => onElementSelect?.('title')}
                    className={cn(
                        content.titleSize && content.titleSize !== 'inherit' ? content.titleSize : (isMobile ? "text-3xl" : "text-5xl")
                    )}
                    readOnly={readOnly}
                    style={{
                        fontFamily: content.titleFont && content.titleFont !== 'inherit' ? content.titleFont : globalStyles.fontFamilyTitle,
                        color: content.titleColor || section.styles?.color || 'inherit'
                    }}
                />

                {content.imageUrl && (
                    <div className="relative group">
                        {/* Decoration Elements */}
                        {content.imageDecoration === 'floral' && (
                            <>
                                <div className="absolute -top-10 -left-10 w-24 h-24 text-rose-200/40 pointer-events-none transform -rotate-12">
                                    <svg viewBox="0 0 100 100" fill="currentColor">
                                        <path d="M50 0 C60 20 80 30 100 30 C80 30 70 50 70 70 C70 50 50 40 30 40 C50 40 60 20 50 0" />
                                        <circle cx="50" cy="50" r="5" />
                                    </svg>
                                </div>
                                <div className="absolute -bottom-10 -right-10 w-24 h-24 text-rose-200/40 pointer-events-none transform rotate-168">
                                    <svg viewBox="0 0 100 100" fill="currentColor">
                                        <path d="M50 0 C60 20 80 30 100 30 C80 30 70 50 70 70 C70 50 50 40 30 40 C50 40 60 20 50 0" />
                                        <circle cx="50" cy="50" r="5" />
                                    </svg>
                                </div>
                            </>
                        )}
                        {content.imageDecoration === 'leaf' && (
                            <>
                                <div className="absolute -top-8 -left-8 w-20 h-20 text-emerald-200/30 pointer-events-none">
                                    <svg viewBox="0 0 100 100" fill="currentColor">
                                        <path d="M50 100 C50 100 90 60 90 30 C90 10 70 0 50 30 C30 0 10 10 10 30 C10 60 50 100 50 100" />
                                    </svg>
                                </div>
                                <div className="absolute -bottom-8 -right-8 w-20 h-20 text-emerald-200/30 pointer-events-none rotate-180">
                                    <svg viewBox="0 0 100 100" fill="currentColor">
                                        <path d="M50 100 C50 100 90 60 90 30 C90 10 70 0 50 30 C30 0 10 10 10 30 C10 60 50 100 50 100" />
                                    </svg>
                                </div>
                            </>
                        )}

                        {/* Path-following Decorations */}
                        {['outline', 'glow', 'dots', 'gold'].includes(content.imageDecoration) && activeMaskPath && (
                            <div className="absolute inset-0 pointer-events-none z-10 scale-[1.02]">
                                <svg viewBox="0 0 1 1" className="w-full h-full">
                                    <defs>
                                        <filter id="glow-filter">
                                            <feGaussianBlur stdDeviation="0.02" result="blur" />
                                            <feComposite in="glow" in2="blur" operator="over" />
                                        </filter>
                                    </defs>
                                    <path
                                        d={activeMaskPath.d}
                                        transform={activeMaskPath.transform}
                                        fill="none"
                                        stroke={content.imageDecoration === 'glow' ? '#60A5FA' : '#D4AF37'}
                                        strokeWidth={content.imageDecoration === 'gold' ? '0.02' : content.imageDecoration === 'glow' ? '0.015' : '0.01'}
                                        strokeDasharray={content.imageDecoration === 'dots' ? '0.01 0.04' : 'none'}
                                        strokeLinecap="round"
                                        filter={content.imageDecoration === 'glow' ? 'url(#glow-filter)' : 'none'}
                                        opacity={content.imageDecoration === 'glow' ? '0.6' : '1'}
                                    />
                                    {content.imageDecoration === 'gold' && (
                                        <path
                                            d={activeMaskPath.d}
                                            transform={activeMaskPath.transform}
                                            fill="none"
                                            stroke="#D4AF37"
                                            strokeWidth="0.005"
                                            className="scale-[1.06] origin-center opacity-40"
                                        />
                                    )}
                                </svg>
                            </div>
                        )}

                        <div
                            onClick={() => onElementSelect?.('imageUrl')}
                            className={cn(
                                "relative overflow-hidden group transition-all duration-300 cursor-pointer",
                                content.imageDecoration === 'gold' && content.imageMask === 'none'
                                    ? 'border-[3px] outline outline-1 outline-offset-4 outline-[#D4AF37] shadow-xl'
                                    : content.imageMask === 'none'
                                        ? (content.imageDecoration === 'gold' ? 'shadow-lg' : isDark ? 'border-8 border-gray-800 shadow-2xl' : 'border-8 border-white shadow-lg')
                                        : ''
                            )}
                            style={{
                                width: `${(content.imageScale || 1) * 20}rem`,
                                height: `${(content.imageScale || 1) * 20}rem`,
                                maxWidth: '90vw',
                                maxHeight: '90vw',
                                borderColor: content.imageDecoration === 'gold' ? '#D4AF37' : isDark ? '#1E1E1E' : '#FFFFFF',
                                clipPath: content.imageMask && content.imageMask !== 'none' && content.imageMask !== 'circle'
                                    ? `url(#mask-${content.imageMask})`
                                    : 'none',
                                borderRadius: content.imageMask === 'circle' ? '50%' : '0',
                                filter: content.imageFeather ? `blur(${content.imageFeather}px)` : 'none'
                            }}
                        >
                            <svg width="0" height="0" className="absolute">
                                <defs>
                                    {Object.entries(MASK_PATHS).map(([id, path]) => (
                                        <clipPath id={`mask-${id}`} key={id} clipPathUnits="objectBoundingBox">
                                            <path d={path.d} transform={path.transform} />
                                        </clipPath>
                                    ))}
                                </defs>
                            </svg>
                            <img
                                src={content.imageUrl}
                                alt="Hero"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    </div>
                )}

                {content.showRecipient && (
                    <div
                        className={cn(
                            "flex gap-2 items-baseline opacity-60 mb-2",
                            content.recipientSize && content.recipientSize !== 'inherit' ? content.recipientSize : ""
                        )}
                        style={{
                            fontFamily: content.recipientFont && content.recipientFont !== 'inherit' ? content.recipientFont : 'inherit',
                            color: content.recipientColor || 'inherit'
                        }}
                    >
                        <InlineText
                            tagName="span"
                            value={content.recipientPrefix || 'Convidado:'}
                            onChange={(val) => onUpdate({ recipientPrefix: val })}
                            className="text-xs uppercase tracking-tighter font-bold"
                            readOnly={readOnly}
                        />
                        <InlineText
                            tagName="span"
                            value={recipientName}
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
                    onSelectElement={() => onElementSelect?.('subtitle')}
                    className={cn(
                        "leading-relaxed opacity-80",
                        content.subtitleSize && content.subtitleSize !== 'inherit' ? content.subtitleSize : "text-lg"
                    )}
                    readOnly={readOnly}
                    style={{
                        fontFamily: content.subtitleFont && content.subtitleFont !== 'inherit' ? content.subtitleFont : globalStyles.fontFamilyBody,
                        color: content.subtitleColor || section.styles?.color || 'inherit'
                    }}
                />

                {content.buttonLabel && (
                    <div
                        className={cn(
                            "flex mt-4",
                            content.buttonAlignment === 'left' ? "justify-start" :
                                content.buttonAlignment === 'right' ? "justify-end" :
                                    content.buttonAlignment === 'full' ? "justify-center" : "justify-center"
                        )}
                    >
                        <button
                            onMouseDown={(e) => {
                                if (!readOnly) {
                                    e.stopPropagation();
                                    onElementSelect?.('buttonLabel');
                                }
                            }}
                            className={cn(
                                "py-4 font-bold uppercase tracking-widest transition-all shadow-lg active:translate-y-0",
                                content.buttonSize && content.buttonSize !== 'inherit' ? content.buttonSize : "text-xs",
                                content.buttonShape || "rounded-full",
                                content.buttonAlignment === 'full' ? "w-full" : "px-10",
                                !content.buttonColor && "bg-blue-500 text-white hover:shadow-xl hover:-translate-y-0.5"
                            )}
                            style={{
                                backgroundColor: content.buttonColor ? `${content.buttonColor}11` : globalStyles.primaryColor,
                                fontFamily: content.buttonFont && content.buttonFont !== 'inherit' ? content.buttonFont : 'inherit',
                                color: content.buttonColor || 'white',
                                border: content.buttonColor ? `1px solid ${content.buttonColor}` : undefined
                            }}
                        >
                            <InlineText
                                tagName="span"
                                value={content.buttonLabel}
                                onChange={(val) => onUpdate({ buttonLabel: val })}
                                onSelectElement={() => onElementSelect?.('buttonLabel')}
                                readOnly={readOnly}
                            />
                        </button>
                    </div>
                )}
            </div>
        </section >
    );
};
