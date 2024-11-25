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
  AlarmClock,
  Edit2,
  HelpCircle,
  Trash,
} from 'lucide-react';

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
import Timer from './ExerciseCardComponents/TimerComponent';
import ExerciseListItem from './ExerciseListItem';
import { useComments } from '@/hooks/useComments';
import CommentsSection from './ExerciseCardComponents/CommentsSection';

export default function TrainingDayComponent({ data: initialData }: { data: TrainingDay }) {
  const router = useRouter();
  const [data, setData] = useState<TrainingDay>(initialData);
  const [completedSets, setCompletedSets] = useState<{ [key: string]: boolean[] }>({});
  const [progress, setProgress] = useState(0);
  const [isDayCompleted, setIsDayCompleted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('exercise');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);

  const userId = data.plan.user.id;

  const { newComment, setNewComment, addComment, deleteComment } = useComments(
    data,
    setData,
    currentExercise,
    userId
  );

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
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4'>
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
        {currentExercise?.sets.some((set) => set.duration && set.duration > 0) && (
          <Timer
            duration={currentExercise?.sets[0]?.duration || 30} // Duración predeterminada de la serie
            onFinish={() =>
              toast({ title: '¡Serie completada!', description: 'Continúa al siguiente set.' })
            }
          />
        )}
        <CommentsSection
          comments={currentExercise?.comments || []}
          newComment={newComment}
          onNewCommentChange={setNewComment}
          onAddComment={addComment}
          onDeleteComment={deleteComment}
        />
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
      <p className='my-4 text-sm'>{data.description}</p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className='mb-6'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='exercise'>Ejercicio Actual</TabsTrigger>
          <TabsTrigger value='all'>Todos los Ejercicios</TabsTrigger>
        </TabsList>
        <TabsContent value='exercise'>{renderExerciseCard()}</TabsContent>
        <TabsContent value='all'>
          <div className='space-y-4'>
            {data.exercises.map((exercise, index) => (
              <ExerciseListItem
                key={exercise.id}
                exercise={exercise}
                index={index}
                isCompleted={isExerciseCompleted(exercise.id)}
                completedSets={completedSets}
                onSelect={handleSelectExercise}
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
        {isDayCompleted && (
          <Button onClick={handleFinishDay} className='w-full mt-4'>
            Finalizar Día de Entrenamiento
          </Button>
        )}
      </div>
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
