import { useEffect, useRef } from 'react';
import { useTimerStore } from '../stores/useTimerStore';

export const useTimerNotifications = () => {
    const isFinished = useTimerStore((state) => state.isFinished);
    const audioEnabled = useTimerStore((state) => state.audioEnabled);
    const notificationEnabled = useTimerStore((state) => state.notificationEnabled);

    // Ref to track if we've already notified for the current finish event
    // preventing double notifications if component re-renders
    const hasNotifiedRef = useRef(false);

    // Reset notification flag when timer is no longer finished
    useEffect(() => {
        if (!isFinished) {
            hasNotifiedRef.current = false;
        }
    }, [isFinished]);

    // Request permissions when notification setting is enabled
    useEffect(() => {
        if (notificationEnabled && 'Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, [notificationEnabled]);

    // Handle notifications when timer finishes
    useEffect(() => {
        if (isFinished && !hasNotifiedRef.current) {
            hasNotifiedRef.current = true;

            // Audio Notification
            if (audioEnabled) {
                playBeep();
            }

            // Browser Notification
            if (notificationEnabled && 'Notification' in window && Notification.permission === 'granted') {
                new Notification('IELTS Time is Up!', {
                    body: 'Your practice session has ended.',
                    icon: '/vite.svg', // Fallback to vite logo if available, otherwise default
                    requireInteraction: true,
                });
            }
        }
    }, [isFinished, audioEnabled, notificationEnabled]);
};

// Simple Audio Context helper to play a beep
const playBeep = () => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.5); // Drop to A4

        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.5);
    } catch (error) {
        console.error('Failed to play audio notification:', error);
    }
};
