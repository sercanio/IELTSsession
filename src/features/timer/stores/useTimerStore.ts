import { create } from 'zustand';
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
}

export const useTimerStore = create<TimerState>((set, get) => ({
  selectedSectionId: null,
  timeLeft: 0,
  totalTime: 0,
  isRunning: false,
  isFinished: false,

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
}));
