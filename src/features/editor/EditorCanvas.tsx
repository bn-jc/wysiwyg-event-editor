import React, { useCallback, useRef } from 'react';
import { Sidebar } from './Sidebar';
import { useEditorState } from './hooks/useEditorState';
import { EditorToolbar } from './components/EditorToolbar';
import { DynamicRenderer } from './components/DynamicRenderer';
import { cn } from '@/utils/cn';

import { PropertyEditor } from './components/PropertyEditor';
import { BackgroundMusic } from './components/BackgroundMusic';
import { EffectsOverlay } from './components/EffectsOverlay';
import { useEditorApi } from './hooks/useEditorApi';
import { useContainerSize } from './hooks/useContainerSize';

export interface EditorCanvasProps {
    initialLayout?: import('./types').EventLayout;
    onSave?: (layout: import('./types').EventLayout) => void;
}

export const EditorCanvas: React.FC<EditorCanvasProps> = ({ initialLayout, onSave }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { mode: containerMode } = useContainerSize(containerRef);

    const {
        layout,
        setLayout,
        activeSectionId,
        setActiveSectionId,
        viewMode,
        setViewMode,
        device,
        setDevice,
        showLayers,
        setShowLayers,
        addSection,
        updateSectionContent,
        updateSectionStyles,
        deleteSection,
        moveSection,
        updateGlobalStyles,
        updateMusic,
        updateEffects
    } = useEditorState(initialLayout);

    const handleSave = useCallback(() => {
        if (onSave) {
            onSave(layout);
        } else {
            console.log('Saving design:', JSON.stringify(layout, null, 2));
            alert('Design saved successfully! (Default Handler)');
        }
        // Notify parent via API if needed (handled in useEditorApi if triggered via message)
    }, [layout, onSave]);

    // Initialize Editor API
    useEditorApi({
        layout,
        setLayout,
        updateSectionContent,
        onSave: handleSave
    });

    const isPreviewOnly = viewMode === 'preview';
    const activeSection = layout.sections.find(s => s.id === activeSectionId);
    const activeSectionIndex = layout.sections.findIndex(s => s.id === activeSectionId);

    return (
        <div ref={containerRef} className="flex h-full flex-col bg-gray-50 overflow-hidden font-sans relative">
            <BackgroundMusic url={layout.musicUrl} />
            <EffectsOverlay effects={layout.effects} />
            <EditorToolbar
                viewMode={viewMode}
                setViewMode={setViewMode}
                device={device}
                setDevice={setDevice}
                onSave={handleSave}
                selectedCount={activeSectionId ? 1 : 0}
                globalStyles={layout.globalStyles}
                onUpdateGlobalStyles={updateGlobalStyles}
                musicUrl={layout.musicUrl}
                onUpdateMusic={updateMusic}
                effects={layout.effects}
                onUpdateEffects={updateEffects}
                layout={layout}
            />

            <div className="flex flex-1 overflow-hidden relative">
                {!isPreviewOnly && (
                    <Sidebar
                        onAddSection={addSection}
                        onToggleLayers={() => setShowLayers(!showLayers)}
                        isLayersOpen={showLayers}
                        // @ts-ignore - Prop will be added in next step
                        mode={containerMode}
                    />
                )}

                <main
                    className={cn(
                        "flex-1 overflow-auto bg-gray-200/50 flex flex-col items-center transition-all duration-300",
                        !isPreviewOnly && "py-12",
                        containerMode === 'mobile' && "px-4"
                    )}
                >
                    <div
                        className={cn(
                            "transition-all duration-500 bg-white shadow-2xl relative",
                            // Use container mode to force mobile view if container is small
                            (device === 'mobile' || containerMode === 'mobile') ? "w-[375px]" :
                                (device === 'tablet' || containerMode === 'compact') ? "w-[768px]" :
                                    "w-full max-w-6xl"
                        )}
                        style={{ minHeight: isPreviewOnly ? '100vh' : '800px' }}
                    >
                        <DynamicRenderer
                            layout={layout}
                            device={device}
                            readOnly={isPreviewOnly}
                            activeSectionId={activeSectionId}
                            onSectionUpdate={updateSectionContent}
                            onSectionSelect={setActiveSectionId}
                        />
                    </div>
                </main>

                {/* Properties Panel */}
                {activeSection && !isPreviewOnly && (
                    <div
                        className={cn(
                            "bg-white z-20 shadow-xl overflow-y-auto no-scrollbar transition-all duration-300",
                            containerMode === 'wide'
                                ? "w-96 border-l p-8 relative"
                                : "absolute inset-y-0 right-0 w-80 shadow-2xl border-l transform translate-x-0 h-full"
                        )}
                    >
                        {containerMode !== 'wide' && (
                            <button
                                onClick={() => setActiveSectionId(null)}
                                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 z-50"
                            >
                                <span className="sr-only">Close</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        )}
                        <PropertyEditor
                            section={activeSection}
                            onUpdate={(content) => updateSectionContent(activeSection.id, content)}
                            onUpdateStyles={(styles) => updateSectionStyles(activeSection.id, styles)}
                            onDelete={() => deleteSection(activeSection.id)}
                            onMove={(direction) => moveSection(activeSectionIndex, direction)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
