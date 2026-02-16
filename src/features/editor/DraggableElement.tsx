import React from 'react';
import { Rnd } from 'react-rnd';
import type { EditorElement } from './types';
import { cn } from '@/utils/cn';

interface DraggableElementProps {
    element: EditorElement;
    isSelected: boolean;
    onSelect: (id: string, multiSelect: boolean) => void;
    onChange: (id: string, newProps: Partial<EditorElement>) => void;
    onDragDelta: (id: string, deltaX: number, deltaY: number) => void;
    readOnly?: boolean;
}

export const DraggableElement: React.FC<DraggableElementProps & { children?: React.ReactNode }> = ({
    element,
    isSelected,
    onSelect,
    onChange,
    readOnly = false,
    children,
    onDragDelta
}) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const [currentPos, setCurrentPos] = React.useState({ x: element.x, y: element.y });
    const contentRef = React.useRef<HTMLSpanElement>(null);

    const handleDoubleClick = (e: React.MouseEvent) => {
        if (readOnly || element.type !== 'text') return;
        e.stopPropagation();
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (contentRef.current) {
            onChange(element.id, { content: contentRef.current.innerText });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (isEditing) {
            e.stopPropagation(); // Prevent deleting the element when backspacing text
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleBlur();
            }
        }
    };

    // Focus when entering edit mode
    React.useEffect(() => {
        if (isEditing && contentRef.current) {
            contentRef.current.focus();
            // Select all text
            const range = document.createRange();
            range.selectNodeContents(contentRef.current);
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
        }
    }, [isEditing]);

    return (
        <Rnd
            size={{ width: element.width, height: element.height }}
            position={{ x: element.x, y: element.y }}
            disableDragging={readOnly || isEditing}
            enableResizing={!readOnly && !isEditing}
            onDrag={(_e, d) => {
                setIsDragging(true);
                setCurrentPos({ x: d.x, y: d.y });
                onDragDelta(element.id, d.deltaX, d.deltaY);
            }}
            onDragStop={(_e, d) => {
                if (readOnly || isEditing) return;
                setIsDragging(false);
                onChange(element.id, { x: d.x, y: d.y });
            }}
            onResizeStop={(_e, _direction, ref, _delta, position) => {
                if (readOnly || isEditing) return;
                onChange(element.id, {
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height),
                    ...position,
                });
            }}
            onClick={(e: React.MouseEvent) => {
                if (!readOnly && !isEditing) {
                    const multiSelect = e.ctrlKey || e.metaKey;
                    onSelect(element.id, multiSelect);
                }
            }}
            onDoubleClick={handleDoubleClick}
            className={cn(
                "transition-colors",
                !readOnly && !isEditing && "border-2",
                !readOnly && isSelected && !isEditing ? "border-blue-500" : !readOnly && !isEditing ? "border-transparent hover:border-blue-300" : "",
                isEditing && "z-20 cursor-text"
            )}
            bounds="parent"
        >
            {isDragging && (
                <div className="absolute -top-8 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow z-50 whitespace-nowrap">
                    X: {Math.round(currentPos.x)} Y: {Math.round(currentPos.y)}
                </div>
            )}
            <div className={cn(
                "w-full h-full flex items-center justify-center overflow-hidden",
                element.type === 'container' && !element.styles?.border && !element.styles?.backgroundImage && !readOnly ? "border-2 border-dashed border-gray-300 bg-gray-50/50" : ""
            )} style={element.type !== 'input' ? {
                ...element.styles,
                backgroundSize: element.styles?.backgroundSize || 'cover',
                backgroundPosition: element.styles?.backgroundPosition || 'center',
                backgroundImage: element.styles?.backgroundImage && element.styles.backgroundImage !== 'none'
                    ? `url(${element.styles.backgroundImage})`
                    : undefined
            } : undefined}>
                {element.type === 'text' && (
                    <span
                        ref={contentRef}
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        className={cn(
                            "w-full h-full p-2 break-words outline-none",
                            isEditing ? "cursor-text select-text" : "cursor-default select-none pointer-events-none"
                        )}
                        style={{
                            pointerEvents: isEditing ? 'auto' : 'none',
                            fontSize: element.styles?.fontSize,
                            color: element.styles?.color,
                            fontWeight: element.styles?.fontWeight,
                            fontStyle: element.styles?.fontStyle,
                            textDecoration: element.styles?.textDecoration,
                            textAlign: element.styles?.textAlign,
                            fontFamily: element.styles?.fontFamily,
                        }}
                    >
                        {element.content}
                    </span>
                )}

                {element.type === 'image' && (
                    <img
                        src={element.content}
                        alt="Event element"
                        className="w-full h-full object-contain pointer-events-none"
                    />
                )}

                {element.type === 'input' && (
                    isEditing ? (
                        <input
                            type="text"
                            defaultValue={element.content}
                            onBlur={(e) => onChange(element.id, { content: e.target.value })}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.currentTarget.blur();
                                    setIsEditing(false);
                                }
                            }}
                            className="w-full h-full p-2 border-2 border-blue-500 rounded-xl outline-none shadow-lg shadow-blue-500/10 ring-4 ring-blue-500/5 transition-all duration-200"
                            autoFocus
                        />
                    ) : (
                        <input
                            type="text"
                            placeholder={element.content}
                            className={cn(
                                "w-full h-full transition-all duration-300 placeholder:text-gray-400 placeholder:font-medium",
                                "border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:shadow-sm outline-none",
                                !readOnly ? "pointer-events-none rounded-[inherit]" : "pointer-events-auto rounded-[inherit] hover:border-gray-300"
                            )}
                            style={{
                                ...element.styles,
                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                            }}
                            readOnly={!readOnly}
                            onDoubleClick={!readOnly ? handleDoubleClick : undefined}
                        />
                    )
                )}

                {element.type === 'container' && (
                    <div className="w-full h-full relative">
                        {/* Render children for recursion */}
                        {children}
                    </div>
                )}
            </div>
        </Rnd>
    );
};
