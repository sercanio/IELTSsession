import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TEST_SECTIONS, type SectionId } from '../types';

interface TimerState {
  selectedSectionId: SectionId | null;
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  isFinished: boolean;

  setSection: (id: SectionId) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;

  // Notification settings
  audioEnabled: boolean;
  notificationEnabled: boolean;
  toggleAudio: () => void;
  toggleNotification: () => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      selectedSectionId: 'listening',
      timeLeft: TEST_SECTIONS.listening.durationSeconds,
      totalTime: TEST_SECTIONS.listening.durationSeconds,
      isRunning: false,
      isFinished: false,

      // Notification settings
      audioEnabled: false,
      notificationEnabled: false,

      setSection: (id) => {
        const section = TEST_SECTIONS[id];
        set({
          selectedSectionId: id,
          timeLeft: section.durationSeconds,
          totalTime: section.durationSeconds,
          isRunning: false,
          isFinished: false,
        });
      },

      start: () => {
        if (get().timeLeft > 0) {
          set({ isRunning: true });
        }
      },

      pause: () => {
        set({ isRunning: false });
      },

      reset: () => {
        const { selectedSectionId } = get();
        if (selectedSectionId) {
          const section = TEST_SECTIONS[selectedSectionId];
          set({
            timeLeft: section.durationSeconds,
            totalTime: section.durationSeconds,
            isRunning: false,
            isFinished: false,
          });
        }
      },

      tick: () => {
        const { timeLeft, isRunning } = get();
        if (!isRunning) return;

        if (timeLeft > 0) {
          const newTime = timeLeft - 1;
          set({ timeLeft: newTime });

          if (newTime === 0) {
            set({ isRunning: false, isFinished: true });
          }
        } else {
          set({ isRunning: false, isFinished: true });
        }
      },

      toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),

      toggleNotification: () => set((state) => ({ notificationEnabled: !state.notificationEnabled })),
    }),
    {
      name: 'timer-storage',
      partialize: (state) => ({
        audioEnabled: state.audioEnabled,
        notificationEnabled: state.notificationEnabled,
      }),
    }
  )
);
