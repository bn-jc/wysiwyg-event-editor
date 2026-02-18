import React, { useCallback, useRef } from 'react';
import { Sidebar } from './Sidebar';
import { useEditorState } from './hooks/useEditorState';
import { EditorToolbar } from './components/EditorToolbar';
import { DynamicRenderer } from './components/DynamicRenderer';
import { cn } from '@/utils/cn';

import { PropertyEditor } from './components/PropertyEditor';
import { useEditorApi } from './hooks/useEditorApi';
import { useContainerSize } from './hooks/useContainerSize';
import { SectionLayersPanel } from './SectionLayersPanel';

export interface EditorCanvasProps {
    initialLayout?: import('./types').EventLayout;
    onSave?: (layout: import('./types').EventLayout) => void;
}

export const EditorCanvas: React.FC<EditorCanvasProps> = ({ initialLayout, onSave }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { mode: containerMode } = useContainerSize(containerRef);
    const [isPlayMode, setIsPlayMode] = React.useState(false);
    const [playKey, setPlayKey] = React.useState(0);

    // Editor UI Theme state
    const [editorIsDark, setEditorIsDark] = React.useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('editor-theme');
            if (saved) return saved === 'dark';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    // Persist editor theme
    React.useEffect(() => {
        localStorage.setItem('editor-theme', editorIsDark ? 'dark' : 'light');
    }, [editorIsDark]);

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
        reorderSections,
        updateSectionContent,
        updateSectionStyles,
        deleteSection,
        moveSection,
        updateGlobalStyles,
        updateMusic
    } = useEditorState(initialLayout);

    const handleSave = useCallback(() => {
        if (onSave) {
            onSave(layout);
        } else {
            console.log('Saving design:', JSON.stringify(layout, null, 2));
            alert('Design saved successfully! (Default Handler)');
        }
    }, [layout, onSave]);

    const handlePlay = useCallback(() => {
        setPlayKey(prev => prev + 1);
        setIsPlayMode(true);
    }, []);

    // Initialize Editor API
    const { emitInteraction } = useEditorApi({
        layout,
        setLayout,
        updateSectionContent,
        onSave: handleSave
    });

    const isPreviewOnly = viewMode === 'preview';
    const activeSection = layout.sections.find(s => s.id === activeSectionId);
    const activeSectionIndex = layout.sections.findIndex(s => s.id === activeSectionId);

    // Disable body scroll when in Play Mode
    React.useEffect(() => {
        if (isPlayMode) {
            document.body.style.overflow = 'hidden';
            // Also prevent touchmove if necessary for iOS
            const preventDefault = (e: TouchEvent) => e.preventDefault();
            document.addEventListener('touchmove', preventDefault, { passive: false });
            return () => {
                document.body.style.overflow = '';
                document.removeEventListener('touchmove', preventDefault);
            };
        }
    }, [isPlayMode]);

    if (isPlayMode) {
        return (
            <div className="fixed inset-0 z-[100] bg-white overflow-hidden flex flex-col">
                <button
                    onClick={() => setIsPlayMode(false)}
                    className="absolute top-6 right-6 z-[110] bg-black/60 hover:bg-black/80 backdrop-blur-md p-3 rounded-full text-white shadow-2xl transition-all hover:scale-110 active:scale-90 flex items-center justify-center group border border-white/20"
                    title="Fechar Visualização"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow-lg opacity-90 group-hover:opacity-100"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <div className="flex-1 overflow-hidden relative">
                    <DynamicRenderer
                        key={`play-${playKey}`}
                        layout={layout}
                        device={device}
                        readOnly={true}
                        onInteraction={emitInteraction}
                        isDark={editorIsDark}
                    />
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={cn(
            "flex h-full flex-col overflow-hidden font-sans relative transition-colors duration-300",
            editorIsDark ? "bg-[#0f1115]" : "bg-gray-50"
        )}>
            <EditorToolbar
                viewMode={viewMode}
                setViewMode={setViewMode}
                device={device}
                setDevice={setDevice}
                selectedCount={activeSectionId ? 1 : 0}
                globalStyles={layout.globalStyles}
                onUpdateGlobalStyles={updateGlobalStyles}
                musicUrl={layout.musicUrl}
                onUpdateMusic={updateMusic}
                onPlay={handlePlay}
                isDark={editorIsDark}
                onToggleDark={() => setEditorIsDark(!editorIsDark)}
            />

            <div className="flex flex-1 overflow-hidden relative">
                {!isPreviewOnly && (
                    <Sidebar
                        onAddSection={addSection}
                        onToggleLayers={() => setShowLayers(!showLayers)}
                        isLayersOpen={showLayers}
                        mode={containerMode}
                        hasSplash={layout.sections.some(s => s.type === 'SplashSection')}
                        isDark={editorIsDark}
                        onToggleNavbar={() => {
                            const navSection = layout.sections.find(s => s.type === 'NavSection');
                            if (navSection) {
                                setLayout(prev => ({
                                    ...prev,
                                    sections: prev.sections.map(s =>
                                        s.id === navSection.id ? { ...s, isHidden: !s.isHidden } : s
                                    )
                                }));
                            } else {
                                addSection('NavSection');
                            }
                        }}
                        isNavHidden={layout.sections.find(s => s.type === 'NavSection')?.isHidden}
                    />
                )}

                {showLayers && !isPreviewOnly && (
                    <SectionLayersPanel
                        sections={layout.sections}
                        activeSectionId={activeSectionId}
                        onSelect={setActiveSectionId}
                        onReorder={reorderSections}
                        isDark={editorIsDark}
                    />
                )}

                <main
                    className={cn(
                        "flex-1 overflow-auto flex flex-col items-center transition-all duration-300",
                        editorIsDark ? "bg-[#0f1115]" : "bg-gray-200/50",
                        !isPreviewOnly && "py-12",
                        containerMode === 'mobile' && "px-4"
                    )}
                >
                    <div
                        className={cn(
                            "transition-all duration-500 relative",
                            editorIsDark ? "bg-[#1a1d23] shadow-black/40" : "bg-white shadow-2xl",
                            // Use container mode to force mobile view if container is small
                            (device === 'mobile' || containerMode === 'mobile') ? "w-[375px]" :
                                (device === 'tablet' || containerMode === 'compact') ? "w-[768px]" :
                                    layout.globalStyles.layoutMode === 'full' ? "w-full" : "w-full max-w-6xl"
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
                            onInteraction={emitInteraction}
                            isDark={editorIsDark}
                        />
                    </div>
                </main>

                {/* Properties Panel */}
                {activeSection && !isPreviewOnly && (
                    <div
                        className={cn(
                            "z-20 shadow-xl overflow-y-auto no-scrollbar transition-all duration-300",
                            editorIsDark ? "bg-[#1a1d23] border-[#2d333b]" : "bg-white border-l",
                            containerMode === 'wide'
                                ? "w-96 p-8 relative"
                                : "absolute inset-y-0 right-0 w-80 shadow-2xl border-l transform translate-x-0 h-full"
                        )}
                    >
                        {containerMode !== 'wide' && (
                            <button
                                onClick={() => setActiveSectionId(null)}
                                className={cn(
                                    "absolute top-4 right-4 p-2 rounded-full z-50 transition-colors",
                                    editorIsDark ? "bg-gray-800 hover:bg-gray-700 text-gray-400" : "bg-gray-100 hover:bg-gray-200 text-gray-500"
                                )}
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
                            isDark={editorIsDark}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
