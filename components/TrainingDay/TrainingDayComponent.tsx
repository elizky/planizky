'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CheckCircle2,
  Home,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Clock,
  Zap,
  AlarmClock,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { TrainingDay } from '@/types/types';

export default function TrainingDayComponent({ data }: { data: TrainingDay }) {
  const router = useRouter();
  const [completedSets, setCompletedSets] = useState<{ [key: string]: boolean[] }>({});
  const [progress, setProgress] = useState(0);
  const [isDayCompleted, setIsDayCompleted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('exercise');

  useEffect(() => {
    const initialCompletedSets: { [key: string]: boolean[] } = {};
    data.exercises.forEach((exercise) => {
      initialCompletedSets[exercise.id] = new Array(exercise.sets.length).fill(false);
    });
    setCompletedSets(initialCompletedSets);
    setIsDayCompleted(false);
    setStartTime(new Date());
    setCurrentExerciseIndex(0);
  }, [data]);

  useEffect(() => {
    const totalSets = data.exercises.reduce((total, exercise) => total + exercise.sets.length, 0);
    const completedSetsCount = Object.values(completedSets).flat().filter(Boolean).length;
    const newProgress = (completedSetsCount / totalSets) * 100;
    setProgress(newProgress);
    setIsDayCompleted(newProgress === 100);
  }, [completedSets, data]);

  const handleSetComplete = (exerciseId: string, setIndex: number) => {
    const updatedSets = [...completedSets[exerciseId]];
    updatedSets[setIndex] = !updatedSets[setIndex];
    setCompletedSets({ ...completedSets, [exerciseId]: updatedSets });

    if (updatedSets.every(Boolean)) {
      handleNextExercise();
    }
  };

  const handleFinishDay = () => {
    if (startTime) {
      const endTime = new Date();
      const duration = (endTime.getTime() - startTime.getTime()) / 1000;
      const completedDays = parseInt(localStorage.getItem('completedDays') || '0') + 1;
      const totalTime = parseInt(localStorage.getItem('totalTime') || '0') + duration;

      localStorage.setItem('completedDays', completedDays.toString());
      localStorage.setItem('totalTime', totalTime.toString());

      toast({
        title: '¡Entrenamiento completado!',
        description: `Has completado el ${data.title} de tu plan de entrenamiento en ${Math.round(
          duration
        )} segundos.`,
      });
      router.push('/dashboard');
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < data.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const handleSelectExercise = (index: number) => {
    if (isExerciseCompleted(data.exercises[index].id)) return;
    setCurrentExerciseIndex(index);
    setActiveTab('exercise');
  };

  const getExerciseIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'cardio':
        return <Zap className='w-6 h-6' />;
      case 'strength':
        return <Dumbbell className='w-6 h-6' />;
      default:
        return <Clock className='w-6 h-6' />;
    }
  };

  const isExerciseCompleted = (exerciseId: string) => {
    return completedSets[exerciseId]?.every(Boolean) || false;
  };

  const isAllExercisesCompleted = data.exercises.every((exercise) =>
    isExerciseCompleted(exercise.id)
  );

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

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>Progreso del día</span>
            {isDayCompleted ? (
              <CheckCircle2 className='h-6 w-6 text-green-500' />
            ) : (
              <AlarmClock className='h-6 w-6' />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className='w-full h-3 mb-2' />
          <p className='text-sm text-muted-foreground text-center'>
            {Math.round(progress)}% completado
          </p>
          <p className='mt-4 text-sm'>{data.description}</p>
          {isDayCompleted && (
            <Button onClick={handleFinishDay} className='w-full mt-4'>
              Finalizar Día de Entrenamiento
            </Button>
          )}
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className='mb-6'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='exercise'>Ejercicio Actual</TabsTrigger>
          <TabsTrigger value='all'>Todos los Ejercicios</TabsTrigger>
        </TabsList>
        <TabsContent value='exercise'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center justify-between capitalize'>
                <span>{data.exercises[currentExerciseIndex].title}</span>
                {getExerciseIcon(data.exercises[currentExerciseIndex].category)}
              </CardTitle>
              <CardDescription className='capitalize'>
                {data.exercises[currentExerciseIndex].muscleGroup}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm mb-4'>{data.exercises[currentExerciseIndex].description}</p>
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 mb-12'>
                {data.exercises[currentExerciseIndex].sets.map((set, setIndex) => {
                  const isCompleted =
                    completedSets[data.exercises[currentExerciseIndex].id]?.[setIndex] || false;
                  return (
                    <button
                      key={set.id}
                      onClick={() =>
                        handleSetComplete(data.exercises[currentExerciseIndex].id, setIndex)
                      }
                      className={`p-4 rounded-lg text-center transition-colors ${
                        isCompleted
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-muted hover:outline hover:outline-primary'
                      }`}
                    >
                      <span className='text-lg font-semibold block'>Serie {setIndex + 1}</span>
                      <span className='text-sm block'>Reps: {set.repetitions}</span>
                      <span className='text-sm block'>Peso: {set.weight}kg</span>
                      <span className='text-sm'>{isCompleted ? 'Completada' : 'Pendiente'}</span>
                    </button>
                  );
                })}
              </div>
              <div className='flex justify-between'>
                {!isAllExercisesCompleted && (
                  <Button onClick={handlePreviousExercise} disabled={currentExerciseIndex === 0}>
                    <ChevronLeft className='mr-2 h-4 w-4' /> Anterior
                  </Button>
                )}
                <Button
                  onClick={isAllExercisesCompleted ? handleFinishDay : handleNextExercise}
                  disabled={
                    currentExerciseIndex === data.exercises.length - 1 && !isAllExercisesCompleted
                  }
                  className={`ml-auto ${isAllExercisesCompleted && 'w-full'} `}
                >
                  {isAllExercisesCompleted ? (
                    <>Finalizar Entrenamiento</>
                  ) : (
                    <>
                      Siguiente <ChevronRight className='ml-2 h-4 w-4' />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='all'>
          <div className='space-y-4'>
            {data.exercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-colors ${
                    isExerciseCompleted(exercise.id)
                      ? 'bg-green-500'
                      : 'hover:bg-muted hover:border hover:border-primary'
                  }`}
                  onClick={() => handleSelectExercise(index)}
                >
                  <CardHeader>
                    <CardTitle className='flex items-center justify-between'>
                      <span>{exercise.title}</span>
                      {getExerciseIcon(exercise.category)}
                    </CardTitle>
                    <CardDescription>{exercise.muscleGroup}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-2 gap-4 mb-4'>
                      <div>
                        <p className='text-sm font-medium'>Series</p>
                        <p className='text-xl font-bold'>{exercise.sets.length}</p>
                      </div>
                      <div>
                        <p className='text-sm font-medium'>Repeticiones</p>
                        <p className='text-xl font-bold'>{exercise.sets[0].repetitions}</p>
                      </div>
                    </div>
                    <p className='text-sm mb-2'>{exercise.description}</p>
                    <Progress
                      value={
                        ((completedSets[exercise.id]?.filter(Boolean).length || 0) /
                          exercise.sets.length) *
                        100
                      }
                      className='h-2'
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
