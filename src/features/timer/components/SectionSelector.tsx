import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { TEST_SECTIONS, type SectionId } from '../types';
import { useTimerStore } from '../stores/useTimerStore';
import { cn } from '@/lib/utils';

export const SectionSelector = () => {
  const selectedSectionId = useTimerStore((state) => state.selectedSectionId);
  const isRunning = useTimerStore((state) => state.isRunning);
  const setSection = useTimerStore((state) => state.setSection);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingSectionId, setPendingSectionId] = useState<SectionId | null>(null);

  const handleSectionClick = (sectionId: SectionId) => {
    // If attempting to click the same section, do nothing
    if (selectedSectionId === sectionId) return;

    if (isRunning) {
      setPendingSectionId(sectionId);
      setIsDialogOpen(true);
    } else {
      setSection(sectionId);
    }
  };

  const handleConfirm = () => {
    if (pendingSectionId) {
      setSection(pendingSectionId);
    }
    setIsDialogOpen(false);
    setPendingSectionId(null);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setPendingSectionId(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {Object.values(TEST_SECTIONS).map((section) => (
          <Card
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
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

      <ConfirmationDialog
        isOpen={isDialogOpen}
        title="Change Section?"
        description="The timer is currently running. Changing sections will reset the timer and lose your current progress."
        confirmText="Change Section"
        cancelText="Stay Here"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
};
