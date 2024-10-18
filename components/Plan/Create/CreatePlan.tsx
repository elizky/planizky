'use client';

import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Accordion } from '@/components/ui/accordion';
import { planSchema, PlanSchema } from '@/types/formSchemas';
import { emptyTrainingDay } from '@/types/types';
import TrainingDay from '../TrainingDay';

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
        appendTrainingDay(emptyTrainingDay);
      }
    } else if (trainingDaysCount < currentDaysCount && trainingDaysCount >= 1) {
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
            min='1'
            {...register('trainingDaysCount', { valueAsNumber: true })}
          />
          {errors.trainingDaysCount && (
            <p className='text-red-500'>{errors.trainingDaysCount.message}</p>
          )}
        </div>
      </div>

      <Accordion type='multiple' className='w-full'>
        {trainingDayFields.map((field, index) => (
          <TrainingDay
            key={field.id}
            dayIndex={index}
            register={register}
            control={control}
            errors={errors}
          />
        ))}
      </Accordion>

      <Button className='w-full' type='submit'>
        Create Plan
      </Button>
    </form>
  );
}
