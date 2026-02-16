import React, { useCallback } from 'react';
import { Sidebar } from './Sidebar';
import { useEditorState } from './hooks/useEditorState';
import { EditorToolbar } from './components/EditorToolbar';
import { DynamicRenderer } from './components/DynamicRenderer';
import { cn } from '@/utils/cn';

import { PropertyEditor } from './components/PropertyEditor';
import { BackgroundMusic } from './components/BackgroundMusic';
import { EffectsOverlay } from './components/EffectsOverlay';
import { useEditorApi } from './hooks/useEditorApi';

export const EditorCanvas: React.FC = () => {
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
    } = useEditorState();

    const handleSave = useCallback(() => {
        console.log('Saving design:', JSON.stringify(layout, null, 2));
        alert('Design saved successfully! (Simulated)');
        // Notify parent via API if needed (handled in useEditorApi if triggered via message)
    }, [layout]);

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
        <div className="flex h-full flex-col bg-gray-50 overflow-hidden font-sans">
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
            />

            <div className="flex flex-1 overflow-hidden relative">
                {!isPreviewOnly && (
                    <Sidebar
                        onAddSection={addSection}
                        onToggleLayers={() => setShowLayers(!showLayers)}
                        isLayersOpen={showLayers}
                    />
                )}

                <main
                    className={cn(
                        "flex-1 overflow-auto bg-gray-200/50 flex flex-col items-center",
                        !isPreviewOnly && "py-12"
                    )}
                >
                    <div
                        className={cn(
                            "transition-all duration-500 bg-white shadow-2xl relative",
                            device === 'mobile' ? "w-[375px]" :
                                device === 'tablet' ? "w-[768px]" :
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
                    <div className="w-96 border-l bg-white z-20 shadow-xl p-8 overflow-y-auto no-scrollbar">
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
