import React from 'react';
import { Rnd } from 'react-rnd';
import { cn } from '@/utils/cn';
import type { DraggableElementProps } from './types';

export const DraggableElement: React.FC<DraggableElementProps & { children?: React.ReactNode }> = ({
    element,
    isSelected,
    onSelect,
    onChange,
    readOnly = false,
    children,
    onDragDelta,
    device = 'mobile'
}) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const contentRef = React.useRef<HTMLSpanElement>(null);

    const mergedStyles = React.useMemo(() => {
        const baseStyles = element.styles || {};
        const overrides = device !== 'desktop' ? element.responsiveStyles?.[device] || {} : {};
        return { ...baseStyles, ...overrides };
    }, [element.styles, element.responsiveStyles, device]);

    // Track position in local state during drag for the coordinate display
    const [currentPos, setCurrentPos] = React.useState({
        x: (mergedStyles as any).x ?? element.x,
        y: (mergedStyles as any).y ?? element.y
    });

    // Update currentPos when element or device changes
    React.useEffect(() => {
        setCurrentPos({
            x: (mergedStyles as any).x ?? element.x,
            y: (mergedStyles as any).y ?? element.y
        });
    }, [element.x, element.y, mergedStyles]);

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
            size={{
                width: (mergedStyles as any).width ?? element.width,
                height: (mergedStyles as any).height ?? element.height
            }}
            position={{
                x: (mergedStyles as any).x ?? element.x,
                y: (mergedStyles as any).y ?? element.y
            }}
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
                "w-full h-full flex items-center justify-center overflow-hidden box-border",
                element.type === 'container' && !mergedStyles.border && !mergedStyles.backgroundImage && !readOnly ? "border-2 border-dashed border-gray-300 bg-gray-50/50" : ""
            )} style={element.type !== 'input' ? {
                ...mergedStyles,
                backgroundSize: mergedStyles.backgroundSize || 'cover',
                backgroundPosition: mergedStyles.backgroundPosition || 'center',
                backgroundImage: mergedStyles.backgroundImage && mergedStyles.backgroundImage !== 'none'
                    ? `url(${mergedStyles.backgroundImage})`
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
                            "w-full h-full p-2 break-word outline-none box-border",
                            isEditing ? "cursor-text select-text" : "cursor-default select-none pointer-events-none"
                        )}
                        style={{
                            pointerEvents: isEditing ? 'auto' : 'none',
                            fontSize: mergedStyles.fontSize as string,
                            color: mergedStyles.color as string,
                            fontWeight: mergedStyles.fontWeight as any,
                            fontStyle: mergedStyles.fontStyle as string,
                            textDecoration: mergedStyles.textDecoration as string,
                            textAlign: mergedStyles.textAlign as any,
                            fontFamily: mergedStyles.fontFamily as string,
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
                                ...mergedStyles,
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
