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
import { dataMock } from '@/lib/dataMock';
import { TrainingDay } from '@/types/types';

export default function TrainingDayComponent({ trainingDay }: any) {
  const router = useRouter();
  const selectedDay = dataMock.find((day) => day.id === trainingDay) || dataMock[0];

  const [completedSeries, setCompletedSeries] = useState<{ [key: string]: boolean[] }>({});
  const [progress, setProgress] = useState(0);
  const [isDayCompleted, setIsDayCompleted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('exercise');

  useEffect(() => {
    const initialCompletedSeries: { [key: string]: boolean[] } = {};
    selectedDay.exercises.forEach((exercise, index) => {
      initialCompletedSeries[`${selectedDay.day}-${index}`] = new Array(exercise.series).fill(
        false
      );
    });
    setCompletedSeries(initialCompletedSeries);
    setIsDayCompleted(false);
    setStartTime(new Date());
    setCurrentExerciseIndex(0);
  }, [selectedDay]);

  useEffect(() => {
    const totalSeries = selectedDay.exercises.reduce(
      (total, exercise) => total + exercise.series,
      0
    );
    const completedSeriesCount = Object.values(completedSeries).flat().filter(Boolean).length;
    const newProgress = (completedSeriesCount / totalSeries) * 100;
    setProgress(newProgress);
    setIsDayCompleted(newProgress === 100);
  }, [completedSeries, selectedDay]);

  const handleSeriesComplete = (exerciseIndex: number, seriesIndex: number) => {
    const exerciseKey = `${selectedDay.day}-${exerciseIndex}`;
    const updatedSeries = [...completedSeries[exerciseKey]];
    updatedSeries[seriesIndex] = !updatedSeries[seriesIndex];
    setCompletedSeries({ ...completedSeries, [exerciseKey]: updatedSeries });

    if (updatedSeries.every(Boolean)) {
      handleNextExercise();
    }
  };

  const handleFinishDay = () => {
    if (startTime) {
      const endTime = new Date();
      const duration = (endTime.getTime() - startTime.getTime()) / 1000;
      const completedDays = parseInt(localStorage.getItem('completedDays') || '0') + 1;
      const totalTime = parseInt(localStorage.getItem('totalTime') || '0') + duration;

      console.log('totalTime', totalTime);

      localStorage.setItem('completedDays', completedDays.toString());
      localStorage.setItem('totalTime', totalTime.toString());

      // Update chart data
      const storedChartData = JSON.parse(localStorage.getItem('chartData') || '[]');
      const newChartData = [
        ...storedChartData,
        {
          day: selectedDay.day,
          completedExercises: selectedDay.exercises.length,
          timeSpent: Math.round(duration / 60), // Convert to minutes
        },
      ];
      localStorage.setItem('chartData', JSON.stringify(newChartData));

      toast({
        title: '¡Entrenamiento completado!',
        description: `Has completado el ${
          selectedDay.day
        } de tu plan de entrenamiento en ${Math.round(duration)} segundos.`,
      });
      router.push('/dashboard');
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < selectedDay.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const handleSelectExercise = (index: number) => {
    if (isExerciseCompleted(index)) return;
    setCurrentExerciseIndex(index);
    setActiveTab('exercise');
  };

  const getExerciseIcon = (type: string) => {
    switch (type) {
      case 'cardio':
        return <Zap className='w-6 h-6' />;
      case 'fuerza':
        return <Dumbbell className='w-6 h-6' />;
      default:
        return <Clock className='w-6 h-6' />;
    }
  };

  const isExerciseCompleted = (exerciseIndex: number) => {
    const exerciseKey = `${selectedDay.day}-${exerciseIndex}`;
    return completedSeries[exerciseKey]?.every(Boolean) || false;
  };

  const isAllExercisesCompleted = selectedDay.exercises.every((_, index) =>
    isExerciseCompleted(index)
  );

  return (
    <div className='container mx-auto p-4 max-w-3xl'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>{selectedDay.type}</h1>
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
          <p className='mt-4 text-sm'>{selectedDay.circuit_info}</p>
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
                <span>{selectedDay.exercises[currentExerciseIndex].name}</span>
                {getExerciseIcon(selectedDay.exercises[currentExerciseIndex].type)}
              </CardTitle>
              <CardDescription className='capitalize'>
                {selectedDay.exercises[currentExerciseIndex].muscle}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-4 mb-4'>
                <div>
                  <p className='text-sm font-medium'>Peso</p>
                  <p className='text-2xl font-bold'>
                    {selectedDay.exercises[currentExerciseIndex].weight}
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium'>Tipo</p>
                  <p className='text-2xl font-bold capitalize'>
                    {selectedDay.exercises[currentExerciseIndex].type}
                  </p>
                </div>
              </div>
              <p className='text-sm mb-4'>{selectedDay.exercises[currentExerciseIndex].comment}</p>
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 mb-12'>
                {Array.from({ length: selectedDay.exercises[currentExerciseIndex].series }).map(
                  (_, seriesIndex) => {
                    const isCompleted =
                      completedSeries[`${selectedDay.day}-${currentExerciseIndex}`]?.[
                        seriesIndex
                      ] || false;
                    return (
                      <button
                        key={seriesIndex}
                        onClick={() => handleSeriesComplete(currentExerciseIndex, seriesIndex)}
                        className={`p-4 rounded-lg text-center transition-colors ${
                          isCompleted
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-muted hover:outline hover:outline-primary'
                        }`}
                      >
                        <span className='text-lg font-semibold block'>Serie {seriesIndex + 1}</span>
                        <span className='text-lg font-semibold block'>
                          Repeticiones: {selectedDay.exercises[currentExerciseIndex].repetitions}
                        </span>
                        <span className='text-sm'>{isCompleted ? 'Completada' : 'Pendiente'}</span>
                      </button>
                    );
                  }
                )}
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
                    currentExerciseIndex === selectedDay.exercises.length - 1 &&
                    !isAllExercisesCompleted
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
            {selectedDay.exercises.map((exercise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-colors ${
                    isExerciseCompleted(index)
                      ? 'bg-green-500'
                      : 'hover:bg-muted hover:border hover:border-primary'
                  }`}
                  onClick={() => handleSelectExercise(index)}
                >
                  <CardHeader>
                    <CardTitle className='flex items-center justify-between'>
                      <span>{exercise.name}</span>
                      {getExerciseIcon(exercise.type)}
                    </CardTitle>
                    <CardDescription>{exercise.muscle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-2 gap-4 mb-4'>
                      <div>
                        <p className='text-sm font-medium'>Series</p>
                        <p className='text-xl font-bold'>{exercise.series}</p>
                      </div>
                      <div>
                        <p className='text-sm font-medium'>Repeticiones</p>
                        <p className='text-xl font-bold'>{exercise.repetitions}</p>
                      </div>
                    </div>
                    <p className='text-sm mb-2'>{exercise.comment}</p>
                    <Progress
                      value={
                        ((completedSeries[`${selectedDay.day}-${index}`]?.filter(Boolean).length ||
                          0) /
                          exercise.series) *
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
