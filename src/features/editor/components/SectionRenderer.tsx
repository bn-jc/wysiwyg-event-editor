import React from 'react';
import type { SectionRendererProps } from '../types';
import { cn } from '@/utils/cn';
import { SplashSection, HeroSection, AgendaSection, RSVPSection, GuestbookSection, CountdownSection, SeparatorSection, NavSection, CustomSection, GiftsSection } from './sections';
import { ParticlesBackground } from './common/ParticlesBackground';

export const SectionRenderer: React.FC<SectionRendererProps> = (props) => {
    const { section, isActive, onSelect, readOnly, isDark } = props;
    const { content } = section;

    const renderContent = () => {
        switch (section.type) {
            case 'SplashSection':
                return <SplashSection {...props} />;
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
                return <NavSection {...props} activeScrollSectionId={props.activeScrollSectionId} onNavigate={props.onNavigate} />;
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
            style={section.styles}
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
                </>
            )}
            {renderContent()}

            {/* Hover Indicator */}
            {!readOnly && !isActive && (
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors pointer-events-none" />
            )}
        </div>
    );
};
