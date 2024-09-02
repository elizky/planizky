// src/lib/services/exerciseService.ts
import { db } from '@/server/db/prisma';
import { Exercise } from '@prisma/client';

export const getExercisesByTrainingDay = async (trainingDayId: string): Promise<Exercise[]> => {
  return db.exercise.findMany({
    where: {
      trainingDayId,
    },
  });
};

export const createExercise = async (exerciseData: {
  title: string;
  description?: string;
  category: string;
  muscleGroup: string;
  trainingDayId?: string;
}): Promise<Exercise> => {
  return db.exercise.create({
    data: exerciseData,
  });
};

export const updateExercise = async (
  exerciseId: string,
  updates: Partial<{
    title: string;
    description?: string;
    category: string;
    muscleGroup: string;
    trainingDayId?: string;
  }>
): Promise<Exercise> => {
  return db.exercise.update({
    where: { id: exerciseId },
    data: updates,
  });
};
