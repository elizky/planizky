import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Trash2, X } from 'lucide-react';

interface ExerciseSetProps {
  dayIndex: number;
  exerciseIndex: number;
  setIndex: number;
  register: any;
  remove: any;
  errors: any;
}

const ExerciseSet = ({
  dayIndex,
  exerciseIndex,
  setIndex,
  register,
  remove,
  errors,
}: ExerciseSetProps) => (
  <div className='flex flex-col gap-2'>
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
        <div>
          <Input
            type='number'
            placeholder='Reps'
            {...register(
              `trainingDays.${dayIndex}.exercises.${exerciseIndex}.sets.${setIndex}.repetitions`
            )}
          />
          {errors?.trainingDays?.[dayIndex]?.exercises?.[exerciseIndex]?.sets?.[setIndex]
            ?.repetitions && (
            <span className='text-sm text-red-500'>
              {
                errors.trainingDays[dayIndex].exercises[exerciseIndex].sets[setIndex].repetitions
                  .message
              }
            </span>
          )}
        </div>

        <div>
          <Input
            type='number'
            placeholder='Weight (kg)'
            step='0.1'
            {...register(
              `trainingDays.${dayIndex}.exercises.${exerciseIndex}.sets.${setIndex}.weight`
            )}
          />
          {errors?.trainingDays?.[dayIndex]?.exercises?.[exerciseIndex]?.sets?.[setIndex]
            ?.weight && (
            <span className='text-sm text-red-500'>
              {errors.trainingDays[dayIndex].exercises[exerciseIndex].sets[setIndex].weight.message}
            </span>
          )}
        </div>

        <div>
          <Input
            type='number'
            placeholder='Duration (sec)'
            {...register(
              `trainingDays.${dayIndex}.exercises.${exerciseIndex}.sets.${setIndex}.duration`
            )}
          />
          {errors?.trainingDays?.[dayIndex]?.exercises?.[exerciseIndex]?.sets?.[setIndex]
            ?.duration && (
            <span className='text-sm text-red-500'>
              {
                errors.trainingDays[dayIndex].exercises[exerciseIndex].sets[setIndex].duration
                  .message
              }
            </span>
          )}
        </div>

        <div>
          <Input
            type='number'
            placeholder='Rest (sec)'
            {...register(
              `trainingDays.${dayIndex}.exercises.${exerciseIndex}.sets.${setIndex}.restTime`
            )}
          />
          {errors?.trainingDays?.[dayIndex]?.exercises?.[exerciseIndex]?.sets?.[setIndex]
            ?.restTime && (
            <span className='text-sm text-red-500'>
              {
                errors.trainingDays[dayIndex].exercises[exerciseIndex].sets[setIndex].restTime
                  .message
              }
            </span>
          )}
        </div>
      </div>
    </div>
    {errors?.trainingDays?.[dayIndex]?.exercises?.[exerciseIndex]?.sets?.[setIndex]?.root && (
      <span className='text-sm text-red-500 text-center'>
        {errors.trainingDays[dayIndex].exercises[exerciseIndex].sets[setIndex].root.message}
      </span>
    )}
  </div>
);

export default ExerciseSet;
