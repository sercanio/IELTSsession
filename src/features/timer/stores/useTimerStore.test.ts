import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTimerStore } from './useTimerStore';
import { TEST_SECTIONS } from '../types';

describe('useTimerStore', () => {
  beforeEach(() => {
    useTimerStore.setState({
      selectedSectionId: 'listening',
      timeLeft: TEST_SECTIONS.listening.durationSeconds,
      totalTime: TEST_SECTIONS.listening.durationSeconds,
      isRunning: false,
      isFinished: false,
    });
  });

  it('should have initial state', () => {
    const state = useTimerStore.getState();
    const listeningDuration = TEST_SECTIONS.listening.durationSeconds;

    expect(state.selectedSectionId).toBe('listening');
    expect(state.timeLeft).toBe(listeningDuration);
    expect(state.totalTime).toBe(listeningDuration);
    expect(state.isRunning).toBe(false);
    expect(state.isFinished).toBe(false);
  });

  it('should set section correctly', () => {
    const sectionId = 'writing_total';
    useTimerStore.getState().setSection(sectionId);

    const state = useTimerStore.getState();
    const expectedDuration = TEST_SECTIONS[sectionId].durationSeconds;

    expect(state.selectedSectionId).toBe(sectionId);
    expect(state.timeLeft).toBe(expectedDuration);
    expect(state.totalTime).toBe(expectedDuration);
    expect(state.isRunning).toBe(false);
    expect(state.isFinished).toBe(false);
  });

  it('should start timer', () => {
    // Set a section first so we have time
    useTimerStore.getState().setSection('speaking');
    useTimerStore.getState().start();

    expect(useTimerStore.getState().isRunning).toBe(true);
  });

  it('should not start timer if time is 0', () => {
    useTimerStore.setState({ timeLeft: 0 });
    useTimerStore.getState().start();

    expect(useTimerStore.getState().isRunning).toBe(false);
  });

  it('should pause timer', () => {
    useTimerStore.getState().setSection('speaking');
    useTimerStore.getState().start();
    useTimerStore.getState().pause();

    expect(useTimerStore.getState().isRunning).toBe(false);
  });

  it('should reset timer', () => {
    const sectionId = 'listening';
    useTimerStore.getState().setSection(sectionId);
    useTimerStore.getState().start();

    // Simulate some time passing
    useTimerStore.getState().tick();
    useTimerStore.getState().tick();

    expect(useTimerStore.getState().timeLeft).toBeLessThan(TEST_SECTIONS[sectionId].durationSeconds);

    useTimerStore.getState().reset();

    const state = useTimerStore.getState();
    expect(state.timeLeft).toBe(TEST_SECTIONS[sectionId].durationSeconds);
    expect(state.isRunning).toBe(false);
    expect(state.isFinished).toBe(false);
  });

  it('should tick and decrease time', () => {
    useTimerStore.setState({ timeLeft: 10, isRunning: true });

    useTimerStore.getState().tick();

    expect(useTimerStore.getState().timeLeft).toBe(9);
  });

  it('should stop and finish when time reaches 0', () => {
    useTimerStore.setState({ timeLeft: 1, isRunning: true });

    useTimerStore.getState().tick();

    const state = useTimerStore.getState();
    expect(state.timeLeft).toBe(0);
    expect(state.isRunning).toBe(false);
    expect(state.isFinished).toBe(true);
  });

  it('should not tick if not running', () => {
    useTimerStore.setState({ timeLeft: 10, isRunning: false });

    useTimerStore.getState().tick();

    expect(useTimerStore.getState().timeLeft).toBe(10);
  });
});
