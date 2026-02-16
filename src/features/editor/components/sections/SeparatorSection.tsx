import React from 'react';
import type { SectionRendererProps } from '../../types';

export const SeparatorSection: React.FC<SectionRendererProps> = ({
    section,
    globalStyles
}) => {
    const {
        variant = 'line',
        padding = 'medium',
        color = '',
        gradient = 'none'
    } = section.content;

    const baseColor = color || globalStyles.primaryColor;

    const GradientPresets: Record<string, string[]> = {
        sunset: ['#f87171', '#fb923c', '#fbbf24'],
        ocean: ['#38bdf8', '#818cf8', '#c084fc'],
        gold: ['#d97706', '#fbbf24', '#fef3c7'],
        silver: ['#4b5563', '#9ca3af', '#f3f4f6'],
        lavender: ['#a855f7', '#ec4899', '#f43f5e']
    };

    const isGradient = gradient !== 'none';
    const gradientColors = GradientPresets[gradient] || [];
    const gradientId = `grad-${section.id}`;

    const lineStyles = isGradient
        ? { background: `linear-gradient(to right, ${gradientColors.join(', ')})` }
        : { backgroundColor: baseColor };


    const paddingClasses = {
        small: 'py-8',
        medium: 'py-16',
        large: 'py-24'
    };

    const renderGradientDef = () => {
        if (!isGradient) return null;
        return (
            <svg width="0" height="0" className="absolute">
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        {gradientColors.map((c, i) => (
                            <stop key={i} offset={`${(i / (gradientColors.length - 1)) * 100}%`} stopColor={c} />
                        ))}
                    </linearGradient>
                </defs>
            </svg>
        );
    };

    const renderSeparator = () => {
        switch (variant) {
            case 'flourish':
                return (
                    <div className="flex items-center justify-center w-full max-w-md gap-4">
                        <div className="h-[1px] flex-1 opacity-20" style={lineStyles} />
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={isGradient ? `url(#${gradientId})` : baseColor}
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-60"
                        >
                            <path d="M12 2v20M2 12h20" />
                            <path d="M6.5 6.5l11 11M6.5 17.5l11-11" />
                        </svg>
                        <div className="h-[1px] flex-1 opacity-20" style={lineStyles} />
                    </div>
                );
            case 'dots':
                return (
                    <div className="flex gap-4">
                        {[1, 2, 3].map(i => (
                            <div
                                key={i}
                                className="w-2 h-2 rounded-full opacity-40 shadow-sm"
                                style={lineStyles}
                            />
                        ))}
                    </div>
                );
            case 'wave':
                return (
                    <svg width="100" height="20" viewBox="0 0 100 20" fill="none" className="opacity-40">
                        <path
                            d="M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10"
                            stroke={isGradient ? `url(#${gradientId})` : baseColor}
                            strokeWidth="2"
                            fill="none"
                        />
                    </svg>
                );
            case 'diamond':
                return (
                    <div className="flex items-center gap-4 w-full max-w-xs">
                        <div className="h-[1px] flex-1 opacity-20" style={lineStyles} />
                        <div
                            className="w-3 h-3 rotate-45 opacity-60 shadow-sm"
                            style={lineStyles}
                        />
                        <div className="h-[1px] flex-1 opacity-20" style={lineStyles} />
                    </div>
                );
            case 'heart':
                return (
                    <div className="flex items-center gap-4 w-full max-w-xs">
                        <div className="h-[1px] flex-1 opacity-20" style={lineStyles} />
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill={isGradient ? `url(#${gradientId})` : baseColor}
                            className="opacity-60"
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <div className="h-[1px] flex-1 opacity-20" style={lineStyles} />
                    </div>
                );
            case 'stars':
                return (
                    <div className="flex gap-6 opacity-50">
                        {[1, 2, 3].map(i => (
                            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={isGradient ? `url(#${gradientId})` : baseColor}>
                                <path d="M12 1L14.39 8.26L22 9.27L16.5 14.14L18.18 21.02L12 17.27L5.82 21.02L7.5 14.14L2 9.27L9.61 8.26L12 1Z" />
                            </svg>
                        ))}
                    </div>
                );
            case 'line':
            default:
                return (
                    <div
                        className="w-24 h-[1px] opacity-30 shadow-sm"
                        style={lineStyles}
                    />
                );
        }
    };

    return (
        <section className={`bg-transparent flex justify-center items-center ${paddingClasses[padding as keyof typeof paddingClasses] || paddingClasses.medium}`}>
            {renderGradientDef()}
            {renderSeparator()}
        </section>
    );
};
