'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Exercise, TrainingDay } from '@/types/types';
import { ExerciseSet } from './ExerciseCardComponents/ExerciseSet';
import Timer from './ExerciseCardComponents/TimerComponent';
import { useComments } from '@/hooks/useComments';
import EditExerciseModal from './Modals/EditExerciseModal';
import ExerciseInfoModal from './Modals/ExerciseInfoModal';
import { ExerciseHeader } from './ExerciseCardComponents/ExerciseHeader';
import CommentsSection from './ExerciseCardComponents/CommentsSection';
import { NavigationButtons } from './ExerciseCardComponents/NavigationButtons';

interface ExerciseCardProps {
  data: TrainingDay;
  userId: string;
  onDayComplete: () => void;
}

export function ExerciseCard({ data, userId, onDayComplete }: ExerciseCardProps) {
  const [completedSets, setCompletedSets] = useState<{ [key: string]: boolean[] }>({});
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(data.exercises[0]);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isAllExercisesCompleted, setIsAllExercisesCompleted] = useState(false);

  const { newComment, setNewComment, addComment, deleteComment } = useComments(
    data,
    () => {}, // Remove setData as it's no longer needed here
    currentExercise,
    userId
  );

  // Initialize completed sets
  useEffect(() => {
    const initialCompletedSets: { [key: string]: boolean[] } = {};
    data.exercises.forEach((exercise) => {
      initialCompletedSets[exercise.id] = new Array(exercise.sets.length).fill(false);
    });
    setCompletedSets(initialCompletedSets);
    setCurrentExerciseIndex(0);
    setCurrentExercise(data.exercises[0]);
    setStartTime(new Date());
  }, [data]);

  // Check for all exercises completion
  useEffect(() => {
    const allCompleted = data.exercises.every((exercise) =>
      completedSets[exercise.id]?.every(Boolean)
    );
    setIsAllExercisesCompleted(allCompleted);
  }, [completedSets, data.exercises]);

  const handleTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    return time > 60 ? `${minutes} min` : `${time} seg`;
  };

  const handleSetComplete = (exerciseId: string, setIndex: number) => {
    const updatedSets = [...completedSets[exerciseId]];
    updatedSets[setIndex] = !updatedSets[setIndex];
    setCompletedSets({ ...completedSets, [exerciseId]: updatedSets });

    if (updatedSets.every(Boolean)) {
      handleNextExercise();
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

  const handleFinishDay = () => {
    const endTime = new Date();
    const duration = (endTime.getTime() - startTime.getTime()) / 1000;

    toast({
      title: '¡Entrenamiento completado!',
      description: `Has completado el ${data.title} de tu plan de entrenamiento en ${Math.round(
        duration
      )} segundos.`,
    });

    onDayComplete();
  };

  const handleSetEdit = (setIndex: number, field: string, value: number | null) => {
    if (currentExercise) {
      const updatedExercises = [...data.exercises];
      const exerciseIndex = updatedExercises.findIndex((e) => e.id === currentExercise.id);
      if (exerciseIndex !== -1) {
        const currentSet = updatedExercises[exerciseIndex].sets[setIndex] as Record<string, any>;
        currentSet[field] = value;
        currentSet.updatedAt = new Date();
      }
    }
  };

  const openInfoModal = () => {
    setIsInfoModalOpen(true);
  };

  return (
    <Card>
      <ExerciseHeader
        title={currentExercise?.title || ''}
        muscleGroup={currentExercise?.muscleGroup || ''}
        description={currentExercise?.description || ''}
        onInfoClick={openInfoModal}
        onEditClick={() => setIsEditModalOpen(true)}
      />
      <CardContent>
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4'>
          {currentExercise?.sets.map((set, setIndex) => (
            <ExerciseSet
              key={set.id}
              set={set}
              setIndex={setIndex}
              isCompleted={completedSets[currentExercise.id]?.[setIndex] || false}
              onSetComplete={() => handleSetComplete(currentExercise.id, setIndex)}
              handleTime={handleTime}
            />
          ))}
        </div>

        {currentExercise?.sets.some((set) => set.duration && set.duration > 0) && (
          <Timer
            duration={currentExercise?.sets[0]?.duration || 30}
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

        <NavigationButtons
          isAllExercisesCompleted={isAllExercisesCompleted}
          currentExerciseIndex={currentExerciseIndex}
          exercisesLength={data.exercises.length}
          onPrevious={handlePreviousExercise}
          onNext={handleNextExercise}
          onFinish={handleFinishDay}
        />
      </CardContent>

      <EditExerciseModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        exercise={currentExercise}
        onSetEdit={handleSetEdit}
      />

      <ExerciseInfoModal
        isOpen={isInfoModalOpen}
        onOpenChange={setIsInfoModalOpen}
        exercise={currentExercise}
      />
    </Card>
  );
}
