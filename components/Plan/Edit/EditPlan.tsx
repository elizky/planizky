'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Accordion } from '@/components/ui/accordion';
import { planSchema, PlanSchema } from '@/types/formSchemas';
import TrainingDay from '../TrainingDay';
import { emptyTrainingDay } from '@/types/types';

export default function EditPlanPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
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
    // Fetch the plan data
    const fetchPlanData = async () => {
      try {
        // Replace this with your actual API call
        const response = await fetch(`/api/plans/${params.id}`);
        const planData = await response.json();

        // Set the form values with the fetched data
        setValue('title', planData.title);
        setValue('description', planData.description);
        setValue('trainingDaysCount', planData.trainingDays.length);
        setValue('trainingDays', planData.trainingDays);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching plan data:', error);
        setIsLoading(false);
      }
    };

    fetchPlanData();
  }, [params.id, setValue]);

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

  const onSubmit = async (data: PlanSchema) => {
    console.log('Updated Plan:', JSON.stringify(data, null, 2));
    try {
      // Replace this with your actual API call
      const response = await fetch(`/api/plans/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle successful update (e.g., show a success message, redirect)
        console.log('Plan updated successfully');
      } else {
        // Handle error
        console.error('Failed to update plan');
      }
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        Update Plan
      </Button>
    </form>
  );
}
