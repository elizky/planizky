import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear Usuario
  const user1 = await prisma.user.create({
    data: {
      name: 'User One',
      email: 'user1@example.com',
      role: 'user',
      accounts: {
        create: {
          type: 'oauth',
          provider: 'google',
          providerAccountId: 'user1-google-id',
        },
      },
    },
  });

  // Crear Plan
  const plan1 = await prisma.plan.create({
    data: {
      title: 'Plan de Resistencia',
      description: 'Un plan enfocado en mejorar la resistencia y fuerza.',
      isActive: true,
      startDate: new Date(),
      userId: user1.id,
    },
  });

  // Crear Días de Entrenamiento
  const trainingDay1 = await prisma.trainingDay.create({
    data: {
      title: 'Día 1 - Cardio y Fuerza',
      type: 'CARDIO',
      description: 'Entrenamiento enfocado en ejercicios de cardio y fuerza.',
      completedCount: 0,
      completionTimes: [],
      completionDurations: [],
      date: [new Date()],
      planId: plan1.id,
    },
  });

  // Crear Ejercicios
  const exercise1 = await prisma.exercise.create({
    data: {
      title: 'Sentadilla con barra',
      description: 'Ejercicio de fuerza para piernas y glúteos.',
      category: 'STRENGTH',
      muscleGroup: 'PIERNAS',
      trainingDayId: trainingDay1.id,
    },
  });

  const exercise2 = await prisma.exercise.create({
    data: {
      title: 'Press de banca',
      description: 'Ejercicio para pectorales y fuerza superior.',
      category: 'STRENGTH',
      muscleGroup: 'PECHO',
      trainingDayId: trainingDay1.id,
    },
  });

  // Crear Sets para Ejercicios
  await prisma.set.createMany({
    data: [
      {
        repetitions: 12,
        weight: 60,
        restTime: 90,
        duration: 0,
        exerciseId: exercise1.id,
      },
      {
        repetitions: 10,
        weight: 70,
        restTime: 120,
        duration: 0,
        exerciseId: exercise1.id,
      },
      {
        repetitions: 8,
        weight: 80,
        restTime: 150,
        duration: 0,
        exerciseId: exercise2.id,
      },
    ],
  });

  // Crear Progreso de Usuario
  await prisma.progress.create({
    data: {
      date: new Date(),
      weight: 98,
      notes: 'Progreso inicial del plan.',
      stats: {},
      userId: user1.id,
      trainingDayId: trainingDay1.id,
    },
  });

  // Crear Comentarios
  await prisma.comment.create({
    data: {
      content: 'Buen entrenamiento, podrías aumentar el peso en la próxima sesión.',
      userId: user1.id,
      exerciseId: exercise1.id,
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
