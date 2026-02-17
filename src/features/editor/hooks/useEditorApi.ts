import { useEffect, useCallback } from 'react';
import type { EventLayout, SectionContent, EditorInteraction } from '../types';

interface EditorApiProps {
    layout: EventLayout;
    setLayout: (layout: EventLayout) => void;
    updateSectionContent: (sectionId: string, content: Partial<SectionContent>) => void;
    onSave: () => void;
    enabled?: boolean;
}

export const useEditorApi = ({ layout, setLayout, updateSectionContent, onSave, enabled = true }: EditorApiProps) => {
    const handleMessage = useCallback((event: MessageEvent) => {
        // In a real app, we should validate event.origin here
        const { type, payload } = event.data;

        switch (type) {
            case 'EDITOR_LOAD_LAYOUT':
                if (payload) {
                    setLayout(payload);
                    console.log('API: Layout loaded externally');
                }
                break;

            case 'EDITOR_GET_LAYOUT':
                window.parent.postMessage({
                    type: 'EDITOR_LAYOUT_DATA',
                    payload: layout
                }, '*');
                break;

            case 'EDITOR_UPDATE_SECTION':
                if (payload?.sectionId && payload?.content) {
                    updateSectionContent(payload.sectionId, payload.content);
                }
                break;

            case 'EDITOR_TRIGGER_SAVE':
                onSave();
                break;

            default:
                break;
        }
    }, [layout, setLayout, updateSectionContent, onSave]);

    useEffect(() => {
        if (!enabled) return;

        window.addEventListener('message', handleMessage);

        // Notify parent that editor is ready
        window.parent.postMessage({ type: 'EDITOR_READY' }, '*');

        return () => window.removeEventListener('message', handleMessage);
    }, [handleMessage, enabled]);

    // Send update to parent whenever layout changes (optional, for live preview in host)
    useEffect(() => {
        if (!enabled) return;

        window.parent.postMessage({
            type: 'EDITOR_LAYOUT_CHANGE',
            payload: layout
        }, '*');
    }, [layout, enabled]);

    const emitInteraction = useCallback((interaction: Omit<EditorInteraction, 'timestamp'>) => {
        if (!enabled) return;

        window.parent.postMessage({
            type: 'EDITOR_INTERACTION',
            payload: {
                ...interaction,
                timestamp: Date.now()
            }
        }, '*');
    }, [enabled]);

    return { emitInteraction };
};
