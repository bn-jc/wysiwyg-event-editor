import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

import type { EventLayout } from '../types';

interface EffectsOverlayProps {
    effects?: EventLayout['effects'];
}

export const EffectsOverlay: React.FC<EffectsOverlayProps> = ({ effects }) => {
    useEffect(() => {
        if (effects === 'confetti') {
            const duration = 15 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                // since particles fall down, start a bit higher than random
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [effects]);

    if (effects === 'none' || !effects) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
            {effects === 'sparkles' && (
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"
                            style={{
                                width: Math.random() * 4 + 2 + 'px',
                                height: Math.random() * 4 + 2 + 'px',
                                left: Math.random() * 100 + '%',
                                top: Math.random() * 100 + '%',
                                animationDelay: Math.random() * 2 + 's',
                                animationDuration: Math.random() * 3 + 2 + 's',
                                opacity: 0.6
                            }}
                        />
                    ))}
                </div>
            )}

            {effects === 'bubbles' && (
                <div className="absolute inset-0">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute border border-white/40 bg-white/10 rounded-full animate-float shadow-inner"
                            style={{
                                width: (Math.random() * 40 + 20) + 'px',
                                height: (Math.random() * 40 + 20) + 'px',
                                left: Math.random() * 100 + '%',
                                bottom: '-50px',
                                animationDelay: (Math.random() * 10) + 's',
                                animationDuration: (Math.random() * 10 + 10) + 's',
                            }}
                        />
                    ))}
                </div>
            )}

            {effects === 'balloons' && (
                <div className="absolute inset-0">
                    {[...Array(8)].map((_, i) => {
                        const colors = ['#f87171', '#60a5fa', '#fbbf24', '#34d399', '#a78bfa'];
                        const color = colors[Math.floor(Math.random() * colors.length)];
                        return (
                            <div
                                key={i}
                                className="absolute animate-float-diagonal"
                                style={{
                                    left: (Math.random() * 100) + '%',
                                    bottom: '-150px',
                                    animationDelay: (Math.random() * 15) + 's',
                                    animationDuration: (Math.random() * 10 + 15) + 's',
                                }}
                            >
                                <div
                                    className="w-16 h-20 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] relative shadow-lg"
                                    style={{ backgroundColor: color }}
                                >
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px]" style={{ borderBottomColor: color }} />
                                    <div className="absolute -bottom-12 left-1/2 w-[1px] h-12 bg-gray-300 transform -translate-x-1/2" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {effects === 'hearts' && (
                <div className="absolute inset-0">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute text-red-400/30 animate-float"
                            style={{
                                left: Math.random() * 100 + '%',
                                bottom: '-50px',
                                animationDelay: (Math.random() * 12) + 's',
                                animationDuration: (Math.random() * 10 + 12) + 's',
                                fontSize: (Math.random() * 20 + 10) + 'px'
                            }}
                        >
                            ❤️
                        </div>
                    ))}
                </div>
            )}

            {effects === 'birds' && (
                <div className="absolute inset-0">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute text-blue-400/40 animate-float-diagonal"
                            style={{
                                left: '-50px',
                                top: (Math.random() * 80) + '%',
                                animationDelay: (Math.random() * 15) + 's',
                                animationDuration: (Math.random() * 8 + 8) + 's',
                                fontSize: (Math.random() * 24 + 16) + 'px'
                            }}
                        >
                            🕊️
                        </div>
                    ))}
                </div>
            )}

            {effects === 'hats' && (
                <div className="absolute inset-0">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-float-down"
                            style={{
                                left: (Math.random() * 100) + '%',
                                top: '-50px',
                                animationDelay: (Math.random() * 12) + 's',
                                animationDuration: (Math.random() * 8 + 10) + 's',
                                fontSize: (Math.random() * 30 + 20) + 'px'
                            }}
                        >
                            🎓
                        </div>
                    ))}
                </div>
            )}

            {effects === 'roses' && (
                <div className="absolute inset-0">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-float-down-sway"
                            style={{
                                left: (Math.random() * 100) + '%',
                                top: '-50px',
                                animationDelay: (Math.random() * 10) + 's',
                                animationDuration: (Math.random() * 12 + 10) + 's',
                                fontSize: (Math.random() * 24 + 16) + 'px'
                            }}
                        >
                            🌹
                        </div>
                    ))}
                </div>
            )}

            {effects === 'rings' && (
                <div className="absolute inset-0">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-float"
                            style={{
                                left: (Math.random() * 100) + '%',
                                bottom: '-50px',
                                animationDelay: (Math.random() * 15) + 's',
                                animationDuration: (Math.random() * 10 + 15) + 's',
                                fontSize: (Math.random() * 32 + 16) + 'px'
                            }}
                        >
                            💍
                        </div>
                    ))}
                </div>
            )}

            {effects === 'cakes' && (
                <div className="absolute inset-0">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-float-up-slow"
                            style={{
                                left: (Math.random() * 100) + '%',
                                bottom: '-80px',
                                animationDelay: (Math.random() * 20) + 's',
                                animationDuration: (Math.random() * 15 + 20) + 's',
                                fontSize: (Math.random() * 40 + 20) + 'px'
                            }}
                        >
                            🎂
                        </div>
                    ))}
                </div>
            )}

            <style>{`
                @keyframes float {
                    0% { transform: translateY(0) translateX(0); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-110vh) translateX(20px); opacity: 0; }
                }
                @keyframes float-up-slow {
                    0% { transform: translateY(0) translateX(0) scale(0.8); opacity: 0; }
                    10% { opacity: 0.8; }
                    90% { opacity: 0.8; }
                    100% { transform: translateY(-110vh) translateX(-20px) scale(1.1); opacity: 0; }
                }
                @keyframes float-diagonal {
                    0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-50vh) translateX(110vw) rotate(10deg); opacity: 0; }
                }
                @keyframes float-down {
                    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
                }
                @keyframes float-down-sway {
                    0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
                    25% { transform: translateY(25vh) translateX(30px) rotate(45deg); }
                    50% { transform: translateY(50vh) translateX(-30px) rotate(-45deg); }
                    75% { transform: translateY(75vh) translateX(30px) rotate(45deg); }
                    100% { transform: translateY(110vh) translateX(0) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                }
                .animate-float {
                    animation: float linear infinite;
                }
                .animate-float-diagonal {
                    animation: float-diagonal linear infinite;
                }
                .animate-float-down {
                    animation: float-down linear infinite;
                }
                .animate-float-down-sway {
                    animation: float-down-sway linear infinite;
                }
                .animate-float-up-slow {
                    animation: float-up-slow linear infinite;
                }
            `}</style>
        </div>
    );
};
