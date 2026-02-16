import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface BackgroundMusicProps {
    url?: string;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ url }) => {
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
                className="fixed bottom-6 right-6 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-gray-700 z-50 hover:scale-110 transition-all border border-gray-100"
                title={isPlaying ? 'Pausar Música' : 'Reproduzir Música'}
            >
                {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
        </>
    );
};
