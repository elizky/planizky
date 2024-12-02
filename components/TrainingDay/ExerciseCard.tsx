'use client';
import { useState, useEffect } from 'react';
import { Edit2, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';
import { Exercise, TrainingDay } from '@/types/types';
import { toast } from '@/components/ui/use-toast';
import { ExerciseSet } from './ExerciseCardComponents/ExerciseSet';
import Timer from './ExerciseCardComponents/TimerComponent';
import { useComments } from '@/hooks/useComments';
import EditExerciseModal from './Modals/EditExerciseModal';
import ExerciseInfoModal from './Modals/ExerciseInfoModal';
import CommentsSection from './ExerciseCardComponents/CommentsSection';
import { NavigationButtons } from './ExerciseCardComponents/NavigationButtons';

interface ExerciseCardProps {
  data: TrainingDay;
  userId: string;
  onDayComplete: () => void;
  onProgressChange?: (progress: number) => void;
  completedSets: { [key: string]: boolean[] };
  setCompletedSets: React.Dispatch<React.SetStateAction<{ [key: string]: boolean[] }>>;
  selectedExerciseIndex: number;
  setSelectedExerciseIndex: (index: number) => void;
}

export function ExerciseCard({
  data,
  userId,
  onDayComplete,
  onProgressChange,
  completedSets,
  setCompletedSets,
  selectedExerciseIndex,
  setSelectedExerciseIndex,
}: ExerciseCardProps) {
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(
    data.exercises[selectedExerciseIndex]
  );
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isAllExercisesCompleted, setIsAllExercisesCompleted] = useState(false);
  const [selectedSetIndex, setSelectedSetIndex] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(
    () => currentExercise?.sets.find((set) => set.duration && set.duration > 0)?.duration || 30
  );

  const { newComment, setNewComment, addComment, deleteComment } = useComments(
    data,
    () => {}, // Remove setData as it's no longer needed here
    currentExercise,
    userId
  );

  // Check for all exercises completion
  useEffect(() => {
    const allCompleted = data.exercises.every((exercise) =>
      completedSets[exercise.id]?.every(Boolean)
    );
    setIsAllExercisesCompleted(allCompleted);
  }, [completedSets, data.exercises]);

  // Add this effect to calculate and emit progress
  useEffect(() => {
    const totalSets = data.exercises.reduce((total, exercise) => total + exercise.sets.length, 0);
    const completedSetsCount = Object.values(completedSets).flat().filter(Boolean).length;
    const newProgress = (completedSetsCount / totalSets) * 100;
    onProgressChange?.(newProgress);
  }, [completedSets, data.exercises, onProgressChange]);

  // Add this effect to update currentExercise when selectedExerciseIndex changes
  useEffect(() => {
    setCurrentExercise(data.exercises[selectedExerciseIndex]);
  }, [selectedExerciseIndex, data.exercises]);

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
    if (selectedExerciseIndex < data.exercises.length - 1) {
      setSelectedExerciseIndex(selectedExerciseIndex + 1);
    }
  };

  const handlePreviousExercise = () => {
    if (selectedExerciseIndex > 0) {
      setSelectedExerciseIndex(selectedExerciseIndex - 1);
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

  const handleExerciseEdit = (updatedExercise: Exercise) => {
    const updatedExercises = [...data.exercises];
    const exerciseIndex = updatedExercises.findIndex((e) => e.id === updatedExercise.id);
    if (exerciseIndex !== -1) {
      updatedExercises[exerciseIndex] = updatedExercise;
      setCurrentExercise(updatedExercise);
    }
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const openInfoModal = () => {
    setIsInfoModalOpen(true);
  };

  return (
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
          <Button variant='ghost' size='icon' onClick={openEditModal}>
            <Edit2 className='h-4 w-4' />
          </Button>
        </div>
        <CardDescription>{currentExercise?.description}</CardDescription>
      </CardHeader>
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
          <div className='space-y-2'>
            {currentExercise.sets.filter((set) => set.duration && set.duration > 0).length > 1 && (
              <Select
                value={selectedSetIndex.toString()}
                onValueChange={(value) => {
                  const index = Number(value);
                  setSelectedSetIndex(index);
                  setSelectedDuration(currentExercise.sets[index].duration || 30);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Selecciona una serie' />
                </SelectTrigger>
                <SelectContent>
                  {currentExercise.sets.map((set, index) =>
                    set.duration && set.duration > 0 ? (
                      <SelectItem key={index} value={index.toString()}>
                        Serie {index + 1} - {set.duration} segundos
                      </SelectItem>
                    ) : null
                  )}
                </SelectContent>
              </Select>
            )}
            <Timer
              duration={selectedDuration}
              onFinish={() =>
                toast({ title: '¡Serie completada!', description: 'Continúa al siguiente set.' })
              }
            />
          </div>
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
          currentExerciseIndex={selectedExerciseIndex}
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
        onExerciseEdit={handleExerciseEdit}
      />

      <ExerciseInfoModal
        isOpen={isInfoModalOpen}
        onOpenChange={setIsInfoModalOpen}
        exercise={currentExercise}
      />
    </Card>
  );
}
