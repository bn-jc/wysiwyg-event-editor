import React, { useMemo, useState, useEffect } from 'react';

export type ParticleType = 'none' | 'hearts' | 'wine' | 'birds' | 'flowers' | 'bubbles' | 'confetti' | 'stars' | 'leaves' | 'balloons' | 'hats' | 'roses' | 'rings' | 'cakes' | 'sparkles' | 'fireworks';

interface ParticlesBackgroundProps {
    type: ParticleType;
    count?: number;
    animated?: boolean;
    color?: string;
    direction?: 'up' | 'down' | 'left' | 'right' | 'random';
    startTime?: number;
    endTime?: number;
}

const PARTICLE_SVGS: Record<Exclude<ParticleType, 'none'>, JSX.Element> = {
    hearts: (
        <path d="M50 88.9L42.7 82.2C16.8 58.7 0 43.5 0 24.8C0 9.6 12 0 25 0C32.3 0 39.3 3.4 43.8 8.8L50 16.1L56.2 8.8C60.7 3.4 67.7 0 75 0C88 0 100 9.6 100 24.8C100 43.5 83.2 58.7 57.3 82.3L50 88.9Z" fill="currentColor" />
    ),
    wine: (
        <path d="M70 10H30V35C30 57 50 75 50 75C50 75 70 57 70 35V10ZM50 75V90H35V95H65V90H50V75Z" fill="currentColor" />
    ),
    birds: (
        <path d="M10,50 Q30,20 50,45 Q70,20 90,50 Q70,40 50,55 Q30,40 10,50 Z" fill="currentColor" />
    ),
    flowers: (
        <path d="M50 0C55 20 75 20 80 40C85 60 65 65 50 80C35 65 15 60 20 40C25 20 45 20 50 0Z" fill="currentColor" />
    ),
    bubbles: (
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" />
    ),
    confetti: (
        <rect x="25" y="25" width="50" height="50" fill="currentColor" rx="4" transform="rotate(25 50 50)" />
    ),
    stars: (
        <path d="M50 0L61.8 35.4H100L69.1 57.7L80.9 93.1L50 70.9L19.1 93.1L30.9 57.7L0 35.4H38.2L50 0Z" fill="currentColor" />
    ),
    leaves: (
        <path d="M50 100C30 80 20 60 20 40C20 20 50 0 50 0C50 0 80 20 80 40C80 60 70 80 50 100Z" fill="currentColor" />
    ),
    balloons: (
        <g fill="currentColor">
            <path d="M50 10 C30 10 15 25 15 45 C15 65 35 85 50 85 C65 85 85 65 85 45 C85 25 70 10 50 10" />
            <path d="M45 85 L55 85 L50 92 Z" />
            <path d="M50 92 L50 100" fill="none" stroke="currentColor" strokeWidth="2" />
        </g>
    ),
    hats: (
        <path d="M50 20 L95 40 L50 60 L5 40 Z M20 47 V70 C20 70 35 80 50 80 C65 80 80 70 80 70 V47 M90 40 V80" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    ),
    roses: (
        <path d="M50 10 C30 10 20 20 20 35 C20 55 50 80 50 80 C50 80 80 55 80 35 C80 20 70 10 50 10 M50 25 C50 25 40 30 40 40 M50 30 C50 30 60 35 60 45" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    ),
    rings: (
        <g fill="none" stroke="currentColor" strokeWidth="8">
            <circle cx="35" cy="50" r="25" />
            <circle cx="65" cy="50" r="25" />
        </g>
    ),
    cakes: (
        <g fill="currentColor">
            <rect x="20" y="65" width="60" height="25" rx="2" />
            <rect x="30" y="45" width="40" height="20" rx="2" />
            <rect x="42" y="30" width="16" height="15" rx="1" />
            <rect x="48" y="15" width="4" height="10" />
        </g>
    ),
    sparkles: (
        <path d="M50 0 L58 42 L100 50 L58 58 L50 100 L42 58 L0 50 L42 42 Z" fill="currentColor" />
    ),
    fireworks: (
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
            <line x1="50" y1="50" x2="50" y2="20" />
            <line x1="50" y1="50" x2="71" y2="29" />
            <line x1="50" y1="50" x2="80" y2="50" />
            <line x1="50" y1="50" x2="71" y2="71" />
            <line x1="50" y1="50" x2="50" y2="80" />
            <line x1="50" y1="50" x2="29" y2="71" />
            <line x1="50" y1="50" x2="20" y2="50" />
            <line x1="50" y1="50" x2="29" y2="29" />
        </g>
    )
};

