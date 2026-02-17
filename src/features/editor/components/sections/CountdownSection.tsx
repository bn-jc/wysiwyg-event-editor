import React, { useState, useEffect } from 'react';
import type { SectionRendererProps } from '../../types';
import { InlineText } from '../common/InlineText';

export const CountdownSection: React.FC<SectionRendererProps> = ({
    section,
    globalStyles,
    onUpdate,
    readOnly,
    isDark
}) => {
    const { content } = section;
    const targetDate = content.targetDate || '2026-12-12T10:00:00';

    const calculateTimeLeft = React.useCallback(() => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft: { [key: string]: number } = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    }, [targetDate]);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        // Update immediately on mount/change
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [calculateTimeLeft]);

    const isFinished = Object.keys(timeLeft).length === 0;

    const timerItems = [
        { label: 'Dias', value: timeLeft.days || 0 },
        { label: 'Horas', value: timeLeft.hours || 0 },
        { label: 'Minutos', value: timeLeft.minutes || 0 },
        { label: 'Segundos', value: timeLeft.seconds || 0 },
    ];

    return (
        <section
            className="px-6 bg-transparent overflow-hidden"
            style={{
                paddingTop: section.styles?.paddingTop || '80px',
                paddingBottom: section.styles?.paddingBottom || '80px',
                backgroundColor: section.styles?.backgroundColor
            }}
        >
            <div
                className="max-w-4xl mx-auto flex flex-col items-center text-center"
                style={{ gap: section.styles?.gap || '48px' }}
            >
                <InlineText
                    tagName="h2"
                    value={content.title || 'Contagem Decrescente'}
                    onChange={(val) => onUpdate({ title: val })}
                    className="text-4xl md:text-5xl"
                    style={{
                        fontFamily: globalStyles.fontFamilyTitle,
                        color: section.styles?.color || (isDark ? '#FFFFFF' : globalStyles.primaryColor)
                    }}
                    readOnly={readOnly}
                />

                {!isFinished ? (
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {timerItems.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center min-w-[80px] md:min-w-[120px]">
                                <div
                                    className="text-4xl md:text-6xl font-bold mb-2 tabular-nums transition-all duration-300"
                                    style={{ color: section.styles?.color || (isDark ? '#FFFFFF' : globalStyles.primaryColor) }}
                                >
                                    {String(item.value).padStart(2, '0')}
                                </div>
                                <div
                                    className="text-xs md:text-sm uppercase tracking-widest font-medium opacity-60"
                                    style={{ color: section.styles?.color || globalStyles.secondaryColor }}
                                >
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div
                        className="text-3xl md:text-4xl font-light italic opacity-80"
                        style={{ color: isDark ? '#FFFFFF' : globalStyles.primaryColor }}
                    >
                        {content.finishMessage || 'O Grande Dia Chegou!'}
                    </div>
                )}

                {/* Hidden/Helper for editing target date - Simplified for now */}
                {!readOnly && (
                    <div className="pt-4 text-[10px] text-gray-400 opacity-0 hover:opacity-100 transition-opacity">
                        Data Alvo (ISO):
                        <InlineText
                            tagName="span"
                            value={targetDate}
                            onChange={(val) => onUpdate({ targetDate: val })}
                            className="ml-2 font-mono"
                        />
                    </div>
                )}
            </div>
        </section>
    );
};
