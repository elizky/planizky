'use server';

import { auth } from '@/auth';
import { db } from '@/server/db/prisma';
import { PlanSchema } from '@/types/formSchemas';
import { revalidatePath } from 'next/cache';

export async function createPlan(data: PlanSchema) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return { error: 'Not authenticated' };
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { error: 'User not found' };
    }

    // Start a transaction to handle both plan creation and activation
    const result = await db.$transaction(async (tx) => {
      // Deactivate all existing plans for the user
      await tx.plan.updateMany({
        where: {
          userId: user.id,
          isActive: true,
        },
        data: { isActive: false },
      });

      // Create the new plan (automatically active)
      const plan = await tx.plan.create({
        data: {
          userId: user.id,
          title: data.title,
          description: data.description,
          startDate: new Date(),
          isActive: true, // Set the new plan as active
          trainingDays: {
            create: data.trainingDays.map((day) => ({
              title: day.title,
              description: day.description,
              type: day.type,
              settings: day.settings || {},
              exercises: {
                create: day.exercises.map((exercise) => ({
                  title: exercise.title,
                  description: exercise.description,
                  category: exercise.category,
                  muscleGroup: exercise.muscleGroup,
                  videoUrl: exercise.videoUrl,
                  sets: {
                    create: exercise.sets.map((set) => ({
                      repetitions: set.repetitions || 0,
                      weight: set.weight || null,
                      duration: set.duration || null,
                      restTime: set.restTime || null,
                    })),
                  },
                })),
              },
            })),
          },
        },
      });

      return plan;
    });

    revalidatePath('/gym-plans');
    revalidatePath('/dashboard');
    return { success: true, plan: result };
  } catch (error) {
    console.error('Error creating plan:', error);
    return { error: 'Failed to create plan' };
  }
}

export async function editPlan(planId: string, data: PlanSchema) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return { error: 'Not authenticated' };
    }

    // Verify plan ownership
    const plan = await db.plan.findUnique({
      where: { id: planId },
      include: { user: true },
    });

    if (!plan || plan.user.email !== session.user.email) {
      return { error: 'Plan not found or unauthorized' };
    }

    // Update the plan and its related data
    const updatedPlan = await db.$transaction(async (tx) => {
      // First, get all training day IDs
      const trainingDays = await tx.trainingDay.findMany({
        where: { planId },
        select: { id: true },
      });
      const trainingDayIds = trainingDays.map(day => day.id);

      // Delete related data in the correct order
      // 1. Delete sets
      await tx.set.deleteMany({
        where: {
          exercise: {
            trainingDayId: { in: trainingDayIds },
          },
        },
      });

      // 2. Delete exercises
      await tx.exercise.deleteMany({
        where: {
          trainingDayId: { in: trainingDayIds },
        },
      });

      // 3. Delete training days
      await tx.trainingDay.deleteMany({
        where: { planId },
      });

      // 4. Update plan with new data
      const updated = await tx.plan.update({
        where: { id: planId },
        data: {
          title: data.title,
          description: data.description,
          trainingDays: {
            create: data.trainingDays.map((day) => ({
              title: day.title,
              description: day.description,
              type: day.type,
              settings: day.settings || {},
              exercises: {
                create: day.exercises.map((exercise) => ({
                  title: exercise.title,
                  description: exercise.description,
                  category: exercise.category,
                  muscleGroup: exercise.muscleGroup,
                  videoUrl: exercise.videoUrl,
                  sets: {
                    create: exercise.sets.map((set) => ({
                      repetitions: set.repetitions || 0,
                      weight: set.weight || null,
                      duration: set.duration || null,
                      restTime: set.restTime || null,
                    })),
                  },
                })),
              },
            })),
          },
        },
      });

      return updated;
    });

    revalidatePath('/gym-plans');
    revalidatePath('/dashboard');
    return { success: true, plan: updatedPlan };
  } catch (error) {
    console.error('Error updating plan:', error);
    return { error: 'Failed to update plan' };
  }
}

export async function deletePlan(planId: string) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return { error: 'Not authenticated' };
    }

    // Verify plan ownership
    const plan = await db.plan.findUnique({
      where: { id: planId },
      include: {
        user: true,
        trainingDays: {
          select: { id: true },
        },
      },
    });

    if (!plan || plan.user.email !== session.user.email) {
      return { error: 'Plan not found or unauthorized' };
    }

    const trainingDayIds = plan.trainingDays.map((day) => day.id);

    await db.$transaction(async (tx) => {
      // If this is the active plan and there are other plans, activate the most recent one
      if (plan.isActive) {
        const alternativePlan = await tx.plan.findFirst({
          where: {
            userId: plan.userId,
            id: { not: planId },
          },
          orderBy: { createdAt: 'desc' },
        });

        if (alternativePlan) {
          await tx.plan.update({
            where: { id: alternativePlan.id },
            data: { isActive: true },
          });
        }
      }

      // Delete all comments related to exercises in these training days
      await tx.comment.deleteMany({
        where: {
          OR: [
            { trainingDayId: { in: trainingDayIds } },
            { exercise: { trainingDayId: { in: trainingDayIds } } },
          ],
        },
      });

      // Delete all sets related to exercises in these training days
      await tx.set.deleteMany({
        where: {
          exercise: {
            trainingDayId: { in: trainingDayIds },
          },
        },
      });

      // Delete all exercises related to these training days
      await tx.exercise.deleteMany({
        where: {
          trainingDayId: { in: trainingDayIds },
        },
      });

      // Delete all training days
      await tx.trainingDay.deleteMany({
        where: {
          planId,
        },
      });

      // Finally, delete the plan
      await tx.plan.delete({
        where: { id: planId },
      });
    });

    revalidatePath('/gym-plans');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error deleting plan:', error);
    return { error: 'Failed to delete plan' };
  }
}

export async function getPlan(planId: string) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { error: 'Not authenticated' };
    }

    const plan = await db.plan.findUnique({
      where: {
        id: planId,
      },
      include: {
        trainingDays: {
          include: {
            exercises: {
              include: {
                sets: true,
              },
            },
          },
        },
      },
    });

    if (!plan) {
      return { error: 'Plan not found' };
    }

    // Verify ownership
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (plan.userId !== user?.id) {
      return { error: 'Unauthorized' };
    }

    return { success: true, plan };
  } catch (error) {
    console.error('Error fetching plan:', error);
    return { error: 'Failed to fetch plan' };
  }
}

export async function getPlans() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { error: 'Not authenticated' };
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { error: 'User not found' };
    }

    const plans = await db.plan.findMany({
      where: {
        userId: user.id,
      },
      include: {
        trainingDays: {
          include: {
            exercises: {
              include: {
                sets: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { success: true, plans };
  } catch (error) {
    console.error('Error fetching plans:', error);
    return { error: 'Failed to fetch plans' };
  }
}
