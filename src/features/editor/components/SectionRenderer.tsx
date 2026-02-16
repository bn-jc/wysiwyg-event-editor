import React from 'react';
import type { SectionRendererProps } from '../types';
import { SplashSection, HeroSection, AgendaSection, RSVPSection } from './sections';

export const SectionRenderer: React.FC<SectionRendererProps> = (props) => {
    const { section, isActive, onSelect, readOnly } = props;

    const renderContent = () => {
        switch (section.templateId) {
            case 'splash-01':
                return <SplashSection {...props} />;
            case 'hero-01':
                return <HeroSection {...props} />;
            case 'agenda-01':
                return <AgendaSection {...props} />;
            case 'rsvp-01':
                return <RSVPSection {...props} />;
            default:
                return (
                    <div className="p-8 border-2 border-dashed border-gray-200 text-gray-400 text-center">
                        Template {section.templateId} não encontrado.
                    </div>
                );
        }
    };

    return (
        <div
            onClick={onSelect}
            className={`relative group cursor-pointer transition-all ${isActive && !readOnly ? 'ring-2 ring-blue-500 ring-inset shadow-lg z-10' : ''
                }`}
        >
            {renderContent()}

            {/* Hover Indicator */}
            {!readOnly && !isActive && (
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors pointer-events-none" />
            )}
        </div>
    );
};
