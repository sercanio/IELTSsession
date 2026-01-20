import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SectionSelector } from './SectionSelector';
import { useTimerStore } from '../stores/useTimerStore';
import { TEST_SECTIONS } from '../types';

describe('SectionSelector', () => {
    beforeEach(() => {
        // Reset store before each test
        useTimerStore.setState({
            selectedSectionId: null,
            timeLeft: 0,
            totalTime: 0,
            isRunning: false,
            isFinished: false,
            setSection: vi.fn((id) => useTimerStore.setState({ selectedSectionId: id })),
        });
    });

    it('renders all sections', () => {
        render(<SectionSelector />);

        Object.values(TEST_SECTIONS).forEach(section => {
            expect(screen.getByText(section.label)).toBeInTheDocument();
            expect(screen.getByText(section.description)).toBeInTheDocument();
        });
    });

    it('switches section immediately when timer is not running', () => {
        render(<SectionSelector />);

        const targetSection = Object.values(TEST_SECTIONS)[0]; // e.g., Speaking
        const card = screen.getByText(targetSection.label).closest('div[class*="border"]'); // simplistic selector for card
        // Better: click the text
        fireEvent.click(screen.getByText(targetSection.label));

        expect(useTimerStore.getState().selectedSectionId).toBe(targetSection.id);
        expect(screen.queryByText('Change Section?')).not.toBeInTheDocument();
    });

    it('shows confirmation dialog when timer is running', () => {
        // Set timer to running
        useTimerStore.setState({ isRunning: true, selectedSectionId: 'listening' });

        render(<SectionSelector />);

        const targetSection = Object.values(TEST_SECTIONS).find(s => s.id !== 'listening');
        if (!targetSection) throw new Error('No target section found');

        fireEvent.click(screen.getByText(targetSection.label));

        // Dialog should appear
        expect(screen.getByText('Change Section?')).toBeInTheDocument();
        expect(screen.getByText('The timer is currently running. Changing sections will reset the timer and lose your current progress.')).toBeInTheDocument();

        // Store should NOT have changed yet
        expect(useTimerStore.getState().selectedSectionId).toBe('listening');
    });

    it('changes section when confirmation is confirmed', () => {
        useTimerStore.setState({ isRunning: true, selectedSectionId: 'listening' });
        render(<SectionSelector />);

        const targetSection = Object.values(TEST_SECTIONS).find(s => s.id === 'reading');
        if (!targetSection) throw new Error('Target section not found');

        fireEvent.click(screen.getByText(targetSection.label));

        // Click Confirm
        const confirmButton = screen.getByText('Change Section');
        fireEvent.click(confirmButton);

        // Should have changed
        expect(useTimerStore.getState().selectedSectionId).toBe(targetSection.id);
        expect(screen.queryByText('Change Section?')).not.toBeInTheDocument();
    });

    it('does not change section when confirmation is cancelled', () => {
        useTimerStore.setState({ isRunning: true, selectedSectionId: 'listening' });
        render(<SectionSelector />);

        const targetSection = Object.values(TEST_SECTIONS).find(s => s.id === 'reading');
        if (!targetSection) throw new Error('Target section not found');

        fireEvent.click(screen.getByText(targetSection.label));

        // Click Cancel
        const cancelButton = screen.getByText('Stay Here');
        fireEvent.click(cancelButton);

        // Should remain on original
        expect(useTimerStore.getState().selectedSectionId).toBe('listening');
        expect(screen.queryByText('Change Section?')).not.toBeInTheDocument();
    });
});