export const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
    type,
    count = 20,
    animated = false,
    color,
    direction = 'up',
    startTime = 0,
    endTime = 0
}) => {
    const [isVisible, setIsVisible] = useState(startTime === 0);

    useEffect(() => {
        if (!animated) {
            setIsVisible(true);
            return;
        }

        // Reset visibility when props change
        setIsVisible(startTime === 0);

        const startTimer = setTimeout(() => {
            setIsVisible(true);
        }, startTime * 1000);

        let endTimer: any;
        if (endTime && endTime > 0) {
            endTimer = setTimeout(() => {
                setIsVisible(false);
            }, endTime * 1000);
        }

        return () => {
            clearTimeout(startTimer);
            if (endTimer) clearTimeout(endTimer);
        };
    }, [animated, startTime, endTime]);

    const particles = useMemo(() => {
        if (type === 'none' || !isVisible) return [];
        const directions: ('up' | 'down' | 'left' | 'right')[] = ['up', 'down', 'left', 'right'];
        const isExplosion = type === 'confetti' || type === 'fireworks';
        const finalCount = animated ? (isExplosion ? count * 4 : count * 2) : count;

        return Array.from({ length: finalCount }).map((_, i) => {
            const particleDir = direction === 'random'
                ? directions[Math.floor(Math.random() * directions.length)]
                : direction;

            // Explosion logic
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 200;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            const burstGroupIndex = Math.floor(i / 10);
            const numGroups = Math.ceil(finalCount / 10);

            // deterministic spread for centers to avoid bias
            const centerX = isExplosion ? ((burstGroupIndex / numGroups) * 100 + (Math.random() * 10 - 5)) : (Math.random() * 100);
            const centerY = isExplosion ? (Math.random() * 60 + 20) : (Math.random() * 100);

            // Ensure even horizontal spread for non-explosions too
            const spreadLeft = (i / finalCount) * 100 + (Math.random() * 5 - 2.5);

            return {
                id: i,
                left: isExplosion ? `${centerX}%` : `${spreadLeft}%`,
                top: isExplosion ? `${centerY}%` : `${Math.random() * 100}%`,
                tx: `${tx}px`,
                ty: `${ty}px`,
                size: animated ? (isExplosion ? 8 + Math.random() * 12 : 12 + Math.random() * 20) : 20 + Math.random() * 40,
                duration: isExplosion ? 1.5 + Math.random() * 1.5 : 10 + Math.random() * 15,
                delay: isExplosion ? (Math.floor(i / 10) * -1.2) : Math.random() * -20,
                opacity: animated ? 0.4 + Math.random() * 0.4 : 0.05 + Math.random() * 0.1,
                rotate: Math.random() * 360,
                direction: particleDir as 'up' | 'down' | 'left' | 'right',
                isExplosion
            };
        });
    }, [type, count, animated, direction, isVisible]);

    if (type === 'none' || !isVisible) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
            {animated && (
                <style>
                    {`
                        @keyframes moveUp {
                            0% { transform: translateY(110vh) rotate(0deg); opacity: 0; }
                            15% { opacity: 1; }
                            85% { opacity: 1; }
                            100% { transform: translateY(-20vh) rotate(360deg); opacity: 0; }
                        }
                        @keyframes moveDown {
                            0% { transform: translateY(-20vh) rotate(0deg); opacity: 0; }
                            15% { opacity: 1; }
                            85% { opacity: 1; }
                            100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
                        }
                        @keyframes moveLeft {
                            0% { transform: translateX(110vw) rotate(0deg); opacity: 0; }
                            15% { opacity: 1; }
                            85% { opacity: 1; }
                            100% { transform: translateX(-20vw) rotate(360deg); opacity: 0; }
                        }
                        @keyframes moveRight {
                            0% { transform: translateX(-20vw) rotate(0deg); opacity: 0; }
                            15% { opacity: 1; }
                            85% { opacity: 1; }
                            100% { transform: translateX(110vw) rotate(360deg); opacity: 0; }
                        }
                        @keyframes moveExplode {
                            0% { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
                            15% { opacity: 1; transform: translate(0, 0) scale(1.2) rotate(45deg); }
                            100% { transform: translate(var(--tx), var(--ty)) scale(0.3) rotate(360deg); opacity: 0; }
                        }
                    `}
                </style>
            )}
            {particles.map((p) => {
                const isHorizontal = p.direction === 'left' || p.direction === 'right';
                const animationName = p.isExplosion ? 'moveExplode' :
                    (p.direction === 'up' ? 'moveUp' :
                        p.direction === 'down' ? 'moveDown' :
                            p.direction === 'left' ? 'moveLeft' : 'moveRight');

                return (
                    <div
                        key={p.id}
                        className="absolute"
                        style={{
                            left: (animated && !p.isExplosion && isHorizontal) ? '0' : p.left,
                            top: (animated && !p.isExplosion && !isHorizontal) ? '0' : p.top,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            color: color || 'currentColor',
                            opacity: p.opacity,
                            animation: animated ? `${animationName} ${p.duration}s linear infinite` : 'none',
                            animationDelay: animated ? `${p.delay}s` : '0s',
                            transform: (animated && p.isExplosion) ? 'none' : (animated ? 'none' : `rotate(${p.rotate}deg)`),
                            // @ts-ignore
                            '--tx': p.tx,
                            '--ty': p.ty
                        } as any}
                    >
                        <svg
                            viewBox="0 0 100 100"
                            className="w-full h-full"
                        >
                            {PARTICLE_SVGS[type as Exclude<ParticleType, 'none'>]}
                        </svg>
                    </div>
                );
            })}
        </div>
    );
};
