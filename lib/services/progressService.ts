// src/lib/services/progressService.ts
import { db } from '@/server/db/prisma';
import { Progress } from '@prisma/client';

export const getProgressByTrainingDay = async (trainingDayId: string): Promise<Progress[]> => {
  return db.progress.findMany({
    where: {
      trainingDayId,
    },
  });
};

export const createProgress = async (progressData: {
  userId: string;
  trainingDayId?: string;
  date: Date;
  weight?: number;
  notes?: string;
  stats: any;
}): Promise<Progress> => {
  return db.progress.create({
    data: progressData,
  });
};

export const updateProgress = async (
  progressId: string,
  updates: Partial<{
    date: Date;
    weight?: number;
    notes?: string;
    stats: any;
  }>
): Promise<Progress> => {
  return db.progress.update({
    where: { id: progressId },
    data: updates,
  });
};
