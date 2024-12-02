import { db } from '@/server/db/prisma';
import { Plan } from '@prisma/client';

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
        },
      },
      user: true,
    },
  });
}

// Actualizar un plan
export async function updateActivePlan(planId: string, data: Partial<Plan>): Promise<Plan> {
  return await db.plan.update({
    where: { id: planId },
    data: {
      isActive: data.isActive,
    },
  });
}
