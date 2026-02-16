import React, { useState, useEffect, useCallback } from 'react';
import type { EditorElement, Page, EditorNode, ContainerElement } from './types';
import { Sidebar } from './Sidebar';
import { cn } from '@/utils/cn';
import { CanvasRenderer } from './CanvasRenderer';
import { LayersPanel } from './LayersPanel';
import { Type, Eye, LayoutGrid, Trash2, Smartphone, Tablet, Monitor } from 'lucide-react';

type ViewMode = 'edit' | 'preview' | 'split';
type DeviceType = 'desktop' | 'tablet' | 'mobile';

const INITIAL_PAGE: Page = {
    id: 'page-1',
    name: 'Home',
    width: 800,
    height: 1200,
    children: [
        {
            id: '1',
            type: 'text',
            content: 'You are invited!',
            x: 100,
            y: 100,
            width: 200,
            height: 50,
            styles: { fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }
        }
    ]
};

const updateNodeInTree = (nodes: EditorNode[], id: string, newProps: Partial<EditorElement>): EditorNode[] => {
    return nodes.map(node => {
        if (node.id === id) {
            return { ...node, ...newProps } as EditorNode;
        }
        if (node.type === 'container') {
            const container = node as ContainerElement;
            return { ...container, children: updateNodeInTree(container.children, id, newProps) };
        }
        return node;
    });
};

const deleteNodeFromTree = (nodes: EditorNode[], id: string): EditorNode[] => {
    return nodes
        .filter(node => node.id !== id)
        .map(node => {
            if (node.type === 'container') {
                const container = node as ContainerElement;
                return { ...container, children: deleteNodeFromTree(container.children, id) };
            }
            return node;
        });
};

const deleteNodesFromTree = (nodes: EditorNode[], ids: Set<string>): EditorNode[] => {
    return nodes
        .filter(node => !ids.has(node.id))
        .map(node => {
            if (node.type === 'container') {
                const container = node as ContainerElement;
                return { ...container, children: deleteNodesFromTree(container.children, ids) };
            }
            return node;
        });
};

