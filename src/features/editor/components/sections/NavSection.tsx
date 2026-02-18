import React from 'react';
import type { SectionDefinition } from '../../types';
import { InlineText } from '../common/InlineText';
import { cn } from '@/utils/cn';

interface NavSectionProps {
    section: SectionDefinition;
    onUpdate: (newContent: Partial<SectionDefinition['content']>) => void;
    readOnly?: boolean;
    activeScrollSectionId?: string | null;
    onNavigate?: (targetId: string) => void;
    isDark?: boolean;
}

export const NavSection: React.FC<NavSectionProps> = ({ section, onUpdate, isDark, readOnly }) => {
    const { links = [], navStyle = 'floating', alignment = 'center', backgroundColor, textColor } = section.content;

    const handleScroll = (targetId: string) => {
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const getPositionClasses = () => {
        switch (navStyle) {
            case 'sticky':
                return 'sticky top-0 z-50 shadow-sm';
            case 'fixed':
                return 'fixed top-0 left-0 right-0 z-50 shadow-sm';
            case 'floating':
                return 'fixed bottom-8 left-1/2 -translate-x-1/2 z-50 rounded-full shadow-lg w-auto max-w-[90vw]';
            default:
                return '';
        }
    };

    return (
        <div
            className={cn(
                "p-4 transition-all duration-300 flex",
                getPositionClasses(),
                alignment === 'center' ? 'justify-center' : alignment === 'left' ? 'justify-start' : 'justify-end'
            )}
            style={{
                backgroundColor: isDark ? 'rgba(30,30,30,0.8)' : (backgroundColor || 'rgba(255,255,255,0.9)'),
                color: isDark ? '#E0E0E0' : (textColor || '#333'),
                backdropFilter: 'blur(12px)',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : 'none'
            }}
        >
            <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 no-scrollbar px-2">
                {links.map((link: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                        {readOnly ? (
                            <button
                                onClick={() => handleScroll(link.targetId)}
                                className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap"
                                style={{ color: textColor }}
                            >
                                {link.label}
                            </button>
                        ) : (
                            <div className="flex items-center gap-1 group">
                                <InlineText
                                    value={link.label}
                                    onChange={(newVal) => {
                                        const newLinks = [...links];
                                        newLinks[index] = { ...link, label: newVal };
                                        onUpdate({ links: newLinks });
                                    }}
                                    className="text-sm font-medium min-w-[20px]"
                                    style={{ color: textColor }}
                                />
                                <button
                                    onClick={() => {
                                        const newLinks = links.filter((_: any, i: number) => i !== index);
                                        onUpdate({ links: newLinks });
                                    }}
                                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-all"
                                    title="Remover link"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>
                        )}
                        {index < links.length - 1 && (
                            <span className="opacity-20 select-none">•</span>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
};
