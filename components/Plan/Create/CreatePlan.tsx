'use client';

import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { createPlan } from '@/actions/plan-actions';
import { planSchema, PlanSchema, TrainingType } from '@/types/formSchemas';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion } from '@/components/ui/accordion';
import { toast } from '@/components/ui/use-toast';

import TrainingDay from '../TrainingDay';

export default function CreatePlanPage() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
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
        appendTrainingDay({
          title: '',
          description: undefined,
          type: TrainingType.SERIES,
          settings: {},
          exercises: [
            {
              title: '',
              sets: [
                {
                  repetitions: 0,
                  duration: undefined,
                  weight: undefined,
                  restTime: undefined,
                },
              ],
              muscleGroup: '',
              category: '',
              description: undefined,
              videoUrl: '',
            },
          ],
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
      const result = await createPlan(data);

      if (result.error) {
        toast({
          title: 'Error',
          description: result.error,
        });
        return;
      }

      toast({
        title: 'Plan creado correctamente',
      });
      router.push('/gym-plans');
    } catch (error) {
      toast({
        title: 'Algo salió mal',
        description: 'Por favor, intenta nuevamente',
      });
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 py-4'>
      <div className='flex flex-col sm:flex-row justify-between gap-4 w-full'>
        <div className='w-full sm:w-1/2 space-y-2'>
          <Label htmlFor='title'>Title</Label>
          <Input id='title' {...register('title')} />
          {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
        </div>
        <div className='flex flex-row justify-between gap-4 w-full sm:w-3/6'>
          <div className='space-y-2 w-full'>
            <Label htmlFor='description'>Description</Label>
            <Input id='description' {...register('description')} />
          </div>

          <div className=' space-y-2'>
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
