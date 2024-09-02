// src/lib/services/setService.ts
import { db } from '@/server/db/prisma';
import { Set } from '@prisma/client';

export const getSetsByExercise = async (exerciseId: string): Promise<Set[]> => {
  return db.set.findMany({
    where: {
      exerciseId,
    },
  });
};

export const createSet = async (setData: {
  exerciseId: string;
  repetitions: number;
  weight?: number;
  duration?: number;
  restTime?: number;
}): Promise<Set> => {
  return db.set.create({
    data: setData,
  });
};

export const updateSet = async (
  setId: string,
  updates: Partial<{
    repetitions: number;
    weight?: number;
    duration?: number;
    restTime?: number;
  }>
): Promise<Set> => {
  return db.set.update({
    where: { id: setId },
    data: updates,
  });
};
