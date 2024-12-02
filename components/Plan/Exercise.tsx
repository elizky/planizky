import { Controller } from 'react-hook-form';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ExerciseSet from './ExerciseSet';

interface ExerciseProps {
  dayIndex: number;
  exerciseIndex: number;
  register: any;
  control: any;
  remove: any;
  errors: any;
}
const Exercise = ({
  dayIndex,
  exerciseIndex,
  register,
  remove,
  control,
  errors,
}: ExerciseProps) => (
  <div className='border p-4 mt-4'>
    <div className='flex justify-between items-center pb-4'>
      <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
        Exercise {exerciseIndex + 1}
      </h4>
      <Button
        type='button'
        variant='ghostructive'
        size='iconSmall'
        onClick={() => remove(exerciseIndex)}
        disabled={exerciseIndex === 0}
      >
        <Trash2 className='h-4 w-4' />
      </Button>
    </div>
    <div className='space-y-4'>
      <div className='flex flex-col sm:flex-row justify-between gap-4 w-full'>
        <div className='sm:w-1/2'>
          <Input
            placeholder='Title'
            {...register(`trainingDays.${dayIndex}.exercises.${exerciseIndex}.title`, {
              required: 'Title is required',
            })}
          />
          {errors?.trainingDays?.[dayIndex]?.exercises?.[exerciseIndex]?.title && (
            <p className='text-sm text-destructive mt-1'>
              {errors.trainingDays[dayIndex].exercises[exerciseIndex].title.message}
            </p>
          )}
        </div>
        <div className='sm:w-1/2'>
          <Input
            placeholder='Description'
            {...register(`trainingDays.${dayIndex}.exercises.${exerciseIndex}.description`)}
          />
        </div>
      </div>
      <div className='flex justify-between gap-4 w-full'>
        <div className='w-1/2'>
          <Input
            placeholder='Category'
            {...register(`trainingDays.${dayIndex}.exercises.${exerciseIndex}.category`, {
              required: 'Category is required',
            })}
          />
          {errors?.trainingDays?.[dayIndex]?.exercises?.[exerciseIndex]?.category && (
            <p className='text-sm text-destructive mt-1'>
              {errors.trainingDays[dayIndex].exercises[exerciseIndex].category.message}
            </p>
          )}
        </div>
        <div className='w-1/2'>
          <Input
            placeholder='Muscle Group'
            {...register(`trainingDays.${dayIndex}.exercises.${exerciseIndex}.muscleGroup`, {
              required: 'Muscle group is required',
            })}
          />
          {errors?.trainingDays?.[dayIndex]?.exercises?.[exerciseIndex]?.muscleGroup && (
            <p className='text-sm text-destructive mt-1'>
              {errors.trainingDays[dayIndex].exercises[exerciseIndex].muscleGroup.message}
            </p>
          )}
        </div>
      </div>
      <div className='w-full'>
        <Input
          placeholder='Video URL (optional)'
          type='url'
          {...register(`trainingDays.${dayIndex}.exercises.${exerciseIndex}.videoUrl`)}
        />
        {errors?.trainingDays?.[dayIndex]?.exercises?.[exerciseIndex]?.videoUrl && (
          <p className='text-sm text-destructive mt-1'>
            {errors.trainingDays[dayIndex].exercises[exerciseIndex].videoUrl.message}
          </p>
        )}
      </div>
      <div>
        <Label>Sets</Label>
        <Controller
          name={`trainingDays.${dayIndex}.exercises.${exerciseIndex}.sets`}
          control={control}
          render={({ field: setsField }) => (
            <div className='space-y-4'>
              {setsField.value.map((_: any, setIndex: number) => (
                <ExerciseSet
                  key={setIndex}
                  dayIndex={dayIndex}
                  exerciseIndex={exerciseIndex}
                  setIndex={setIndex}
                  register={register}
                  remove={(index: number) => {
                    if (setsField.value.length > 1) {
                      const newSets = [...setsField.value];
                      newSets.splice(index, 1);
                      setsField.onChange(newSets);
                    }
                  }}
                  errors={errors}
                />
              ))}
              <Button
                type='button'
                variant='outline'
                className='w-full'
                onClick={() => setsField.onChange([...setsField.value, {}])}
              >
                <PlusCircle className='mr-2 h-4 w-4' />
                Add Set
              </Button>
            </div>
          )}
        />
      </div>
    </div>
  </div>
);

export default Exercise;
