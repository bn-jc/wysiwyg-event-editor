import React from 'react';
import { DynamicRenderer } from './DynamicRenderer';
import { BackgroundMusic } from './BackgroundMusic';
import type { EventLayout } from '../types';

interface PublicInvitationProps {
    layout: EventLayout;
}

export const PublicInvitation: React.FC<PublicInvitationProps> = ({ layout }) => {
    return (
        <div
            className="min-h-screen w-full overflow-x-hidden relative"
            style={{
                backgroundColor: layout.globalStyles.backgroundColor || '#ffffff',
            }}
        >
            {/* Background Music */}
            <BackgroundMusic url={layout.musicUrl} />


            {/* Main Content */}
            <main className={`relative z-10 mx-auto w-full ${layout.globalStyles.layoutMode === 'full' ? '' : 'max-w-6xl'}`}>
                <DynamicRenderer
                    layout={layout}
                    readOnly={true}
                    device="desktop"
                />
            </main>

            {/* Footer / Branding (Optional) */}
            <footer className="py-8 text-center text-xs opacity-50 relative z-10">
                Criado com Convite Premium
            </footer>

            <style>{`
                body {
                    margin: 0;
                    padding: 0;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
};
