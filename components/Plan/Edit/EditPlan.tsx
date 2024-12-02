'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Accordion } from '@/components/ui/accordion';
import { planSchema, PlanSchema } from '@/types/formSchemas';
import TrainingDay from '../TrainingDay';
import { editPlan, getPlan } from '@/actions/plan-actions';

export default function EditPlanPage({ params }: { params: { id: string } }) {
  const router = useRouter();
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
    const fetchPlanData = async () => {
      try {
        const planData = await getPlan(params.id);

        if (!planData.plan) {
          console.error('Plan not found');
          setIsLoading(false);
          return;
        }

        const transformedTrainingDays = planData.plan.trainingDays.map((day) => ({
          ...day,
          exercises: day.exercises.map((ex) => ({
            ...ex,
            sets: ex.sets.map((set) => ({
              repetitions: set.repetitions,
              weight: set.weight ?? undefined,
              duration: set.duration ?? undefined,
              restTime: set.restTime ?? undefined,
            })),
          })),
        }));

        setValue('title', planData.plan.title);
        setValue('description', planData.plan.description || undefined);
        setValue('trainingDaysCount', planData.plan.trainingDays.length);
        setValue(
          'trainingDays',
          transformedTrainingDays.map((day) => ({
            title: day.title,
            type: day.type,
            exercises: day.exercises.map((ex) => ({
              title: ex.title,
              description: ex.description || undefined,
              videoUrl: ex.videoUrl,
              category: ex.category,
              muscleGroup: ex.muscleGroup,
              sets: ex.sets,
            })),
          }))
        );

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
        appendTrainingDay({
          title: `Day ${i + 1}`,
          type: 'SERIES',
          exercises: [],
        });
      }
    } else if (trainingDaysCount < currentDaysCount && trainingDaysCount >= 1) {
      for (let i = currentDaysCount - 1; i >= trainingDaysCount; i--) {
        removeTrainingDay(i);
      }
    }
  }, [trainingDaysCount, appendTrainingDay, removeTrainingDay, trainingDayFields.length]);

  const onSubmit = async (data: PlanSchema) => {
    try {
      await editPlan(params.id, data);
      console.log('Plan updated successfully');
      router.push('/gym-plans');
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
