import React from 'react';
import { DraggableElement } from './DraggableElement';
import type { EditorNode, EditorElement } from './types';
import { cn } from '@/utils/cn';

interface CanvasRendererProps {
    elements: EditorNode[];
    onElementSelect?: (id: string, multiSelect: boolean) => void;
    onElementUpdate?: (id: string, newProps: Partial<EditorElement>) => void;
    onElementDragDelta?: (id: string, deltaX: number, deltaY: number) => void;
    selectedIds: Set<string>;
    readOnly?: boolean;
    baseWidth?: number;
}

const RecursiveRenderer: React.FC<{
    node: EditorNode;
    selectedIds: Set<string>;
    onSelect: (id: string, multiSelect: boolean) => void;
    onUpdate: (id: string, newProps: Partial<EditorElement>) => void;
    onDragDelta: (id: string, deltaX: number, deltaY: number) => void;
    readOnly: boolean;
}> = ({ node, selectedIds, onSelect, onUpdate, onDragDelta, readOnly }) => {
    // If it's a container, we just render it as a DraggableElement
    // But DraggableElement currently assumes leaf content.
    // We need to actually render the children *inside* the draggable element if it's a container.
    // However, DraggableElement uses Rnd which establishes a new coordinate context (absolute positioning).
    // So children of a container should be absolutely positioned relative to the container.

    // For now, let's treat the Container as a regular element that *can* have children, 
    // but we need to inject the children rendering logic into DraggableElement.
    // Or, we render DraggableElement and pass children as children.

    return (
        <DraggableElement
            key={node.id}
            element={node}
            isSelected={selectedIds.has(node.id)}
            onSelect={onSelect}
            onChange={onUpdate}
            onDragDelta={onDragDelta}
            readOnly={readOnly}
        >
            {node.type === 'container' && (node as import('./types').ContainerElement).children.map(child => (
                <RecursiveRenderer
                    key={child.id}
                    node={child}
                    selectedIds={selectedIds}
                    onSelect={onSelect}
                    onUpdate={onUpdate}
                    onDragDelta={onDragDelta}
                    readOnly={readOnly}
                />
            ))}
        </DraggableElement>
    );
};

export const CanvasRenderer: React.FC<CanvasRendererProps> = ({
    elements,
    onElementSelect,
    onElementUpdate,
    onElementDragDelta,
    selectedIds,
    readOnly = false,
    baseWidth = 800,
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [scale, setScale] = React.useState(1);

    React.useEffect(() => {
        if (!readOnly || !containerRef.current) {
            setScale(1);
            return;
        }

        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const newScale = containerWidth / baseWidth;
                setScale(Math.min(newScale, 1));
            }
        };

        updateScale();
        const observer = new ResizeObserver(updateScale);
        observer.observe(containerRef.current);
        window.addEventListener('resize', updateScale);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateScale);
        };
    }, [readOnly, baseWidth]);
    return (
        <div
            ref={containerRef}
            className={cn(
                "relative flex-1 bg-white overflow-x-hidden flex flex-col h-full",
                !readOnly ? "border-2 border-dashed border-gray-300 rounded-lg shadow-inner" : "items-center"
            )}
            onClick={(e) => {
                if (e.target === e.currentTarget && onElementSelect) {
                    onElementSelect(null as any, false);
                }
            }}
        >
            <div
                className="relative"
                style={readOnly ? {
                    width: baseWidth,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center',
                    flexShrink: 0,
                    minHeight: '100%'
                } : {
                    flex: 1
                }}
            >
                {elements.map(el => (
                    <RecursiveRenderer
                        key={el.id}
                        node={el}
                        selectedIds={selectedIds}
                        onSelect={onElementSelect || (() => { })}
                        onUpdate={onElementUpdate || (() => { })}
                        onDragDelta={onElementDragDelta || (() => { })}
                        readOnly={readOnly}
                    />
                ))}
                {elements.length === 0 && !readOnly && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
                        Click buttons above to add elements
                    </div>
                )}
            </div>
        </div>
    );
};
