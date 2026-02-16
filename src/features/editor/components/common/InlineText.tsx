import React, { useState, useEffect, useRef } from 'react';

interface InlineTextProps {
    value: string;
    onChange: (value: string) => void;
    tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
    className?: string;
    style?: React.CSSProperties;
    placeholder?: string;
    readOnly?: boolean;
}

export const InlineText: React.FC<InlineTextProps> = ({
    value,
    onChange,
    tagName: Tag = 'p',
    className,
    style,
    placeholder,
    readOnly = false
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const contentRef = useRef<any>(null);

    // Sync content when value changes from outside (e.g. initial load or property panel update)
    // But ONLY if we are not currently editing to avoid cursor jumping
    useEffect(() => {
        if (contentRef.current && !isEditing && contentRef.current.innerText !== value) {
            contentRef.current.innerText = value;
        }
    }, [value, isEditing]);

    const handleBlur = () => {
        setIsEditing(false);
        if (contentRef.current) {
            const newValue = contentRef.current.innerText;
            if (newValue !== value) {
                onChange(newValue);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            contentRef.current?.blur();
        }
    };

    return (
        <Tag
            ref={contentRef}
            className={`${className || ''} ${!readOnly ? 'hover:outline hover:outline-2 hover:outline-blue-300 hover:outline-dashed cursor-text transition-all rounded px-1 -mx-1' : ''} ${isEditing ? 'outline outline-2 outline-blue-500 outline-dashed bg-white/50 z-20 relative' : ''}`}
            style={{ ...style, minWidth: '1em', display: 'inline-block' }}
            contentEditable={!readOnly}
            onFocus={() => setIsEditing(true)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            suppressContentEditableWarning={true}
            data-placeholder={placeholder}
        >
            {value}
        </Tag>
    );
};
