import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TEST_SECTIONS } from '../types';
import { useTimerStore } from '../stores/useTimerStore';
import { cn } from '@/lib/utils';

export const SectionSelector = () => {
  const selectedSectionId = useTimerStore((state) => state.selectedSectionId);
  const setSection = useTimerStore((state) => state.setSection);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {Object.values(TEST_SECTIONS).map((section) => (
        <Card 
          key={section.id}
          onClick={() => setSection(section.id)}
          className={cn(
            "cursor-pointer transition-all hover:scale-105",
            selectedSectionId === section.id 
              ? "border-primary ring-2 ring-primary bg-accent" 
              : "hover:bg-accent/50"
          )}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className={cn("w-3 h-3 rounded-full", section.color)} />
              {section.label}
            </CardTitle>
            <CardDescription>{section.description}</CardDescription>
            <div className="text-xs font-mono text-muted-foreground mt-2">
              {section.durationSeconds / 60} minutes
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};