export const EditorCanvas: React.FC = () => {
    const [page, setPage] = useState<Page>(INITIAL_PAGE);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [viewMode, setViewMode] = useState<ViewMode>('split');
    const [device, setDevice] = useState<DeviceType>('desktop');
    const [showLayers, setShowLayers] = useState(true);

    const addElement = (newElement: EditorNode) => {
        setPage(prev => ({
            ...prev,
            children: [...prev.children, newElement]
        }));
        setSelectedIds(new Set([newElement.id]));
    };

    const addText = () => {
        const newElement: EditorElement = {
            id: Date.now().toString(),
            type: 'text',
            content: 'Double click to edit',
            x: 50,
            y: 50,
            width: 200,
            height: 100,
            styles: { fontSize: '16px', color: '#000000' }
        };
        addElement(newElement);
    };

    const addImage = (url: string) => {
        const newElement: EditorElement = {
            id: Date.now().toString(),
            type: 'image',
            content: url,
            x: 100,
            y: 100,
            width: 200,
            height: 150,
        };
        addElement(newElement);
    };

    const addContainer = () => {
        const newElement: ContainerElement = {
            id: Date.now().toString(),
            type: 'container',
            children: [],
            x: 50,
            y: 50,
            width: 300,
            height: 200,
            styles: {
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderStyle: 'solid',
                borderRadius: '12px',
                backgroundImage: 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }
        };
        addElement(newElement);
    };

    const addInput = () => {
        const newElement: EditorElement = {
            id: Date.now().toString(),
            type: 'input',
            content: 'Enter text...',
            x: 50,
            y: 50,
            width: 200,
            height: 40,
            styles: {
                fontSize: '14px',
                color: '#000000',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                padding: '8px',
                backgroundColor: '#ffffff'
            }
        };
        addElement(newElement);
    };

    const updateElement = (id: string, newProps: Partial<EditorElement>) => {
        setPage(prev => ({
            ...prev,
            children: updateNodeInTree(prev.children, id, newProps)
        }));
    };

    const deleteSelectedElements = useCallback(() => {
        if (selectedIds.size > 0) {
            setPage(prev => ({
                ...prev,
                children: deleteNodesFromTree(prev.children, selectedIds)
            }));
            setSelectedIds(new Set());
        }
    }, [selectedIds]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedIds.size > 0) {
                const activeEl = document.activeElement as HTMLElement;
                const isEditing = activeEl.isContentEditable || activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA';

                if (!isEditing) {
                    deleteSelectedElements();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [deleteSelectedElements, selectedIds]);

    const handleCanvasClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setSelectedIds(new Set());
        }
    };

    const handleSelect = (id: string | null, multiSelect: boolean = false) => {
        if (id === null) {
            setSelectedIds(new Set());
            return;
        }

        setSelectedIds(prev => {
            const newSet = new Set(multiSelect ? prev : []);
            if (multiSelect && newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const moveSelectedElements = useCallback((deltaX: number, deltaY: number) => {
        setPage(prev => {
            const updateNodes = (nodes: EditorNode[]): EditorNode[] => {
                return nodes.map(node => {
                    if (selectedIds.has(node.id)) {
                        return {
                            ...node,
                            x: node.x + deltaX,
                            y: node.y + deltaY
                        } as EditorNode;
                    }
                    if (node.type === 'container') {
                        const container = node as ContainerElement;
                        return { ...container, children: updateNodes(container.children) };
                    }
                    return node;
                });
            };
            return { ...prev, children: updateNodes(prev.children) };
        });
    }, [selectedIds]);

    const handleDragDelta = useCallback((_id: string, deltaX: number, deltaY: number) => {
        moveSelectedElements(deltaX, deltaY);
    }, [moveSelectedElements]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const activeEl = document.activeElement as HTMLElement;
            const isEditing = activeEl.isContentEditable || activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA';

            if (isEditing) return;

            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedIds.size > 0) {
                deleteSelectedElements();
            } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key) && selectedIds.size > 0) {
                e.preventDefault();
                const step = e.shiftKey ? 10 : 1;
                let deltaX = 0;
                let deltaY = 0;

                if (e.key === 'ArrowUp') deltaY = -step;
                if (e.key === 'ArrowDown') deltaY = step;
                if (e.key === 'ArrowLeft') deltaX = -step;
                if (e.key === 'ArrowRight') deltaX = step;

                moveSelectedElements(deltaX, deltaY);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [deleteSelectedElements, selectedIds, moveSelectedElements]);

    return (
        <div className="flex bg-gray-50 h-full w-full overflow-hidden">
            {/* Sidebar */}
            {viewMode !== 'preview' && (
                <Sidebar
                    onAddText={addText}
                    onAddImage={addImage}
                    onAddContainer={addContainer}
                    onAddInput={addInput}
                    onToggleLayers={() => setShowLayers(!showLayers)}
                    isLayersOpen={showLayers}
                />
            )}

            {/* Layers Panel */}
            {viewMode !== 'preview' && showLayers && (
                <LayersPanel
                    nodes={page.children}
                    selectedIds={selectedIds}
                    onSelect={handleSelect}
                />
            )}

            <div className="flex flex-col flex-1 h-full gap-4 relative" onClick={handleCanvasClick}>
                {/* Toolbar */}
                <div className="flex items-center gap-2 p-2 bg-white border-b shadow-sm z-30">
                    {/* Left side context tools */}
                    {viewMode !== 'preview' && (
                        <button
                            onClick={deleteSelectedElements}
                            disabled={selectedIds.size === 0}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200"
                            title="Delete Selected (Delete/Backspace)"
                        >
                            <Trash2 size={16} /> Delete
                        </button>
                    )}

                    {(viewMode === 'preview' || viewMode === 'split') && (
                        <div className="flex bg-gray-100 rounded p-1 ml-4 gap-1">
                            <button
                                onClick={() => setDevice('desktop')}
                                title="Desktop View"
                                className={cn(
                                    "p-2 rounded transition-colors",
                                    device === 'desktop' ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                <Monitor size={16} />
                            </button>
                            <button
                                onClick={() => setDevice('tablet')}
                                title="Tablet View"
                                className={cn(
                                    "p-2 rounded transition-colors",
                                    device === 'tablet' ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                <Tablet size={16} />
                            </button>
                            <button
                                onClick={() => setDevice('mobile')}
                                title="Mobile View"
                                className={cn(
                                    "p-2 rounded transition-colors",
                                    device === 'mobile' ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                <Smartphone size={16} />
                            </button>
                        </div>
                    )}

                    <div className="flex bg-gray-100 rounded p-1 ml-auto gap-1">
                        <button
                            onClick={() => setViewMode('edit')}
                            title="Edit Mode"
                            className={cn(
                                "p-2 rounded transition-colors",
                                viewMode === 'edit' ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            <Type size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode('split')}
                            title="Split View"
                            className={cn(
                                "p-2 rounded transition-colors",
                                viewMode === 'split' ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            <LayoutGrid size={16} />
                        </button>
                        <button
                            onClick={() => {
                                setViewMode('preview');
                                setSelectedIds(new Set());
                            }}
                            title="Preview Mode"
                            className={cn(
                                "p-2 rounded transition-colors",
                                viewMode === 'preview' ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            <Eye size={16} />
                        </button>
                    </div>
                </div>

                {/* Canvas Area */}
                <div className={cn(
                    "flex-1 grid gap-4 bg-gray-100 p-4 overflow-hidden",
                    viewMode === 'split' ? "grid-cols-2" : "grid-cols-1"
                )}>
                    {/* Editor Pane / Main View */}
                    {(viewMode === 'edit' || viewMode === 'split') && (
                        <CanvasRenderer
                            elements={page.children}
                            selectedIds={selectedIds}
                            onElementSelect={handleSelect}
                            onElementUpdate={updateElement}
                            onElementDragDelta={handleDragDelta}
                            readOnly={false}
                            baseWidth={page.width}
                        />
                    )}

                    {/* Preview Pane */}
                    {(viewMode === 'preview' || viewMode === 'split') && (
                        <div className="flex justify-center items-center h-full overflow-auto bg-neutral-100 relative p-8">
                            {/* Background Pattern */}
                            <div
                                className="absolute inset-0 opacity-20 pointer-events-none"
                                style={{
                                    backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
                                    backgroundSize: '24px 24px'
                                }}
                            />

                            <div
                                className={cn(
                                    "transition-all duration-500 ease-in-out shadow-2xl bg-white relative z-10",
                                    // Mobile: Responsive width up to 375px, height fits container but maxes at 667px
                                    device === 'mobile' ? "w-full max-w-[375px] h-full max-h-[667px] rounded-[3rem] border-[14px] border-slate-900" :
                                        // Tablet: Responsive width up to 768px, height fills container (minus margins/padding if needed)
                                        device === 'tablet' ? "w-full max-w-[768px] h-full max-h-[1024px] rounded-[2rem] border-[14px] border-slate-900" :
                                            // Desktop
                                            "w-full h-full rounded shadow-sm border border-gray-200"
                                )}
                            >
                                {/* Mobile Notch */}
                                {device === 'mobile' && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-slate-900 rounded-b-[1rem] z-50 pointer-events-none"></div>
                                )}

                                {/* Inner Content Area - Clips corners to match device */}
                                <div className="w-full h-full overflow-y-auto no-scrollbar bg-white rounded-[inherit]">
                                    <CanvasRenderer
                                        elements={page.children}
                                        selectedIds={new Set()} // Deselect in preview
                                        readOnly={true}
                                        baseWidth={page.width}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
