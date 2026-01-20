import { SectionSelector } from './SectionSelector';
import { TimerDisplay } from './TimerDisplay';
import { ControlPanel } from './ControlPanel';
import { useTimerTicker } from '../hooks/useTimerTicker';

export const IELTSClock = () => {
  useTimerTicker();

  return (
    <div className="container mx-auto max-w-4xl p-4 min-h-screen flex flex-col">
      <header className="py-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">IELTS Simulation Timer</h1>
        <p className="text-muted-foreground">Select a section to begin your practice test</p>
      </header>

      <main className="flex-1 flex flex-col gap-8">
        <div className="bg-card rounded-xl border shadow-sm p-6">
          <TimerDisplay />
          <ControlPanel />
        </div>
        
        <SectionSelector />
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        Good luck with your exam preparation!
      </footer>
    </div>
  );
};
