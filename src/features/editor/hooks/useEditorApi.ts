import { useEffect, useCallback } from 'react';
import type { EventLayout, SectionContent, EditorInteraction } from '../types';

interface EditorApiProps {
    layout: EventLayout;
    setLayout: (layout: EventLayout) => void;
    addSection: (type: any) => void;
    deleteSection: (id: string) => void;
    updateSectionContent: (sectionId: string, content: Partial<SectionContent>) => void;
    moveSection: (index: number, direction: 'up' | 'down') => void;
    setExternalFieldValue: (sectionId: string, fieldKey: string, value: any) => void;
    setExternalFieldStatus: (sectionId: string, fieldKey: string, status: any) => void;
    updateLanguage: (language: string) => void;
    onSave: () => void;
    enabled?: boolean;
}

declare global {
    interface Window {
        editorApi?: {
            addSection: (type: any) => void;
            removeSection: (id: string) => void;
            updateSection: (sectionId: string, content: any) => void;
            moveSection: (sectionId: string, direction: 'up' | 'down') => void;
            setFieldValue: (sectionId: string, fieldKey: string, value: any) => void;
            setFieldStatus: (sectionId: string, fieldKey: string, status: any) => void;
            setLanguage: (language: string) => void;
            getFieldValue: (sectionId: string, fieldKey: string) => any;
            getLayout: () => EventLayout;
            save: () => void;
            externalInputState?: {
                values: Record<string, Record<string, any>>;
                statuses: Record<string, Record<string, any>>;
            };
            setLayout: (layout: EventLayout) => void;
        };
    }
}

export const useEditorApi = ({
    layout,
    setLayout,
    addSection,
    deleteSection,
    updateSectionContent,
    moveSection,
    setExternalFieldValue,
    setExternalFieldStatus,
    updateLanguage,
    onSave,
    enabled = true
}: EditorApiProps) => {
    const handleMessage = useCallback((event: MessageEvent) => {
        // In a real app, we should validate event.origin here
        const { type, payload } = event.data;

        switch (type) {
            case 'EDITOR_SET_LANGUAGE':
                if (payload?.language) {
                    updateLanguage(payload.language);
                }
                break;

            case 'EDITOR_SET_LAYOUT':
                if (payload) {
                    setLayout(payload);
                    console.log('API: Layout updated externally');
                }
                break;

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

            case 'EDITOR_ADD_SECTION':
                if (payload?.type) {
                    addSection(payload.type);
                }
                break;

            case 'EDITOR_REMOVE_SECTION':
                if (payload?.sectionId) {
                    deleteSection(payload.sectionId);
                }
                break;

            case 'EDITOR_UPDATE_SECTION':
                if (payload?.sectionId && payload?.content) {
                    updateSectionContent(payload.sectionId, payload.content);
                }
                break;

            case 'EDITOR_MOVE_SECTION':
                if (payload?.sectionId && payload?.direction) {
                    const index = layout.sections.findIndex(s => s.id === payload.sectionId);
                    if (index !== -1) {
                        moveSection(index, payload.direction);
                    }
                }
                break;

            case 'EDITOR_SET_FIELD_VALUE':
                if (payload?.sectionId && payload?.fieldKey) {
                    setExternalFieldValue(payload.sectionId, payload.fieldKey, payload.value);
                }
                break;

            case 'EDITOR_SET_FIELD_STATUS':
                if (payload?.sectionId && payload?.fieldKey) {
                    setExternalFieldStatus(payload.sectionId, payload.fieldKey, payload.status);
                }
                break;

            case 'EDITOR_GET_FIELD_VALUE':
                if (payload?.sectionId && payload?.fieldKey) {
                    const value = window.editorApi?.getFieldValue
                        ? window.editorApi.getFieldValue(payload.sectionId, payload.fieldKey)
                        : undefined;

                    window.parent.postMessage({
                        type: 'EDITOR_FIELD_VALUE_RESPONSE',
                        payload: { sectionId: payload.sectionId, fieldKey: payload.fieldKey, value }
                    }, '*');
                }
                break;

            case 'EDITOR_TRIGGER_SAVE':
                onSave();
                break;

            default:
                break;
        }
    }, [layout, setLayout, addSection, deleteSection, updateSectionContent, moveSection, setExternalFieldValue, setExternalFieldStatus, onSave]);

    useEffect(() => {
        if (!enabled) return;

        window.editorApi = {
            addSection,
            removeSection: deleteSection,
            updateSection: updateSectionContent,
            moveSection: (sectionId, direction) => {
                const index = layout.sections.findIndex(s => s.id === sectionId);
                if (index !== -1) moveSection(index, direction);
            },
            setFieldValue: setExternalFieldValue,
            setFieldStatus: setExternalFieldStatus,
            setLanguage: updateLanguage,
            getFieldValue: (sectionId: string, fieldKey: string) => {
                const values = window.editorApi?.externalInputState?.values || {};
                return values[sectionId]?.[fieldKey];
            },
            getLayout: () => layout,
            setLayout,
            save: onSave,
            externalInputState: (window as any).externalInputState // This should probably be passed from props or state
        };

        return () => {
            delete window.editorApi;
        };
    }, [layout, addSection, deleteSection, updateSectionContent, moveSection, setExternalFieldValue, setExternalFieldStatus, updateLanguage, onSave, enabled]);

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
