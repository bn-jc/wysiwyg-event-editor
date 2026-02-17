import { describe, it, expect } from 'vitest';
import { createSection, SECTION_TEMPLATES } from './SectionSchemaRegistry';

describe('SectionSchemaRegistry', () => {
    it('should have all expected templates registered', () => {
        const sectionTypes = Object.keys(SECTION_TEMPLATES);
        expect(sectionTypes).toContain('SplashSection');
        expect(sectionTypes).toContain('HeroSection');
        expect(sectionTypes).toContain('AgendaSection');
        expect(sectionTypes).toContain('RSVPSection');
        expect(sectionTypes).toContain('GuestbookSection');
        expect(sectionTypes).toContain('GiftsSection');
    });

    it('should create a valid gifts section', () => {
        const section = createSection('GiftsSection');
        expect(section.type).toBe('GiftsSection');
        expect(section.content.title).toBe('Lista de Presentes');
        expect(section.content.giftItems).toHaveLength(2);
        expect(section.content.bankDetails).toBeDefined();
    });

    it('should create a valid section from a template', () => {
        const section = createSection('HeroSection');

        expect(section).toBeDefined();
        expect(section.id).toBeTypeOf('string');
        expect(section.id).toMatch(/^section-/);
        expect(section.type).toBe('HeroSection');
        expect(section.content).toEqual(SECTION_TEMPLATES['HeroSection'].defaultData);
        // Styles should be undefined or empty by default if not tailored per template
        expect(section.styles).toBeUndefined();
    });

    it('should create a valid guestbook section', () => {
        const section = createSection('GuestbookSection');
        expect(section.type).toBe('GuestbookSection');
        expect(section.content.title).toBe('Deixe uma Mensagem');
        expect(section.content.messages).toHaveLength(2);
    });

    it('should return an empty object for unknown template', () => {
        // @ts-ignore - Testing invalid input
        const section = createSection('unknown-template');

        expect(section).toBeDefined();
        expect(section.type).toBe('unknown-template');
        expect(section.content).toEqual({});
    });

    it('should generate unique IDs for multiple sections', () => {
        const s1 = createSection('HeroSection');
        const s2 = createSection('HeroSection');
        expect(s1.id).not.toBe(s2.id);
    });
});
