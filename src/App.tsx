import { IELTSClock } from './features/timer';
import { ModeToggle } from "@/components/mode-toggle"

function App() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <IELTSClock />
    </div>
  );
}

export default App;