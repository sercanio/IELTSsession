import { renderHook, act } from '@testing-library/react';
import { useTimerTicker } from './useTimerTicker';
import { useTimerStore } from '../stores/useTimerStore';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useTimerTicker', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    act(() => {
      useTimerStore.setState({ isRunning: false, tick: vi.fn() });
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should not start interval if not running', () => {
    renderHook(() => useTimerTicker());
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    const tickSpy = vi.fn();
    act(() => {
        useTimerStore.setState({ tick: tickSpy });
    });

    renderHook(() => useTimerTicker());

    act(() => {
        vi.advanceTimersByTime(3000);
    });
    expect(tickSpy).not.toHaveBeenCalled();
  });

  it('should start interval and call tick when running', () => {
    const tickSpy = vi.fn();
    act(() => {
        useTimerStore.setState({ isRunning: true, tick: tickSpy });
    });

    renderHook(() => useTimerTicker());

    act(() => {
        vi.advanceTimersByTime(1000);
    });
    expect(tickSpy).toHaveBeenCalledTimes(1);

    act(() => {
        vi.advanceTimersByTime(2000);
    });
    expect(tickSpy).toHaveBeenCalledTimes(3);
  });

  it('should stop interval when isRunning becomes false', () => {
    const tickSpy = vi.fn();
    act(() => {
        useTimerStore.setState({ isRunning: true, tick: tickSpy });
    });

    renderHook(() => useTimerTicker());

    act(() => {
        vi.advanceTimersByTime(1000);
    });
    expect(tickSpy).toHaveBeenCalledTimes(1);

    act(() => {
      useTimerStore.setState({ isRunning: false });
    });
    
    act(() => {
        vi.advanceTimersByTime(1000);
    });
    
    expect(tickSpy).toHaveBeenCalledTimes(1);
  });
  
  it('should clear interval on unmount', () => {
    const tickSpy = vi.fn();
    act(() => {
        useTimerStore.setState({ isRunning: true, tick: tickSpy });
    });

    const { unmount } = renderHook(() => useTimerTicker());

    act(() => {
        vi.advanceTimersByTime(1000);
    });
    expect(tickSpy).toHaveBeenCalledTimes(1);

    unmount();

    act(() => {
        vi.advanceTimersByTime(1000);
    });
    expect(tickSpy).toHaveBeenCalledTimes(1);
  });
});
