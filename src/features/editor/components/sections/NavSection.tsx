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
    globalStyles?: any;
    sections?: SectionDefinition[];
}

export const NavSection: React.FC<NavSectionProps> = ({
    section,
    onUpdate,
    isDark,
    readOnly,
    activeScrollSectionId,
    globalStyles,
    onNavigate,
    sections
}) => {
    const {
        links = [],
        navPosition = 'top',
        navVariant = 'classic',
        isSticky = true,
        isTransparent = false,
        opacity = 95,
        blurAmount = 8,
        activeHighlight = 'underline',
        activeColor,
        isScrollable = true,
        backgroundColor,
        textColor
    } = section.content;

    const handleScroll = (targetId: string) => {
        if (onNavigate) {
            onNavigate(targetId);
        } else {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const isVertical = navPosition === 'left' || navPosition === 'right';
    const effectiveActiveColor = activeColor || globalStyles?.primaryColor || '#3B82F6';

    const getLayoutClasses = () => {
        let classes = "z-50 transition-all duration-500 flex ";

        // Position
        if (navPosition === 'fixed-top' || (isSticky && navPosition === 'top')) {
            classes += "sticky top-0 left-0 right-0 ";
        } else if (isSticky && navPosition === 'bottom') {
            classes += "sticky bottom-0 left-0 right-0 ";
        } else if (navPosition === 'left') {
            classes += "fixed left-0 top-0 h-full w-auto ";
        } else if (navPosition === 'right') {
            classes += "fixed right-0 top-0 h-full w-auto ";
        } else if (navPosition === 'top') {
            classes += "relative py-0.5 "; // Minimal vertical padding
        } else if (navPosition === 'bottom') {
            classes += "relative py-0.5 "; // Minimal vertical padding
        }

        // Variant specific layout
        if (navVariant === 'material') {
            classes += "shadow-lg ";
        } else if (navVariant === 'liquid-glass') {
            classes += "border-b border-white/10 ";
        }

        return classes;
    };

    const getVariantStyles = (): React.CSSProperties => {
        const styles: React.CSSProperties = {
            backgroundColor: isTransparent ? 'transparent' : (isDark
                ? (globalStyles?.themeShades?.dark.background || `rgba(15,15,15,${opacity / 100})`)
                : (backgroundColor || globalStyles?.themeShades?.light.background || `rgba(255,255,255,${opacity / 100})`)),
            color: isDark
                ? (globalStyles?.themeShades?.dark.text || '#FFFFFF')
                : (textColor || globalStyles?.themeShades?.light.text || '#333'),
            backdropFilter: `blur(${blurAmount}px)`,
            WebkitBackdropFilter: `blur(${blurAmount}px)`,
        };

        if (navVariant === 'liquid-glass') {
            styles.borderBottom = isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)';
            if (isVertical) {
                styles.borderBottom = 'none';
                styles.borderRight = navPosition === 'left' ? (isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)') : 'none';
                styles.borderLeft = navPosition === 'right' ? (isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)') : 'none';
            }
        }

        return styles;
    };

    return (
        <div
            className={cn(getLayoutClasses(), section.content.navShape || 'rounded-2xl')}
            style={getVariantStyles()}
        >
            <nav className={cn(
                "flex items-center gap-x-6 gap-y-2 no-scrollbar p-2", // Reduced p-4 to p-2 and gap-y
                isVertical ? "flex-col justify-center h-full min-w-[200px]" : "flex-row justify-center",
                isScrollable && !isVertical ? "overflow-x-auto" : ""
            )}>
                {links.map((link: any, index: number) => {
                    const activeSection = sections?.find(s => s.id === activeScrollSectionId);
                    const isActive = activeScrollSectionId === link.targetId ||
                        (activeSection && link.targetId.toLowerCase() !== 'top' && activeSection.type.toLowerCase().includes(link.targetId.toLowerCase())) ||
                        (activeScrollSectionId && link.targetId === 'top' && index === 0);

                    return (
                        <div key={index} className="flex items-center gap-2 relative group">
                            <div
                                className={cn(
                                    "flex items-center gap-1 transition-all duration-300",
                                    isActive && activeHighlight === 'pill' ? "px-4 py-2 rounded-full" : ""
                                )}
                                style={{
                                    backgroundColor: isActive && activeHighlight === 'pill' ? `${effectiveActiveColor}15` : 'transparent'
                                }}
                            >
                                <InlineText
                                    value={link.label}
                                    readOnly={readOnly}
                                    onChange={(newVal) => {
                                        const newLinks = [...links];
                                        newLinks[index] = { ...link, label: newVal };
                                        onUpdate({ links: newLinks });
                                    }}
                                    className={cn(
                                        "font-bold transition-colors duration-300 cursor-pointer", // Changed font-medium to font-bold
                                        section.content.linkSize && section.content.linkSize !== 'inherit' ? section.content.linkSize : "text-sm",
                                        isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                                    )}
                                    style={{
                                        fontFamily: section.content.linkFont && section.content.linkFont !== 'inherit' ? section.content.linkFont : 'inherit',
                                        color: isActive && activeHighlight === 'color' ? effectiveActiveColor : (section.content.linkColor || 'inherit')
                                    }}
                                    onClick={() => handleScroll(link.targetId)}
                                />

                                {/* Highlight: Underline */}
                                {isActive && activeHighlight === 'underline' && (
                                    <div
                                        className={cn(
                                            "absolute bottom-[-14px] left-0 h-[2px] rounded-full transition-all duration-500 animate-in fade-in slide-in-from-bottom-1",
                                            isVertical ? "left-[-16px] top-1/2 -translate-y-1/2 h-4 w-[2.5px] bottom-auto" : "w-full"
                                        )}
                                        style={{ backgroundColor: effectiveActiveColor }}
                                    />
                                )}

                                {!readOnly && (
                                    <button
                                        onClick={() => {
                                            const newLinks = links.filter((_: any, i: number) => i !== index);
                                            onUpdate({ links: newLinks });
                                        }}
                                        className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-all ml-1"
                                        title="Remover link"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </nav>
        </div>
    );
};
