import React from 'react';
import { cn } from '@/utils/cn';

export type DecorationType = 'none' | 'gold' | 'floral' | 'leaf' | 'outline' | 'glow' | 'dots';

interface SectionDecorationProps {
    type: DecorationType;
    color?: string;
    isDark?: boolean;
}

export const SectionDecoration: React.FC<SectionDecorationProps> = ({ type, color, isDark }) => {
    if (type === 'none') return null;

    const decorationColor = color || (type === 'gold' ? '#D4AF37' : type === 'glow' ? '#60A5FA' : 'inherit');

    return (
        <div className="absolute inset-0 pointer-events-none z-10 select-none overflow-hidden">
            {/* Corner Decorations */}
            {(type === 'floral' || type === 'leaf') && (
                <>
                    <div className={cn(
                        "absolute -top-10 -left-10 w-32 h-32 transform -rotate-12 opacity-40",
                        isDark ? "text-white/20" : "text-black/10"
                    )} style={{ color }}>
                        {type === 'floral' ? (
                            <svg viewBox="0 0 100 100" fill="currentColor">
                                <path d="M50 0 C60 20 80 30 100 30 C80 30 70 50 70 70 C70 50 50 40 30 40 C50 40 60 20 50 0" />
                                <circle cx="50" cy="50" r="5" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 100 100" fill="currentColor">
                                <path d="M50 100 C50 100 90 60 90 30 C90 10 70 0 50 30 C30 0 10 10 10 30 C10 60 50 100 50 100" />
                            </svg>
                        )}
                    </div>
                    <div className={cn(
                        "absolute -bottom-10 -right-10 w-32 h-32 transform rotate-168 opacity-40",
                        isDark ? "text-white/20" : "text-black/10"
                    )} style={{ color }}>
                        {type === 'floral' ? (
                            <svg viewBox="0 0 100 100" fill="currentColor">
                                <path d="M50 0 C60 20 80 30 100 30 C80 30 70 50 70 70 C70 50 50 40 30 40 C50 40 60 20 50 0" />
                                <circle cx="50" cy="50" r="5" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 100 100" fill="currentColor">
                                <path d="M50 100 C50 100 90 60 90 30 C90 10 70 0 50 30 C30 0 10 10 10 30 C10 60 50 100 50 100" />
                            </svg>
                        )}
                    </div>
                </>
            )}

            {/* Path/Border Decorations */}
            {['outline', 'glow', 'dots', 'gold'].includes(type) && (
                <div className="absolute inset-4 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                        <defs>
                            <filter id="glow-filter-section">
                                <feGaussianBlur stdDeviation="1.5" result="blur" />
                                <feComposite in="glow" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        <rect
                            x="0" y="0" width="100" height="100"
                            fill="none"
                            stroke={decorationColor}
                            strokeWidth={type === 'gold' ? '1' : type === 'glow' ? '0.8' : '0.5'}
                            strokeDasharray={type === 'dots' ? '1 3' : 'none'}
                            strokeLinecap="round"
                            filter={type === 'glow' ? 'url(#glow-filter-section)' : 'none'}
                            className={cn(
                                type === 'gold' ? "opacity-100" : type === 'glow' ? "opacity-60" : "opacity-40"
                            )}
                        />
                        {type === 'gold' && (
                            <rect
                                x="-1" y="-1" width="102" height="102"
                                fill="none"
                                stroke="#D4AF37"
                                strokeWidth="0.2"
                                className="opacity-40"
                            />
                        )}
                    </svg>
                </div>
            )}
        </div>
    );
};
