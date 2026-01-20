import { useEffect } from 'react';
import { useTimerStore } from '../stores/useTimerStore';

export const useTimerTicker = () => {
  const isRunning = useTimerStore((state) => state.isRunning);
  const tick = useTimerStore((state) => state.tick);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, tick]);
};
