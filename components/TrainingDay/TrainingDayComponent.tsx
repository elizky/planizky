'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Home, AlarmClock } from 'lucide-react';
import { CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { TrainingDay } from '@/types/types';

import ExerciseListItem from './ExerciseListItem';
import { ExerciseCard } from './ExerciseCard';

export default function TrainingDayComponent({ data }: { data: TrainingDay }) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [isDayCompleted, setIsDayCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState('exercise');
  const [completedSets, setCompletedSets] = useState<{ [key: string]: boolean[] }>({});
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);

  const userId = data.plan.user.id;

  useEffect(() => {
    const initialCompletedSets: { [key: string]: boolean[] } = {};
    data.exercises.forEach((exercise) => {
      initialCompletedSets[exercise.id] = new Array(exercise.sets.length).fill(false);
    });
    setCompletedSets(initialCompletedSets);
  }, [data]);

  const handleDayComplete = () => {
    const completedDays = parseInt(localStorage.getItem('completedDays') || '0') + 1;
    localStorage.setItem('completedDays', completedDays.toString());
    router.push('/dashboard');
  };

  return (
    <div className='container mx-auto p-4 max-w-3xl'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>{data.title}</h1>
        <Button
          variant='outline'
          size='icon'
          onClick={() => router.push('/dashboard')}
          aria-label='Go to main page'
        >
          <Home className='h-4 w-4' />
        </Button>
      </div>
      <p className='my-4 text-sm'>{data.description}</p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className='mb-6'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='exercise'>Ejercicio Actual</TabsTrigger>
          <TabsTrigger value='all'>Todos los Ejercicios</TabsTrigger>
        </TabsList>
        <TabsContent value='exercise'>
          <ExerciseCard
            data={data}
            userId={userId}
            onDayComplete={handleDayComplete}
            completedSets={completedSets}
            setCompletedSets={setCompletedSets}
            selectedExerciseIndex={selectedExerciseIndex}
            setSelectedExerciseIndex={setSelectedExerciseIndex}
            onProgressChange={(newProgress) => {
              setProgress(newProgress);
              setIsDayCompleted(newProgress === 100);
            }}
          />
        </TabsContent>
        <TabsContent value='all'>
          <div className='space-y-4'>
            {data.exercises.map((exercise, index) => (
              <ExerciseListItem
                key={exercise.id}
                exercise={exercise}
                index={index}
                isCompleted={completedSets[exercise.id]?.every(Boolean) || false}
                completedSets={completedSets}
                isSelected={index === selectedExerciseIndex}
                onSelect={(index) => {
                  setSelectedExerciseIndex(index);
                  setActiveTab('exercise');
                }}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className='flex flex-col space-y-6'>
        <CardTitle className='flex items-center justify-between'>
          <span>Progreso del día</span>
          {isDayCompleted ? (
            <CheckCircle2 className='h-6 w-6 text-green-500' />
          ) : (
            <AlarmClock className='h-6 w-6' />
          )}
        </CardTitle>
        <Progress value={progress} className='w-full h-3 mb-2' />
        <p className='text-sm text-muted-foreground text-center'>
          {Math.round(progress)}% completado
        </p>
      </div>
    </div>
  );
}
