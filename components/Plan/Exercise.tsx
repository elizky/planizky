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
}
const Exercise = ({ dayIndex, exerciseIndex, register, remove, control }: ExerciseProps) => (
  <div className='border p-4 mt-4'>
    <div className='flex justify-between items-center pb-4'>
      <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
        Exercise {exerciseIndex + 1}
      </h4>
      <Button
        type='button'
        variant='destructive'
        size='icon'
        onClick={() => remove(exerciseIndex)}
        disabled={exerciseIndex === 0}
      >
        <Trash2 className='h-4 w-4' />
      </Button>
    </div>
    <div className='space-y-4'>
      <div className='flex flex-col justify-between gap-4 w-full'>
        <div className='flex justify-between gap-4 w-full'>
          <div className='w-1/2'>
            <Input
              placeholder='Title'
              {...register(`trainingDays.${dayIndex}.exercises.${exerciseIndex}.title`)}
            />
          </div>
          <div className='w-1/2'>
            <Input
              placeholder='Category'
              {...register(`trainingDays.${dayIndex}.exercises.${exerciseIndex}.category`)}
            />
          </div>
        </div>
        <div className='flex justify-between gap-4 w-full'>
          <div className='w-1/2'>
            <Input
              placeholder='Description'
              {...register(`trainingDays.${dayIndex}.exercises.${exerciseIndex}.description`)}
            />
          </div>
          <div className='w-1/2'>
            <Input
              placeholder='Muscle Group'
              {...register(`trainingDays.${dayIndex}.exercises.${exerciseIndex}.muscleGroup`)}
            />
          </div>
        </div>
      </div>
      <div>
        <Label>Sets</Label>
        <Controller
          name={`trainingDays.${dayIndex}.exercises.${exerciseIndex}.sets`}
          control={control}
          render={({ field: setsField }) => (
            <div className='space-y-2'>
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
