import React from 'react';

export type ElementType = 'text' | 'image' | 'container' | 'input';

export interface EditorElement {
    id: string;
    type: ElementType;
    content?: string; // text content or image URL
    x: number;
    y: number;
    width: number;
    height: number;
    styles?: React.CSSProperties;
}

export interface ContainerElement extends EditorElement {
    type: 'container';
    children: (ContainerElement | EditorElement)[];
}

export type EditorNode = EditorElement | ContainerElement;

export interface Page {
    id: string;
    name: string;
    width: number;
    height: number;
    children: EditorNode[];
}

export interface DraggableElementProps {
    element: EditorNode;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onChange: (id: string, newProps: Partial<EditorElement>) => void;
    readOnly?: boolean;
}
