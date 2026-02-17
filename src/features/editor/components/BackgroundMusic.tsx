import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/utils/cn';

interface BackgroundMusicProps {
    url?: string;
    isDark?: boolean;
    className?: string;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ url, isDark, className }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        const handleInteraction = () => {
            setHasInteracted(true);
            window.removeEventListener('click', handleInteraction);
        };
        window.addEventListener('click', handleInteraction);
        return () => window.removeEventListener('click', handleInteraction);
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            if (url) {
                audioRef.current.src = url;
                if (hasInteracted) {
                    audioRef.current.play().catch(err => console.error('Audio play failed:', err));
                    setIsPlaying(true);
                }
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    }, [url, hasInteracted]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(err => console.error('Audio play failed:', err));
            }
            setIsPlaying(!isPlaying);
        }
    };

    if (!url) return null;

    return (
        <>
            <audio ref={audioRef} loop />
            <button
                onClick={togglePlay}
                className={cn(
                    "fixed bottom-24 right-6 w-12 h-12 rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-90 transition-all border backdrop-blur-md",
                    isDark ? "bg-white/10 border-white/20 text-[#FCD34D]" : "bg-white border-gray-100 text-gray-700",
                    className
                )}
                title={isPlaying ? 'Pausar Música' : 'Reproduzir Música'}
            >
                {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
        </>
    );
};

