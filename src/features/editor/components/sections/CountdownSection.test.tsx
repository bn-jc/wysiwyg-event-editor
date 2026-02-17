import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CountdownSection } from './CountdownSection';
import { SECTION_TEMPLATES } from '../../utils/SectionSchemaRegistry';

const mockGlobalStyles = {
    fontFamilyTitle: 'Arial',
    fontFamilyBody: 'Arial',
    primaryColor: '#000',
    secondaryColor: '#333'
};

describe('CountdownSection', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    const getProps = (targetDate: string) => ({
        section: {
            id: 'countdown-1',
            type: 'CountdownSection' as const,
            content: {
                ...SECTION_TEMPLATES['CountdownSection'].defaultData,
                targetDate
            }
        },
        isActive: false,
        onSelect: vi.fn(),
        onUpdate: vi.fn(),
        readOnly: false,
        globalStyles: mockGlobalStyles,
        index: 0,
        device: 'desktop' as const
    });

    it('renders correctly for a future date', () => {
        // Set "now" to 2026-01-01 12:00:00
        vi.setSystemTime(new Date('2026-01-01T12:00:00'));
        // 1 day, 2 hours, 3 minutes, 4 seconds later
        const futureDate = '2026-01-02T14:03:04';

        render(<CountdownSection {...getProps(futureDate)} />);

        expect(screen.getByText('01')).toBeInTheDocument(); // Days
        expect(screen.getByText('02')).toBeInTheDocument(); // Hours
        expect(screen.getByText('03')).toBeInTheDocument(); // Minutes
        expect(screen.getByText('04')).toBeInTheDocument(); // Seconds
    });

    it('updates every second', () => {
        vi.setSystemTime(new Date('2026-01-01T12:00:00'));
        const futureDate = '2026-01-01T12:00:10'; // 10 seconds later

        render(<CountdownSection {...getProps(futureDate)} />);
        expect(screen.getByText('10')).toBeInTheDocument(); // Seconds

        act(() => {
            vi.advanceTimersByTime(1000);
        });

        expect(screen.getByText('09')).toBeInTheDocument();
    });

    it('shows custom finish message when date is reached', () => {
        vi.setSystemTime(new Date('2026-01-01T12:00:00'));
        const pastDate = '2025-12-31T12:00:00';
        const props = getProps(pastDate);
        props.section.content.finishMessage = 'Já casamos!';

        render(<CountdownSection {...props} />);
        expect(screen.getByText('Já casamos!')).toBeInTheDocument();
    });
});
