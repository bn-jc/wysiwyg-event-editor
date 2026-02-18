import React from 'react';
import type { SectionRendererProps } from '../types';
import { cn } from '@/utils/cn';
import { SplashSection, HeroSection, AgendaSection, RSVPSection, GuestbookSection, CountdownSection, SeparatorSection, NavSection, CustomSection, GiftsSection } from './sections';
import { ParticlesBackground } from './common/ParticlesBackground';
import { SectionDecoration } from './common/SectionDecoration';

export const SectionRenderer: React.FC<SectionRendererProps> = (props) => {
    const { section, isActive, onSelect, readOnly, isDark } = props;
    const { content } = section;

    const renderContent = () => {
        switch (section.type) {
            case 'SplashSection':
                return <SplashSection {...props} sections={props.sections} />;
            case 'HeroSection':
                return <HeroSection {...props} />;
            case 'AgendaSection':
                return <AgendaSection {...props} />;
            case 'RSVPSection':
                return <RSVPSection {...props} />;
            case 'GuestbookSection':
                return <GuestbookSection {...props} />;
            case 'CountdownSection':
                return <CountdownSection {...props} />;
            case 'SeparatorSection':
                return <SeparatorSection {...props} />;
            case 'NavSection':
                return <NavSection {...props} activeScrollSectionId={props.activeScrollSectionId} onNavigate={props.onNavigate} sections={props.sections} />;
            case 'CustomSection':
                return <CustomSection {...props} />;
            case 'GiftsSection':
                return <GiftsSection {...props} />;
            default:
                return (
                    <div className="p-8 border-2 border-dashed border-gray-200 text-gray-400 text-center">
                        Seção "{section.type}" não encontrada.
                    </div>
                );
        }
    };

    return (
        <div
            onClick={onSelect}
            id={section.id}
            className={cn(
                "relative group cursor-pointer transition-all",
                section.type !== 'NavSection' && "overflow-hidden",
                isActive && !readOnly ? 'ring-2 ring-blue-500 ring-inset shadow-lg z-10' : ''
            )}
            style={{
                ...section.styles,
                backgroundColor: section.styles?.backgroundColor || (isDark
                    ? (props.globalStyles.themeShades?.dark.background || '#121212')
                    : (props.globalStyles.themeShades?.light.background || '#ffffff'))
            }}
        >
            {section.type !== 'SplashSection' && (
                <>
                    <ParticlesBackground
                        type={content.backgroundEffect || 'none'}
                        animated={true}
                        color={content.backgroundEffectColor}
                        direction={content.backgroundEffectDirection as any}
                        startTime={content.backgroundEffectStart}
                        endTime={content.backgroundEffectEnd}
                    />
                    <ParticlesBackground
                        type={content.backgroundParticles || 'none'}
                        animated={false}
                        color={content.backgroundParticlesColor}
                    />
                    <SectionDecoration
                        type={content.sectionDecoration || 'none'}
                        color={content.sectionDecorationColor}
                        isDark={isDark}
                    />
                </>
            )}
            {renderContent()}

            {/* In-section tools */}
            {!readOnly && section.type !== 'SplashSection' && (
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm('Deseja realmente excluir esta seção?')) {
                                (props as any).onDelete && (props as any).onDelete(section.id);
                            }
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
                        title="Excluir Seção"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" /></svg>
                    </button>
                </div>
            )}

            {/* Hover Indicator */}
            {!readOnly && !isActive && (
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors pointer-events-none" />
            )}
        </div>
    );
};
