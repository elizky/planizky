import { db } from '@/server/db/prisma';
import { Plan, User } from '@prisma/client';

// Crear un nuevo plan
export async function createPlan(data: {
  userId: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
}): Promise<Plan> {
  return await db.plan.create({
    data,
  });
}

// Obtener planes de entrenamiento con todos los datos relacionados
export async function getUserPlans(userEmail: string) {
  const prismaUser = await db.user.findUnique({
    where: { email: userEmail },
  });

  return db.plan.findMany({
    where: { userId: prismaUser?.id },
    include: {
      trainingDays: {
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
      },
      user: true,
    },
  });
}

// Obtener un plan por ID
export async function getPlanById(planId: string): Promise<Plan | null> {
  return await db.plan.findUnique({
    where: { id: planId },
  });
}

// Actualizar un plan
export async function updatePlan(planId: string, data: Partial<Plan>): Promise<Plan> {
  return await db.plan.update({
    where: { id: planId },
    data,
  });
}

// Eliminar un plan
export async function deletePlan(planId: string): Promise<Plan> {
  return await db.plan.delete({
    where: { id: planId },
  });
}
