import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Exercise } from '@/types/types';

interface ExerciseListItemProps {
  exercise: Exercise;
  index: number;
  isCompleted: boolean;
  completedSets: { [key: string]: boolean[] };
  onSelect: (index: number) => void;
}

export default function ExerciseListItem({
  exercise,
  index,
  isCompleted,
  completedSets,
  onSelect,
}: ExerciseListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card
        className={`cursor-pointer transition-colors ${
          isCompleted ? 'bg-green-500' : 'hover:bg-muted hover:border hover:border-primary'
        }`}
        onClick={() => onSelect(index)}
      >
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>{exercise.title}</span>
          </CardTitle>
          <CardDescription>{exercise.muscleGroup}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div>
              <p className='text-sm font-medium'>Series</p>
              <p className='text-xl font-bold'>{exercise.sets.length}</p>
            </div>
            <div>
              <p className='text-sm font-medium'>Repeticiones</p>
              <p className='text-xl font-bold'>{exercise.sets[0].repetitions}</p>
            </div>
          </div>
          <p className='text-sm mb-2'>{exercise.description}</p>
          <Progress
            value={
              ((completedSets[exercise.id]?.filter(Boolean).length || 0) / exercise.sets.length) *
              100
            }
            className='h-2'
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
