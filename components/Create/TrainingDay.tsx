import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Label } from '../ui/label';
import { Controller } from 'react-hook-form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import ExerciseFields from './ExerciseFields';

export default function TrainingDay({
  nestIndex,
  control,
  removeTrainingDay,
}: {
  nestIndex: number;
  control: any;
  removeTrainingDay: (index: number) => void;
}) {
  const trainingDaysCount = parseInt(control.getValues('trainingDaysCount'));

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold'>Training Day {nestIndex + 1}</h2>
      <div className='space-y-4 p-4 bg-muted rounded-lg'>
        <div className='space-y-2'>
          <Label htmlFor={`trainingDays.${nestIndex}.title`}>Title</Label>
          <Controller
            name={`trainingDays.${nestIndex}.title`}
            control={control}
            render={({ field }) => <Input {...field} placeholder='Leg Day' className='w-full' />}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor={`trainingDays.${nestIndex}.type`}>Type</Label>
          <Controller
            name={`trainingDays.${nestIndex}.type`}
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select training type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='strength'>Strength</SelectItem>
                  <SelectItem value='hypertrophy'>Hypertrophy</SelectItem>
                  <SelectItem value='endurance'>Endurance</SelectItem>
                  <SelectItem value='cardio'>Cardio</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor={`trainingDays.${nestIndex}.description`}>Description</Label>
          <Controller
            name={`trainingDays.${nestIndex}.description`}
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder='Focus on compound movements...'
                className='w-full'
              />
            )}
          />
        </div>

        <ExerciseFields nestIndex={nestIndex} control={control} />

        <Button
          type='button'
          variant='outline'
          disabled={trainingDaysCount <= 1}
          onClick={() => {
            removeTrainingDay(nestIndex);
            control.setValue('trainingDaysCount', (trainingDaysCount - 1).toString());
          }}
          className='w-full'
        >
          <Trash2 className='mr-2 h-4 w-4' />
          Remove Training Day
        </Button>
      </div>
    </div>
  );
}
