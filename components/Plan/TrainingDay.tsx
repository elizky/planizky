import { Controller } from 'react-hook-form';
import Exercise from './Exercise';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TrainingDayProps {
  dayIndex: number;
  register: any;
  control: any;
  errors: any;
}

const TrainingDay = ({ dayIndex, register, control, errors }: TrainingDayProps) => (
  <AccordionItem value={`day-${dayIndex}`}>
    <AccordionTrigger>Day {dayIndex + 1}</AccordionTrigger>
    <AccordionContent>
      <div className='space-y-4 border p-4 '>
        <div className='flex flex-col sm:flex-row justify-between gap-4 w-full'>
          <div className='w-full sm:w-1/2 space-y-2'>
            <Label htmlFor={`trainingDays.${dayIndex}.title`}>Title</Label>
            <Input {...register(`trainingDays.${dayIndex}.title`)} />
            {errors.trainingDays?.[dayIndex]?.title && (
              <p className='text-red-500'>{errors.trainingDays[dayIndex]?.title?.message}</p>
            )}
          </div>

          <div className='w-full sm:w-1/2 space-y-2'>
            <Label htmlFor={`trainingDays.${dayIndex}.description`}>Description</Label>
            <Input {...register(`trainingDays.${dayIndex}.description`)} />
          </div>
          <div className='w-full sm:w-1/2 space-y-2'>
            <Label htmlFor={`trainingDays.${dayIndex}.type`}>Type</Label>
            <Controller
              name={`trainingDays.${dayIndex}.type`}
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='SERIES'>Series</SelectItem>
                    <SelectItem value='CIRCUIT'>Circuit</SelectItem>
                    <SelectItem value='COMBINED'>Combined</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.trainingDays?.[dayIndex]?.type && (
              <p className='text-red-500'>{errors.trainingDays[dayIndex]?.type?.message}</p>
            )}
          </div>
        </div>

        <div>
          <Controller
            name={`trainingDays.${dayIndex}.exercises`}
            control={control}
            render={({ field }) => (
              <div className='space-y-4'>
                {field.value.map((_: any, exerciseIndex: number) => (
                  <Exercise
                    key={exerciseIndex}
                    dayIndex={dayIndex}
                    exerciseIndex={exerciseIndex}
                    register={register}
                    remove={(index: number) => {
                      if (field.value.length > 1) {
                        const newExercises = [...field.value];
                        newExercises.splice(index, 1);
                        field.onChange(newExercises);
                      }
                    }}
                    control={control}
                    errors={errors}
                  />
                ))}
                <Button
                  type='button'
                  variant='secondary'
                  className='w-full border-primary'
                  onClick={() => field.onChange([...field.value, { sets: [{}] }])}
                >
                  <PlusCircle className='mr-2 h-4 w-4 ' />
                  Add Exercise
                </Button>
              </div>
            )}
          />
        </div>
      </div>
    </AccordionContent>
  </AccordionItem>
);

export default TrainingDay;
