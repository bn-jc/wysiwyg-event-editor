import { describe, it, expect } from 'vitest';
import { createSection, SECTION_TEMPLATES } from './SectionSchemaRegistry';

describe('SectionSchemaRegistry', () => {
    it('should have all expected templates registered', () => {
        const templateIds = Object.keys(SECTION_TEMPLATES);
        expect(templateIds).toContain('splash-01');
        expect(templateIds).toContain('hero-01');
        expect(templateIds).toContain('agenda-01');
        expect(templateIds).toContain('rsvp-01');
    });

    it('should create a valid section from a template', () => {
        const section = createSection('hero-01');

        expect(section).toBeDefined();
        expect(section.id).toBeTypeOf('string');
        expect(section.id).toMatch(/^section-/);
        expect(section.templateId).toBe('hero-01');
        expect(section.content).toEqual(SECTION_TEMPLATES['hero-01'].defaultData);
        // Styles should be undefined or empty by default if not tailored per template
        expect(section.styles).toBeUndefined();
    });

    it('should return an empty object for unknown template', () => {
        // @ts-ignore - Testing invalid input
        const section = createSection('unknown-template');

        expect(section).toBeDefined();
        expect(section.templateId).toBe('unknown-template');
        expect(section.content).toEqual({});
    });

    it('should generate unique IDs for multiple sections', () => {
        const s1 = createSection('hero-01');
        const s2 = createSection('hero-01');
        expect(s1.id).not.toBe(s2.id);
    });
});
