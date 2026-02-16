import React from 'react';
import type { EditorNode } from './types';
import { ChevronRight, ChevronDown, Box, Type, Image as ImageIcon, Layers } from 'lucide-react';
import { cn } from '@/utils/cn';

interface LayersPanelProps {
    nodes: EditorNode[];
    selectedIds: Set<string>;
    onSelect: (id: string, multiSelect: boolean) => void;
}

const LayerItem: React.FC<{
    node: EditorNode;
    selectedIds: Set<string>;
    onSelect: (id: string, multiSelect: boolean) => void;
    depth?: number;
}> = ({ node, selectedIds, onSelect, depth = 0 }) => {
    const [isExpanded, setIsExpanded] = React.useState(true);
    const isContainer = node.type === 'container';
    const hasChildren = isContainer && (node as any).children && (node as any).children.length > 0;
    const isSelected = selectedIds.has(node.id);

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    const getIcon = () => {
        switch (node.type) {
            case 'container': return <Box size={14} />;
            case 'text': return <Type size={14} />;
            case 'image': return <ImageIcon size={14} />;
            default: return <Layers size={14} />;
        }
    };

    return (
        <div className="flex flex-col select-none">
            <div
                className={cn(
                    "flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-gray-100 text-sm",
                    isSelected && "bg-blue-50 text-blue-600 hover:bg-blue-100"
                )}
                style={{ paddingLeft: `${depth * 12 + 8}px` }}
                onClick={() => onSelect(node.id, false)}
            >
                <div
                    className={cn(
                        "p-0.5 rounded hover:bg-gray-200 text-gray-500",
                        !hasChildren && "invisible"
                    )}
                    onClick={hasChildren ? handleToggle : undefined}
                >
                    {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                </div>

                <span className="text-gray-500">
                    {getIcon()}
                </span>

                <span className="truncate flex-1">
                    {node.type === 'text' && (node as any).content ?
                        ((node as any).content.length > 15 ? (node as any).content.substring(0, 15) + '...' : (node as any).content)
                        : node.type
                    }
                </span>
            </div>

            {isExpanded && hasChildren && (node as any).children.map((child: EditorNode) => (
                <LayerItem
                    key={child.id}
                    node={child}
                    selectedIds={selectedIds}
                    onSelect={onSelect}
                    depth={depth + 1}
                />
            ))}
        </div>
    );
};

export const LayersPanel: React.FC<LayersPanelProps> = ({ nodes, selectedIds, onSelect }) => {
    return (
        <div className="flex flex-col h-full bg-white border-r border-gray-200 w-64 flex-shrink-0">
            <div className="p-3 border-b border-gray-200 font-medium text-sm flex items-center gap-2 text-gray-700">
                <Layers size={16} />
                Layers
            </div>
            <div className="flex-1 overflow-y-auto py-2">
                {nodes.length === 0 ? (
                    <div className="p-4 text-center text-xs text-gray-400">
                        No elements added yet
                    </div>
                ) : (
                    nodes.map(node => (
                        <LayerItem
                            key={node.id}
                            node={node}
                            selectedIds={selectedIds}
                            onSelect={onSelect}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
