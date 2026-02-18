import React, { useState, useEffect, useRef } from 'react';
import { Bold, Italic, Underline } from 'lucide-react';

interface InlineTextProps {
    value: string;
    onChange: (value: string) => void;
    tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
    className?: string;
    style?: React.CSSProperties;
    placeholder?: string;
    readOnly?: boolean;
    multiline?: boolean;
    allowFormatting?: boolean;
    onSelectElement?: () => void;
    onClick?: () => void;
}

export const InlineText: React.FC<InlineTextProps> = ({
    value,
    onChange,
    tagName: Tag = 'p',
    className,
    style,
    placeholder,
    readOnly = false,
    multiline = false,
    allowFormatting = false,
    onSelectElement,
    onClick
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const contentRef = useRef<any>(null);

    // Sync content when value changes from outside
    useEffect(() => {
        if (contentRef.current && !isEditing) {
            const currentContent = allowFormatting ? contentRef.current.innerHTML : contentRef.current.innerText;
            if (currentContent !== value) {
                if (allowFormatting) {
                    contentRef.current.innerHTML = value || '';
                } else {
                    contentRef.current.innerText = value || '';
                }
            }
        }
    }, [value, isEditing, allowFormatting]);

    const handleBlur = (e: React.FocusEvent) => {
        // Don't blur if we're clicking on the formatting toolbar
        if (e.relatedTarget instanceof HTMLElement && e.relatedTarget.closest('.formatting-toolbar')) {
            return;
        }

        setIsEditing(false);
        if (contentRef.current) {
            const newValue = allowFormatting ? contentRef.current.innerHTML : contentRef.current.innerText;
            if (newValue !== value) {
                onChange(newValue);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !multiline) {
            e.preventDefault();
            contentRef.current?.blur();
        }
    };

    const execCommand = (cmd: string) => {
        document.execCommand(cmd, false);
        contentRef.current?.focus();
    };

    return (
        <span className="relative inline-block group/text">
            {isEditing && allowFormatting && (
                <div className="formatting-toolbar absolute -top-10 left-0 flex items-center gap-1 bg-white border border-gray-200 shadow-xl rounded-lg p-1 z-[100] animate-in fade-in slide-in-from-bottom-2">
                    <button
                        onMouseDown={(e) => { e.preventDefault(); execCommand('bold'); }}
                        className="p-1 hover:bg-gray-100 rounded text-gray-600 transition-colors"
                        title="Negrito"
                    >
                        <Bold size={14} />
                    </button>
                    <button
                        onMouseDown={(e) => { e.preventDefault(); execCommand('italic'); }}
                        className="p-1 hover:bg-gray-100 rounded text-gray-600 transition-colors"
                        title="Itálico"
                    >
                        <Italic size={14} />
                    </button>
                    <button
                        onMouseDown={(e) => { e.preventDefault(); execCommand('underline'); }}
                        className="p-1 hover:bg-gray-100 rounded text-gray-600 transition-colors"
                        title="Sublinhado"
                    >
                        <Underline size={14} />
                    </button>
                </div>
            )}
            <Tag
                ref={contentRef}
                className={`${className || ''} ${!readOnly ? 'hover:outline hover:outline-2 hover:outline-blue-300 hover:outline-dashed cursor-text transition-all rounded px-1 -mx-1' : ''} ${isEditing ? 'outline outline-2 outline-blue-500 outline-dashed bg-white/50 z-20 relative' : ''}`}
                style={{ ...style, minWidth: '1em', display: 'inline-block', whiteSpace: multiline ? 'pre-wrap' : 'nowrap' }}
                contentEditable={!readOnly}
                onFocus={() => {
                    setIsEditing(true);
                    onSelectElement?.();
                }}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                onClick={(e) => {
                    if (readOnly && onClick) {
                        e.preventDefault();
                        onClick();
                    }
                }}
                suppressContentEditableWarning={true}
                data-placeholder={placeholder}
                dangerouslySetInnerHTML={allowFormatting ? { __html: value } : undefined}
            >
                {!allowFormatting ? value : undefined}
            </Tag>
        </span>
    );
};
