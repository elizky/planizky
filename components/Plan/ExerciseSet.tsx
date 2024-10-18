import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';

interface ExerciseSetProps {
  dayIndex: number;
  exerciseIndex: number;
  setIndex: number;
  register: any;
  remove: any;
}

const ExerciseSet = ({ dayIndex, exerciseIndex, setIndex, register, remove }: ExerciseSetProps) => (
  <div className='flex space-x-2 mt-4'>
    <Input
      type='number'
      placeholder='Reps'
      {...register(
        `trainingDays.${dayIndex}.exercises.${exerciseIndex}.sets.${setIndex}.repetitions`,
        { valueAsNumber: true }
      )}
    />
    <Input
      type='number'
      placeholder='Weight'
      {...register(`trainingDays.${dayIndex}.exercises.${exerciseIndex}.sets.${setIndex}.weight`, {
        valueAsNumber: true,
      })}
    />
    <Input
      type='number'
      placeholder='Duration'
      {...register(
        `trainingDays.${dayIndex}.exercises.${exerciseIndex}.sets.${setIndex}.duration`,
        { valueAsNumber: true }
      )}
    />
    <Input
      type='number'
      placeholder='Rest'
      {...register(
        `trainingDays.${dayIndex}.exercises.${exerciseIndex}.sets.${setIndex}.restTime`,
        { valueAsNumber: true }
      )}
    />
    <Button
      type='button'
      variant='destructive'
      size='icon'
      onClick={() => remove(setIndex)}
      disabled={setIndex === 0}
    >
      <Trash2 className='h-4 w-4' />
    </Button>
  </div>
);

export default ExerciseSet;
