import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Trash2, X } from 'lucide-react';

interface ExerciseSetProps {
  dayIndex: number;
  exerciseIndex: number;
  setIndex: number;
  register: any;
  remove: any;
}

const ExerciseSet = ({ dayIndex, exerciseIndex, setIndex, register, remove }: ExerciseSetProps) => (
  <div className='flex justify-between items-center gap-2 mt-3'>
    <Button
      type='button'
      variant='ghostructive'
      size='iconSmall'
      className='w-8 h-8'
      onClick={() => remove(setIndex)}
      disabled={setIndex === 0}
    >
      <Minus className='h-4 w-4' />
    </Button>
    <div className='grid grid-cols-2 sm:grid-cols-4 w-full gap-2'>
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
        {...register(
          `trainingDays.${dayIndex}.exercises.${exerciseIndex}.sets.${setIndex}.weight`,
          {
            valueAsNumber: true,
          }
        )}
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
    </div>
  </div>
);

export default ExerciseSet;
