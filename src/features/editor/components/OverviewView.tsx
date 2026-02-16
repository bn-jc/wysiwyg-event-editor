import React from 'react';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { CanvasRenderer } from '../CanvasRenderer';
import type { EditorNode, EditorElement } from '../types';

interface OverviewViewProps {
    nodes: EditorNode[];
    selectedIds: Set<string>;
    onElementSelect: (id: string, multiSelect: boolean) => void;
    onElementUpdate: (id: string, newProps: Partial<EditorElement>) => void;
    onElementDragDelta: (id: string, deltaX: number, deltaY: number) => void;
    pageStyles?: React.CSSProperties;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
    nodes,
    selectedIds,
    onElementSelect,
    onElementUpdate,
    onElementDragDelta,
    pageStyles
}) => {
    return (
        <div className="flex gap-16 items-start pb-20 max-w-full">
            <div className="flex flex-col items-center gap-6">
                <span className="text-xs font-bold text-gray-400 tracking-widest flex items-center gap-2">
                    <Monitor size={14} /> DESKTOP (800PX)
                </span>
                <div
                    className="p-4 rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
                    style={pageStyles}
                >
                    <CanvasRenderer
                        elements={nodes}
                        selectedIds={selectedIds}
                        onElementSelect={onElementSelect}
                        onElementUpdate={onElementUpdate}
                        onElementDragDelta={onElementDragDelta}
                        readOnly={true}
                        baseWidth={800}
                        device="desktop"
                        pageStyles={pageStyles}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center gap-6">
                <span className="text-xs font-bold text-gray-400 tracking-widest flex items-center gap-2">
                    <Tablet size={14} /> TABLET (600PX)
                </span>
                <div
                    className="p-4 rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
                    style={pageStyles}
                >
                    <CanvasRenderer
                        elements={nodes}
                        selectedIds={selectedIds}
                        onElementSelect={onElementSelect}
                        onElementUpdate={onElementUpdate}
                        onElementDragDelta={onElementDragDelta}
                        readOnly={true}
                        baseWidth={600}
                        device="tablet"
                        pageStyles={pageStyles}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center gap-6">
                <span className="text-xs font-bold text-gray-400 tracking-widest flex items-center gap-2">
                    <Smartphone size={14} /> MOBILE (375PX)
                </span>
                <div
                    className="p-4 rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
                    style={pageStyles}
                >
                    <CanvasRenderer
                        elements={nodes}
                        selectedIds={selectedIds}
                        onElementSelect={onElementSelect}
                        onElementUpdate={onElementUpdate}
                        onElementDragDelta={onElementDragDelta}
                        readOnly={true}
                        baseWidth={375}
                        device="mobile"
                        pageStyles={pageStyles}
                    />
                </div>
            </div>
        </div>
    );
};
