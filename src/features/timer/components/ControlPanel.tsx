import { Button } from '@/components/ui/button';
import { useTimerStore } from '../stores/useTimerStore';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Bell, BellOff } from 'lucide-react';

export const ControlPanel = () => {
  const isRunning = useTimerStore((state) => state.isRunning);
  const selectedSectionId = useTimerStore((state) => state.selectedSectionId);
  const start = useTimerStore((state) => state.start);
  const pause = useTimerStore((state) => state.pause);
  const reset = useTimerStore((state) => state.reset);

  const audioEnabled = useTimerStore((state) => state.audioEnabled);
  const notificationEnabled = useTimerStore((state) => state.notificationEnabled);
  const toggleAudio = useTimerStore((state) => state.toggleAudio);
  const toggleNotification = useTimerStore((state) => state.toggleNotification);

  if (!selectedSectionId) return null;

  return (
    <div className="flex flex-col items-center w-full">
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

      <div className="flex items-center justify-center gap-2 mt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleAudio}
          className={audioEnabled ? "text-primary" : "text-muted-foreground"}
          title={audioEnabled ? "Mute start/end sounds" : "Enable start/end sounds"}
        >
          {audioEnabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
          {audioEnabled ? "Sound On" : "Sound Off"}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleNotification}
          className={notificationEnabled ? "text-primary" : "text-muted-foreground"}
          title={notificationEnabled ? "Disable browser notifications" : "Enable browser notifications"}
        >
          {notificationEnabled ? <Bell className="h-4 w-4 mr-2" /> : <BellOff className="h-4 w-4 mr-2" />}
          {notificationEnabled ? "Notify On" : "Notify Off"}
        </Button>
      </div>
    </div>
  );
};
