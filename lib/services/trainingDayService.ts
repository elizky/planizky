import { db } from '@/server/db/prisma';
import { TrainingDay } from '@prisma/client';

// Crear un nuevo día de entrenamiento
export async function createTrainingDay(data: {
  planId: string;
  title: string;
  type: string;
  description?: string;
  date: Date[];
}): Promise<TrainingDay> {
  return await db.trainingDay.create({
    data,
  });
}

// Obtener todos los días de entrenamiento de un plan
export async function getTrainingDaysByPlan(planId: string): Promise<TrainingDay[]> {
  return await db.trainingDay.findMany({
    where: { planId },
    orderBy: { createdAt: 'desc' },
  });
}

// Obtener un día de entrenamiento por ID
export async function getTrainingDayById(trainingDayId: string): Promise<TrainingDay | null> {
  return await db.trainingDay.findUnique({
    where: { id: trainingDayId },
    include: {
      exercises: {
        include: {
          sets: true,
          comments: true,
        },
      },
      comments: true,
      progress: true,
    },
  });
}

// Actualizar un día de entrenamiento
export async function updateTrainingDay(
  trainingDayId: string,
  data: Partial<TrainingDay>
): Promise<TrainingDay> {
  return await db.trainingDay.update({
    where: { id: trainingDayId },
    data,
  });
}

// Eliminar un día de entrenamiento
export async function deleteTrainingDay(trainingDayId: string): Promise<TrainingDay> {
  return await db.trainingDay.delete({
    where: { id: trainingDayId },
  });
}
