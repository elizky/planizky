'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PlusCircle, Trash2 } from 'lucide-react';
import { planSchema, PlanSchema } from '@/types/formSchemas';

export default function CreatePlanPage() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PlanSchema>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      trainingDaysCount: 1,
      trainingDays: [{ exercises: [{ sets: [{}] }] }],
    },
  });

  const {
    fields: trainingDayFields,
    append: appendTrainingDay,
    remove: removeTrainingDay,
  } = useFieldArray({
    control,
    name: 'trainingDays',
  });

  const trainingDaysCount = watch('trainingDaysCount');

  useEffect(() => {
    const currentDaysCount = trainingDayFields.length;
    if (trainingDaysCount > currentDaysCount) {
      for (let i = currentDaysCount; i < trainingDaysCount; i++) {
        appendTrainingDay({ exercises: [{ sets: [{}] }] });
      }
    } else if (trainingDaysCount < currentDaysCount) {
      for (let i = currentDaysCount - 1; i >= trainingDaysCount; i--) {
        removeTrainingDay(i);
      }
    }
  }, [trainingDaysCount, appendTrainingDay, removeTrainingDay, trainingDayFields.length]);

  const onSubmit = (data: PlanSchema) => {
    console.log('Entire Plan:', JSON.stringify(data, null, 2));
    // Here you would typically send the data to your backend
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 py-4'>
      <div className='flex justify-between gap-4 w-full'>
        <div className='w-2/6 space-y-2'>
          <Label htmlFor='title'>Title</Label>
          <Input id='title' {...register('title')} />
          {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
        </div>

        <div className='w-3/6 space-y-2'>
          <Label htmlFor='description'>Description</Label>
          <Input id='description' {...register('description')} />
        </div>

        <div className='w-1/6 space-y-2'>
          <Label htmlFor='trainingDaysCount'>Total Days</Label>
          <Input
            id='trainingDaysCount'
            type='number'
            {...register('trainingDaysCount', { valueAsNumber: true })}
          />
          {errors.trainingDaysCount && (
            <p className='text-red-500'>{errors.trainingDaysCount.message}</p>
          )}
        </div>
      </div>

      <Accordion type='multiple' className='w-full'>
        {trainingDayFields.map((field, dayIndex) => (
          <AccordionItem value={`day-${dayIndex}`} key={field.id}>
            <AccordionTrigger>Day {dayIndex + 1}</AccordionTrigger>
            <AccordionContent>
              <div className='space-y-4 border p-4 '>
                <div className='flex justify-between gap-4 w-full'>
                  <div className='w-2/6 space-y-2'>
                    <Label htmlFor={`trainingDays.${dayIndex}.title`}>Title</Label>
                    <Input {...register(`trainingDays.${dayIndex}.title`)} />
                    {errors.trainingDays?.[dayIndex]?.title && (
                      <p className='text-red-500'>
                        {errors.trainingDays[dayIndex]?.title?.message}
                      </p>
                    )}
                  </div>

                  <div className='w-3/6 space-y-2'>
                    <Label htmlFor={`trainingDays.${dayIndex}.description`}>Description</Label>
                    <Input {...register(`trainingDays.${dayIndex}.description`)} />
                  </div>
                  <div className='w-1/6 space-y-2'>
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
                            <SelectItem value='STRENGTH'>Strength</SelectItem>
                            <SelectItem value='CARDIO'>Cardio</SelectItem>
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
                        {field.value.map((exercise, exerciseIndex) => (
                          <div key={exerciseIndex} className='border p-4 mt-4'>
                            <div className='flex justify-between items-center pb-4'>
                              <h4 className='scroll-m-20 text-xl font-semibold tracking-tight '>
                                Exercise {exerciseIndex + 1}
                              </h4>
                              <Button
                                type='button'
                                variant='destructive'
                                size='icon'
                                onClick={() => {
                                  const newExercises = [...field.value];
                                  newExercises.splice(exerciseIndex, 1);
                                  field.onChange(newExercises);
                                }}
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
                                      {...register(
                                        `trainingDays.${dayIndex}.exercises.${exerciseIndex}.title`
                                      )}
                                    />
                                  </div>
                                  <div className='w-1/2'>
                                    <Input
                                      placeholder='Category'
                                      {...register(
                                        `trainingDays.${dayIndex}.exercises.${exerciseIndex}.category`
                                      )}
                                    />
                                  </div>
                                </div>
                                <div className='flex justify-between gap-4 w-full'>
                                  <div className='w-1/2'>
                                    <Input
                                      placeholder='Description'
                                      {...register(
                                        `trainingDays.${dayIndex}.exercises.${exerciseIndex}.description`
                                      )}
                                    />
                                  </div>
                                  <div className='w-1/2'>
                                    <Input
                                      placeholder='Muscle Group'
                                      {...register(
                                        `trainingDays.${dayIndex}.exercises.${exerciseIndex}.muscleGroup`
                                      )}
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
                                      {setsField.value.map((set, setIndex) => (
                                        <div key={setIndex} className='flex space-x-2 mt-4'>
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
                                              { valueAsNumber: true }
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
                                          <Button
                                            type='button'
                                            variant='destructive'
                                            size='icon'
                                            onClick={() => {
                                              const newSets = [...setsField.value];
                                              newSets.splice(setIndex, 1);
                                              setsField.onChange(newSets);
                                            }}
                                          >
                                            <Trash2 className='h-4 w-4' />
                                          </Button>
                                        </div>
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
        ))}
      </Accordion>

      <Button className='w-full' type='submit'>
        Create Plan
      </Button>
    </form>
  );
}
