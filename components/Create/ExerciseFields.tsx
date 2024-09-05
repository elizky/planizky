import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Label } from '../ui/label';
import { Controller, useFieldArray } from 'react-hook-form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { emptyMockData } from '@/lib/dataMock';
import SetFields from './SetsFields';

export default function ExerciseFields({
  nestIndex,
  control,
}: {
  nestIndex: number;
  control: any;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `trainingDays.${nestIndex}.exercises`,
  });

  return (
    <Accordion type='multiple' className='w-full space-y-4'>
      {fields.map((field, index) => (
        <AccordionItem value={`exercise-${index}`} key={field.id}>
          <AccordionTrigger className='text-md font-semibold'>
            Exercise {index + 1}
          </AccordionTrigger>
          <AccordionContent>
            <div className='space-y-4 p-4 bg-background rounded-lg'>
              <div className='space-y-2'>
                <Label htmlFor={`trainingDays.${nestIndex}.exercises.${index}.title`}>Title</Label>
                <Controller
                  name={`trainingDays.${nestIndex}.exercises.${index}.title`}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder='Squats' className='w-full' />
                  )}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor={`trainingDays.${nestIndex}.exercises.${index}.category`}>
                  Category
                </Label>
                <Controller
                  name={`trainingDays.${nestIndex}.exercises.${index}.category`}
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select exercise category' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='compound'>Compound</SelectItem>
                        <SelectItem value='isolation'>Isolation</SelectItem>
                        <SelectItem value='bodyweight'>Bodyweight</SelectItem>
                        <SelectItem value='cardio'>Cardio</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor={`trainingDays.${nestIndex}.exercises.${index}.muscleGroup`}>
                  Muscle Group
                </Label>
                <Controller
                  name={`trainingDays.${nestIndex}.exercises.${index}.muscleGroup`}
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select muscle group' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='chest'>Chest</SelectItem>
                        <SelectItem value='back'>Back</SelectItem>
                        <SelectItem value='legs'>Legs</SelectItem>
                        <SelectItem value='shoulders'>Shoulders</SelectItem>
                        <SelectItem value='arms'>Arms</SelectItem>
                        <SelectItem value='core'>Core</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <SetFields nestIndex={nestIndex} exerciseIndex={index} control={control} />

              <Button
                type='button'
                variant='outline'
                onClick={() => remove(index)}
                className='w-full'
                disabled={fields.length <= 1}
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Remove Exercise
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
      <Button
        type='button'
        onClick={() => append(emptyMockData.trainingDays[0].exercises[0])}
        className='w-full'
      >
        <PlusCircle className='mr-2 h-4 w-4' />
        Add Exercise
      </Button>
    </Accordion>
  );
}
