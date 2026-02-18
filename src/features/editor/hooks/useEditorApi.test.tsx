import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useEditorApi } from './useEditorApi';

describe('useEditorApi', () => {
    const mockSetLayout = vi.fn();
    const mockUpdateSectionContent = vi.fn();
    const mockDeleteSection = vi.fn();
    const mockOnSave = vi.fn();
    const mockAddSection = vi.fn();
    const mockMoveSection = vi.fn();
    const mockSetExternalFieldValue = vi.fn();
    const mockSetExternalFieldStatus = vi.fn();

    const props = {
        layout: { sections: [], theme: 'light', globalStyles: {} } as any,
        setLayout: mockSetLayout,
        updateSectionContent: mockUpdateSectionContent,
        onSave: mockOnSave,
        addSection: mockAddSection,
        deleteSection: mockDeleteSection,
        moveSection: mockMoveSection,
        setExternalFieldValue: mockSetExternalFieldValue,
        setExternalFieldStatus: mockSetExternalFieldStatus,
        enabled: true
    };

    beforeEach(() => {
        vi.clearAllMocks();
        // Clear global window.editorApi
        if (typeof window !== 'undefined') {
            delete (window as any).editorApi;
        }
    });

    it('should expose window.editorApi when enabled', () => {
        renderHook(() => useEditorApi(props));
        expect((window as any).editorApi).toBeDefined();
        expect((window as any).editorApi.addSection).toBeDefined();
        expect((window as any).editorApi.setFieldValue).toBeDefined();
    });

    it('should call addSection when window.editorApi.addSection is called', () => {
        renderHook(() => useEditorApi(props));
        (window as any).editorApi.addSection('HeroSection');
        expect(mockAddSection).toHaveBeenCalledWith('HeroSection');
    });

    it('should handle EDITOR_ADD_SECTION postMessage', () => {
        renderHook(() => useEditorApi(props));

        const messageEvent = new MessageEvent('message', {
            data: { type: 'EDITOR_ADD_SECTION', payload: { type: 'HeroSection' } }
        });
        window.dispatchEvent(messageEvent);

        expect(mockAddSection).toHaveBeenCalledWith('HeroSection');
    });

    it('should handle EDITOR_REMOVE_SECTION postMessage', () => {
        renderHook(() => useEditorApi(props));

        const messageEvent = new MessageEvent('message', {
            data: { type: 'EDITOR_REMOVE_SECTION', payload: { sectionId: 'section-1' } }
        });
        window.dispatchEvent(messageEvent);

        expect(mockDeleteSection).toHaveBeenCalledWith('section-1');
    });

    it('should handle EDITOR_UPDATE_SECTION postMessage', () => {
        renderHook(() => useEditorApi(props));

        const messageEvent = new MessageEvent('message', {
            data: { type: 'EDITOR_UPDATE_SECTION', payload: { sectionId: 'section-1', content: { title: 'New' } } }
        });
        window.dispatchEvent(messageEvent);

        expect(mockUpdateSectionContent).toHaveBeenCalledWith('section-1', { title: 'New' });
    });

    it('should handle EDITOR_MOVE_SECTION postMessage', () => {
        const propsWithSection = {
            ...props,
            layout: {
                sections: [{ id: 'section-1', type: 'HeroSection' }],
                theme: 'light',
                globalStyles: {}
            } as any
        };
        renderHook(() => useEditorApi(propsWithSection));

        const messageEvent = new MessageEvent('message', {
            data: { type: 'EDITOR_MOVE_SECTION', payload: { sectionId: 'section-1', direction: 'up' } }
        });
        window.dispatchEvent(messageEvent);

        expect(mockMoveSection).toHaveBeenCalledWith(0, 'up');
    });

    it('should handle EDITOR_SET_FIELD_VALUE postMessage', () => {
        renderHook(() => useEditorApi(props));

        const messageEvent = new MessageEvent('message', {
            data: { type: 'EDITOR_SET_FIELD_VALUE', payload: { sectionId: 'section-1', fieldKey: 'name', value: 'John' } }
        });
        window.dispatchEvent(messageEvent);

        expect(mockSetExternalFieldValue).toHaveBeenCalledWith('section-1', 'name', 'John');
    });

    it('should handle EDITOR_SET_FIELD_STATUS postMessage', () => {
        renderHook(() => useEditorApi(props));

        const messageEvent = new MessageEvent('message', {
            data: {
                type: 'EDITOR_SET_FIELD_STATUS', payload: { sectionId: 'section-1', fieldKey: 'name', status: { disabled: true } }
            }
        });
        window.dispatchEvent(messageEvent);

        expect(mockSetExternalFieldStatus).toHaveBeenCalledWith('section-1', 'name', { disabled: true });
    });

    it('should handle EDITOR_GET_FIELD_VALUE postMessage and post response', () => {
        const spy = vi.spyOn(window.parent, 'postMessage');

        renderHook(() => useEditorApi(props as any));

        // Mock getFieldValue response
        (window as any).editorApi.getFieldValue = vi.fn().mockReturnValue('John');

        const messageEvent = new MessageEvent('message', {
            data: { type: 'EDITOR_GET_FIELD_VALUE', payload: { sectionId: 'section-1', fieldKey: 'name' } }
        });
        window.dispatchEvent(messageEvent);

        expect(spy).toHaveBeenCalledWith(
            expect.objectContaining({
                type: 'EDITOR_FIELD_VALUE_RESPONSE',
                payload: { sectionId: 'section-1', fieldKey: 'name', value: 'John' }
            }),
            '*'
        );
    });
});
