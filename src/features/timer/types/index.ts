export type SectionId = 'listening' | 'reading' | 'writing_task_1' | 'writing_task_2' | 'writing_total' | 'speaking';

export interface TestSection {
  id: SectionId;
  label: string;
  durationSeconds: number;
  color: string;
  description: string;
}

export const TEST_SECTIONS: Record<SectionId, TestSection> = {
  listening: {
    id: 'listening',
    label: 'Listening',
    durationSeconds: 30 * 60,
    color: 'bg-blue-500',
    description: '4 recordings, 40 questions'
  },
  reading: {
    id: 'reading',
    label: 'Reading',
    durationSeconds: 60 * 60,
    color: 'bg-emerald-500',
    description: '3 texts, 40 questions'
  },
  writing_task_1: {
    id: 'writing_task_1',
    label: 'Writing Task 1',
    durationSeconds: 20 * 60,
    color: 'bg-orange-500',
    description: 'Describe a chart/table/diagram'
  },
  writing_task_2: {
    id: 'writing_task_2',
    label: 'Writing Task 2',
    durationSeconds: 40 * 60,
    color: 'bg-orange-600',
    description: 'Write an essay'
  },
  writing_total: {
    id: 'writing_total',
    label: 'Writing Total',
    durationSeconds: 60 * 60,
    color: 'bg-orange-700',
    description: 'Both tasks combined'
  },
  speaking: {
    id: 'speaking',
    label: 'Speaking',
    durationSeconds: 14 * 60,
    color: 'bg-purple-500',
    description: 'Interview (11-14 mins)'
  }
};
