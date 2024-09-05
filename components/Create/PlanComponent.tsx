'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';

import { planSchema, PlanSchema } from '@/types/formSchemas';
import { emptyMockData } from '@/lib/dataMock';
import PlanDetails from './PlanDetail';
import { useToast } from '../ui/use-toast';
import TrainingDaysOverview from './TrainingDaysOverview';
import TrainingDay from './TrainingDay';

export default function CreatePlanPage() {
  const { toast } = useToast();

  const [step, setStep] = useState(0);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<PlanSchema>({
    resolver: zodResolver(planSchema),
    defaultValues: emptyMockData,
  });

  const {
    fields: trainingDayFields,
    append: appendTrainingDay,
    remove: removeTrainingDay,
  } = useFieldArray({
    control,
    name: 'trainingDays',
  });

  const onSubmit = (data: PlanSchema) => {
    console.log('Form Data:', JSON.stringify(data, null, 2));
  };

  const trainingDaysCount = watch('trainingDaysCount');

  useEffect(() => {
    const numDays = parseInt(trainingDaysCount);
    const currentDays = trainingDayFields.length;
    if (numDays > currentDays) {
      for (let i = currentDays; i < numDays; i++) {
        appendTrainingDay(emptyMockData.trainingDays[0]);
      }
    } else if (numDays < currentDays) {
      for (let i = currentDays - 1; i >= numDays; i--) {
        removeTrainingDay(i);
      }
    }
  }, [trainingDaysCount, appendTrainingDay, removeTrainingDay, trainingDayFields.length]);
  const steps = [
    { title: 'Plan Details', component: <PlanDetails control={control} errors={errors} /> },
    {
      title: 'Training Days Overview',
      component: <TrainingDaysOverview trainingDayFields={trainingDayFields} control={control} />,
    },
    ...trainingDayFields.map((_, index) => ({
      title: `Training Day ${index + 1}`,
      component: (
        <TrainingDay nestIndex={index} control={control} removeTrainingDay={removeTrainingDay} />
      ),
    })),
    { title: 'Review', component: <ReviewPlan control={control} /> },
  ];

  const handleNextStep = async () => {
    if (step === 0) {
      const isValid = await trigger(['title', 'description', 'trainingDaysCount']);
      if (!isValid) {
        toast({
          title: 'Validation Error',
          description: 'Please fill in all required fields before proceeding.',
          variant: 'destructive',
        });
        return;
      }
    }
    setStep(step + 1);
  };

  return (
    <div className='container mx-auto p-4 sm:px-6 lg:px-8 max-w-xl'>
      <div className='mb-8'>
        <div className='flex justify-between items-center'>
          {steps.map((s, index) => (
            <div key={index} className={`flex flex-col items-center ${index > 0 ? 'ml-4' : ''}`}>
              <div
                className={`rounded-full h-10 w-10 flex items-center justify-center border-2 ${
                  step >= index
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-muted-foreground text-muted-foreground'
                }`}
              >
                {index + 1}
              </div>
              <span className='mt-2 text-sm font-medium text-center'>{s.title}</span>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
        {steps[step].component}
        <div className='flex justify-between mt-8'>
          {step > 0 && (
            <Button type='button' onClick={() => setStep(step - 1)}>
              Previous
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button type='button' onClick={handleNextStep}>
              Next
            </Button>
          ) : (
            <Button type='submit'>Create Plan</Button>
          )}
        </div>
      </form>
    </div>
  );
}

function ReviewPlan({ control }: { control: any }) {
  const { fields: trainingDays } = useFieldArray({ control, name: 'trainingDays' });

  return (
    <div className='space-y-8'>
      <h2 className='text-2xl font-bold'>Review Your Plan</h2>
      <div className='space-y-4'>
        <h3 className='text-xl font-semibold'>Plan Details</h3>
        <div className='bg-muted p-4 rounded-lg'>
          <Controller
            name='title'
            control={control}
            render={({ field }) => (
              <p>
                <strong>Title:</strong> {field.value}
              </p>
            )}
          />
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <p>
                <strong>Description:</strong> {field.value}
              </p>
            )}
          />
          <Controller
            name='trainingDaysCount'
            control={control}
            render={({ field }) => (
              <p>
                <strong>Number of Training Days:</strong> {field.value}
              </p>
            )}
          />
        </div>
      </div>
      <div className='space-y-4'>
        <h3 className='text-xl font-semibold'>Training Days</h3>
        {trainingDays.map((day, dayIndex) => (
          <div key={day.id} className='bg-muted p-4 rounded-lg space-y-2'>
            <h4 className='text-lg font-semibold'>Day {dayIndex + 1}</h4>
            <Controller
              name={`trainingDays.${dayIndex}.title`}
              control={control}
              render={({ field }) => (
                <p>
                  <strong>Title:</strong> {field.value}
                </p>
              )}
            />
            <Controller
              name={`trainingDays.${dayIndex}.type`}
              control={control}
              render={({ field }) => (
                <p>
                  <strong>Type:</strong> {field.value}
                </p>
              )}
            />
            <Controller
              name={`trainingDays.${dayIndex}.description`}
              control={control}
              render={({ field }) => (
                <p>
                  <strong>Description:</strong> {field.value}
                </p>
              )}
            />
            <h5 className='text-md font-semibold mt-2'>Exercises:</h5>
            <Controller
              name={`trainingDays.${dayIndex}.exercises`}
              control={control}
              render={({ field }) => (
                <ul className='list-disc pl-5 space-y-2'>
                  {field.value.map((exercise: any, exerciseIndex: number) => (
                    <li key={exerciseIndex}>
                      <strong>{exercise.title}</strong> - {exercise.category} (
                      {exercise.muscleGroup})
                      <br />
                      Sets: {exercise.sets.length}
                      <ul className='list-circle pl-5 mt-1'>
                        {exercise.sets.map((set: any, setIndex: number) => (
                          <li key={setIndex}>
                            Reps: {set.repetitions}, Weight: {set.weight}kg, Duration:{' '}
                            {set.duration}s, Rest: {set.restTime}s
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
