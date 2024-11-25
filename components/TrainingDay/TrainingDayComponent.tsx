'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  Edit2,
  Play,
  Pause,
  RotateCcw,
  Flag,
  Target,
  Flame,
  HelpCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { TrainingDay, Exercise } from '@/types/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Timer } from 'lucide-react';

export default function TrainingDayComponent({ data }: { data: TrainingDay }) {
  const router = useRouter();
  const [completedSets, setCompletedSets] = useState<{ [key: string]: boolean[] }>({});
  const [progress, setProgress] = useState(0);
  const [isDayCompleted, setIsDayCompleted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('exercise');
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    const initialCompletedSets: { [key: string]: boolean[] } = {};
    data.exercises.forEach((exercise) => {
      initialCompletedSets[exercise.id] = new Array(exercise.sets.length).fill(false);
    });
    setCompletedSets(initialCompletedSets);
    setIsDayCompleted(false);
    setStartTime(new Date());
    setCurrentExerciseIndex(0);
    setCurrentExercise(data.exercises[0]);
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
      setCurrentExercise(data.exercises[currentExerciseIndex + 1]);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setCurrentExercise(data.exercises[currentExerciseIndex - 1]);
    }
  };

  const handleSelectExercise = (index: number) => {
    if (isExerciseCompleted(data.exercises[index].id)) return;
    setCurrentExerciseIndex(index);
    setCurrentExercise(data.exercises[index]);
    setActiveTab('exercise');
  };

  const isExerciseCompleted = (exerciseId: string) => {
    return completedSets[exerciseId]?.every(Boolean) || false;
  };

  const isAllExercisesCompleted = data.exercises.every((exercise) =>
    isExerciseCompleted(exercise.id)
  );

  const handleTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    return time > 60 ? `${minutes} min` : `${time} seg`;
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimer(0);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 10);
      }, 10);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timer]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  };

  const addComment = () => {
    if (newComment.trim() && currentExercise) {
      const updatedExercises = [...data.exercises];
      const exerciseIndex = updatedExercises.findIndex((e) => e.id === currentExercise.id);
      if (exerciseIndex !== -1) {
        updatedExercises[exerciseIndex].comments = [
          ...(updatedExercises[exerciseIndex].comments || []),
          {
            id: Date.now().toString(),
            content: newComment,
            userId: 'current-user-id',
            exerciseId: currentExercise.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
        setNewComment('');
        // Update the data state here if you have a setData function
        // setData({ ...data, exercises: updatedExercises });
      }
    }
  };

  const handleSetEdit = (setIndex: number, field: string, value: number | null) => {
    if (currentExercise) {
      const updatedExercises = [...data.exercises];
      const exerciseIndex = updatedExercises.findIndex((e) => e.id === currentExercise.id);
      if (exerciseIndex !== -1) {
        const currentSet = updatedExercises[exerciseIndex].sets[setIndex] as Record<string, any>;
        currentSet[field] = value;
        currentSet.updatedAt = new Date();
        // Update the data state here if you have a setData function
        // setData({ ...data, exercises: updatedExercises });
      }
    }
  };

  const openInfoModal = () => {
    setIsInfoModalOpen(true);
  };

  const renderExerciseCard = () => (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between capitalize'>
          {currentExercise?.title}
          <Button variant='ghost' size='icon' onClick={openInfoModal}>
            <HelpCircle className='h-4 w-4' />
          </Button>
        </CardTitle>
        <div className='flex justify-between items-center'>
          <CardDescription className='capitalize'>{currentExercise?.muscleGroup}</CardDescription>
          <Button variant='ghost' size='icon' onClick={() => setIsEditModalOpen(true)}>
            <Edit2 className='h-4 w-4' />
          </Button>
        </div>
        <CardDescription>{currentExercise?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex justify-center items-center space-x-2 mb-4'>
          <Timer className='w-5 h-5' />
          <span className='text-2xl font-mono'>{formatTime(timer)}</span>
          <Button size='icon' variant='outline' onClick={isRunning ? pauseTimer : startTimer}>
            {isRunning ? <Pause className='h-4 w-4' /> : <Play className='h-4 w-4' />}
          </Button>
          <Button size='icon' variant='outline' onClick={resetTimer}>
            <RotateCcw className='h-4 w-4' />
          </Button>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 mb-12'>
          {currentExercise?.sets.map((set, setIndex) => {
            const isCompleted = completedSets[currentExercise.id]?.[setIndex] || false;
            return (
              <button
                key={set.id}
                onClick={() => handleSetComplete(currentExercise.id, setIndex)}
                className={`p-4 rounded-lg text-center transition-colors ${
                  isCompleted
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-muted hover:outline hover:outline-primary'
                }`}
              >
                <span className='text-lg font-semibold block'>Serie {setIndex + 1}</span>
                <span className='text-sm block'>
                  Reps: {set.repetitions > 0 ? set.repetitions : '-'}
                </span>
                <span className='text-sm block'>
                  Peso: {set.weight && set.weight > 0 ? `${set.weight} kg` : '-'}
                </span>
                <span className='text-sm block'>
                  Duracion: {set.duration && set.duration > 0 ? handleTime(set.duration) : '-'}
                </span>
              </button>
            );
          })}
        </div>
        <div className='mt-4'>
          <h3 className='font-semibold mb-2'>Comentarios</h3>
          {currentExercise?.comments?.map((comment) => (
            <div key={comment.id} className='bg-muted p-2 rounded mb-2'>
              <p className='text-sm'>{comment.content}</p>
              <p className='text-xs text-muted-foreground'>
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
          <div className='flex justify-between gap-2 my-4'>
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder='Añade un comentario...'
              className='w-3/4'
            />
            <Button onClick={addComment} className='w-1/4'>
              Añadir
            </Button>
          </div>
        </div>
        <div className='flex justify-between mt-4'>
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
        <TabsContent value='exercise'>{renderExerciseCard()}</TabsContent>
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
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar {currentExercise?.title}</DialogTitle>
          </DialogHeader>
          <div className='mt-4'>
            <table className='w-full'>
              <thead>
                <tr>
                  <th className='text-left'>Serie</th>
                  <th className='text-left'>Reps</th>
                  <th className='text-left'>Peso (kg)</th>
                  <th className='text-left'>Duración (seg)</th>
                  <th className='text-left'>Descanso (seg)</th>
                </tr>
              </thead>
              <tbody>
                {currentExercise?.sets.map((set, index) => (
                  <tr key={set.id}>
                    <td>{index + 1}</td>
                    <td>
                      <Input
                        type='number'
                        value={set.repetitions}
                        onChange={(e) =>
                          handleSetEdit(index, 'repetitions', parseInt(e.target.value))
                        }
                        className='w-16'
                      />
                    </td>
                    <td>
                      <Input
                        type='number'
                        value={set.weight ?? ''}
                        onChange={(e) => handleSetEdit(index, 'weight', parseInt(e.target.value))}
                        className='w-16'
                      />
                    </td>
                    <td>
                      <Input
                        type='number'
                        value={set.duration ?? ''}
                        onChange={(e) => handleSetEdit(index, 'duration', parseInt(e.target.value))}
                        className='w-16'
                      />
                    </td>
                    <td>
                      <Input
                        type='number'
                        value={set.restTime ?? ''}
                        onChange={(e) => handleSetEdit(index, 'restTime', parseInt(e.target.value))}
                        className='w-16'
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsEditModalOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentExercise?.title}</DialogTitle>
          </DialogHeader>
          <div className='mt-4'>
            <p>{currentExercise?.description}</p>
            {/* Add a video player here */}
            <video controls className='w-full mt-4'>
              <source src='/placeholder-video.mp4' type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsInfoModalOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
