import React from 'react';
import { DraggableElement } from './DraggableElement';
import type { EditorNode, EditorElement, DeviceType } from './types';
import { cn } from '@/utils/cn';

interface CanvasRendererProps {
    elements: EditorNode[];
    onElementSelect?: (id: string, multiSelect: boolean) => void;
    onElementUpdate?: (id: string, newProps: Partial<EditorElement>) => void;
    onElementDragDelta?: (id: string, deltaX: number, deltaY: number) => void;
    selectedIds: Set<string>;
    readOnly?: boolean;
    baseWidth?: number;
    pageHeight?: number;
    device?: DeviceType;
    pageStyles?: React.CSSProperties;
}

const RecursiveRenderer: React.FC<{
    node: EditorNode;
    selectedIds: Set<string>;
    onSelect: (id: string, multiSelect: boolean) => void;
    onUpdate: (id: string, newProps: Partial<EditorElement>) => void;
    onDragDelta: (id: string, deltaX: number, deltaY: number) => void;
    readOnly: boolean;
    device?: DeviceType;
}> = ({ node, selectedIds, onSelect, onUpdate, onDragDelta, readOnly, device = 'tablet' }) => {
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
            device={device}
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
                    device={device}
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
    pageHeight = 1200,
    device = 'tablet',
    pageStyles = {}
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [scale, setScale] = React.useState(1);

    React.useEffect(() => {
        if (!containerRef.current) {
            setScale(1);
            return;
        }

        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.clientWidth;
                const containerHeight = containerRef.current.clientHeight;

                const scaleW = containerWidth / baseWidth;
                const scaleH = containerHeight / pageHeight;

                // Scale to fit while maintaining aspect ratio
                const newScale = Math.min(scaleW, scaleH);
                setScale(newScale);
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
    }, [baseWidth, pageHeight]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative flex-1 bg-white flex flex-col h-full w-full overflow-hidden",
                !readOnly ? "border-2 border-dashed border-gray-300 rounded-lg shadow-inner" : "items-center justify-center"
            )}
            onClick={(e) => {
                if (e.target === e.currentTarget && onElementSelect) {
                    onElementSelect(null as any, false);
                }
            }}
        >
            <div
                className="relative shadow-sm"
                style={{
                    width: baseWidth,
                    height: pageHeight,
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                    flexShrink: 0,
                    backgroundColor: 'white',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    ...pageStyles
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
                        device={device}
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
