import React from 'react';
import type { SectionDefinition } from '../../types';

interface NavSectionProps {
    section: SectionDefinition;
    readOnly?: boolean;
    activeScrollSectionId?: string | null;
    onNavigate?: (targetId: string) => void;
}

export const NavSection: React.FC<NavSectionProps> = ({ section, activeScrollSectionId, onNavigate }) => {
    const { links = [], style = 'floating', alignment = 'center', backgroundColor, textColor } = section.content;

    const handleScroll = (targetId: string) => {
        if (onNavigate) {
            onNavigate(targetId);
            return;
        }

        if (targetId === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const getPositionClasses = () => {
        switch (style) {
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
            className={`p-4 transition-all duration-300 ${getPositionClasses()} ${alignment === 'center' ? 'justify-center' : alignment === 'left' ? 'justify-start' : 'justify-end'} flex`}
            style={{
                backgroundColor: backgroundColor || 'rgba(255,255,255,0.9)',
                color: textColor || '#333',
                backdropFilter: 'blur(8px)'
            }}
        >
            <nav className="flex items-center gap-6 overflow-x-auto no-scrollbar px-2">
                {links.map((link: any, index: number) => {
                    const isActive = activeScrollSectionId === link.targetId || (link.targetId === 'top' && (!activeScrollSectionId || activeScrollSectionId === section.id));

                    return (
                        <button
                            key={index}
                            onClick={() => handleScroll(link.targetId)}
                            className={`text-sm font-medium transition-all whitespace-nowrap relative py-1 ${isActive ? 'opacity-100 font-bold' : 'opacity-60 hover:opacity-100'
                                }`}
                            style={{ color: textColor }}
                        >
                            {link.label}
                            {isActive && (
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                                    style={{ backgroundColor: textColor }}
                                />
                            )}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};
