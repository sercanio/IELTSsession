import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTimerStore } from './useTimerStore';

describe('useTimerStore Persistence', () => {
    beforeEach(() => {
        localStorage.clear();
        useTimerStore.persist.clearStorage();
    });

    it('should persist audioEnabled setting', () => {
        // Initial state
        expect(useTimerStore.getState().audioEnabled).toBe(false);

        // Toggle audio
        useTimerStore.getState().toggleAudio();
        expect(useTimerStore.getState().audioEnabled).toBe(true);

        // Check localStorage
        const storageVal = localStorage.getItem('timer-storage');
        expect(storageVal).not.toBeNull();

        const parsed = JSON.parse(storageVal!);
        expect(parsed.state.audioEnabled).toBe(true);
        expect(parsed.state.notificationEnabled).toBe(false); // Default
    });

    it('should persist notificationEnabled setting', () => {
        // Initial state
        expect(useTimerStore.getState().notificationEnabled).toBe(false);

        // Toggle notification
        useTimerStore.getState().toggleNotification();
        expect(useTimerStore.getState().notificationEnabled).toBe(true);

        // Check localStorage
        const storageVal = localStorage.getItem('timer-storage');
        expect(storageVal).not.toBeNull();

        const parsed = JSON.parse(storageVal!);
        expect(parsed.state.notificationEnabled).toBe(true);
    });

    it('should not persist non-partialized state', () => {
        useTimerStore.getState().setSection('writing_total');

        const storageVal = localStorage.getItem('timer-storage');
        expect(storageVal).not.toBeNull();

        const parsed = JSON.parse(storageVal!);
        // These fields should NOT be in the persisted state
        expect(parsed.state.selectedSectionId).toBeUndefined();
        expect(parsed.state.timeLeft).toBeUndefined();
    });
});
