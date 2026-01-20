import { useTimerStore } from '../stores/useTimerStore';
import { Progress } from '@/components/ui/progress';

export const TimerDisplay = () => {
  const timeLeft = useTimerStore((state) => state.timeLeft);
  const totalTime = useTimerStore((state) => state.totalTime);
  const selectedSectionId = useTimerStore((state) => state.selectedSectionId);
  const isFinished = useTimerStore((state) => state.isFinished);

  if (!selectedSectionId) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Select a section to start
      </div>
    );
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      <div className="text-9xl font-mono font-bold tracking-tighter tabular-nums text-foreground">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <Progress value={progress} className="h-4 w-full max-w-md" />
      {isFinished && <div className="text-red-500 font-bold text-xl animate-pulse">Time's Up!</div>}
    </div>
  );
};
