import React from 'react';
import { cn } from '@/utils/cn';
import { CanvasRenderer } from '../CanvasRenderer';
import type { EditorNode, EditorElement, DeviceType } from '../types';

interface MainEditorViewProps {
    nodes: EditorNode[];
    selectedIds: Set<string>;
    onElementSelect: (id: string, multiSelect: boolean) => void;
    onElementUpdate: (id: string, newProps: Partial<EditorElement>) => void;
    onElementDragDelta: (id: string, deltaX: number, deltaY: number) => void;
    handleCanvasClick: (e: React.MouseEvent) => void;
    isPreviewOnly: boolean;
    isSplitView: boolean;
    device: DeviceType;
    pageWidth: number;
    pageHeight: number;
    pageStyles?: React.CSSProperties;
}

export const MainEditorView: React.FC<MainEditorViewProps> = ({
    nodes,
    selectedIds,
    onElementSelect,
    onElementUpdate,
    onElementDragDelta,
    handleCanvasClick,
    isPreviewOnly,
    isSplitView,
    device,
    pageWidth,
    pageHeight,
    pageStyles
}) => {
    return (
        <div className={cn(
            "flex items-start transition-all duration-700 ease-in-out w-full max-w-full",
            isSplitView ? "gap-12" : "gap-0"
        )}>
            {!isPreviewOnly && (
                <div className="flex-1 min-w-0 flex flex-col gap-6 transition-all duration-500 overflow-hidden">
                    <div className="flex items-center justify-between px-2">
                        <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
                            Designer Canvas
                        </span>
                    </div>
                    <div className={cn(
                        "rounded-[40px] shadow-2xl shadow-gray-200 border border-gray-100 overflow-hidden flex justify-center mx-auto transition-all duration-500 w-full bg-white",
                        device === 'mobile' ? "max-w-[375px] aspect-[9/16]" : "max-w-[768px] aspect-[3/4]"
                    )}>
                        <div
                            className="relative w-full h-full flex items-center justify-center overflow-hidden"
                            onClick={handleCanvasClick}
                            style={pageStyles}
                        >
                            <CanvasRenderer
                                elements={nodes}
                                selectedIds={selectedIds}
                                onElementSelect={onElementSelect}
                                onElementUpdate={onElementUpdate}
                                onElementDragDelta={onElementDragDelta}
                                readOnly={false}
                                baseWidth={pageWidth}
                                pageHeight={pageHeight}
                                device={device}
                                pageStyles={pageStyles}
                            />
                        </div>
                    </div>
                </div>
            )}

            {isSplitView && (
                <div className="w-px h-[800px] bg-gradient-to-b from-transparent via-gray-200 to-transparent self-center opacity-50 flex-shrink-0" />
            )}

            {(isSplitView || isPreviewOnly) && (
                <div className="flex-1 min-w-0 flex flex-col gap-6 animate-in fade-in slide-in-from-right-8 duration-700 max-w-full overflow-hidden">
                    <div className="flex items-center justify-between px-2">
                        <span className="text-[10px] font-black tracking-[0.2em] text-blue-600/60 uppercase">
                            Live Preview Mode
                        </span>
                        <div className="flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/20" />
                        </div>
                    </div>
                    <div className={cn(
                        "rounded-[48px] shadow-2xl shadow-blue-500/5 border border-blue-50/50 backdrop-blur-sm overflow-hidden flex justify-center mx-auto transition-all duration-500 w-full bg-white",
                        device === 'mobile' ? "max-w-[375px] aspect-[9/16]" : "max-w-[768px] aspect-[3/4]"
                    )}>
                        <div
                            className="w-full h-full flex items-center justify-center"
                            style={pageStyles}
                        >
                            <CanvasRenderer
                                elements={nodes}
                                selectedIds={new Set()}
                                onElementSelect={() => { }}
                                readOnly={true}
                                baseWidth={pageWidth}
                                pageHeight={pageHeight}
                                device={device}
                                pageStyles={pageStyles}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
