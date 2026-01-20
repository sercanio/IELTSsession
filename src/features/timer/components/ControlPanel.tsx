import { Button } from '@/components/ui/button';
import { useTimerStore } from '../stores/useTimerStore';
import { Play, Pause, RotateCcw } from 'lucide-react';

export const ControlPanel = () => {
  const isRunning = useTimerStore((state) => state.isRunning);
  const selectedSectionId = useTimerStore((state) => state.selectedSectionId);
  const start = useTimerStore((state) => state.start);
  const pause = useTimerStore((state) => state.pause);
  const reset = useTimerStore((state) => state.reset);

  if (!selectedSectionId) return null;

  return (
    <div className="flex items-center justify-center gap-4 py-4">
      {!isRunning ? (
        <Button onClick={start} size="lg" className="w-32 gap-2 text-lg">
          <Play className="h-5 w-5" /> Start
        </Button>
      ) : (
        <Button onClick={pause} size="lg" variant="outline" className="w-32 gap-2 text-lg">
          <Pause className="h-5 w-5" /> Pause
        </Button>
      )}
      
      <Button onClick={reset} size="icon" variant="ghost" title="Reset">
        <RotateCcw className="h-5 w-5" />
      </Button>
    </div>
  );
};
