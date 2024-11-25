'use server';

import { db } from '@/server/db/prisma';
import { Set } from '@/types/types';

// Definimos el tipo de datos que esperamos recibir
interface UpdateExerciseInput {
  id: string;
  title: string;
  description?: string;
  category: string;
  muscleGroup: string;
  sets: Set[];
}

export async function updateExerciseAction(input: UpdateExerciseInput) {
  const { id, title, description, category, muscleGroup, sets } = input;

  try {
    // Actualizar el ejercicio principal
    const updatedExercise = await db.exercise.update({
      where: { id },
      data: {
        title,
        description,
        category,
        muscleGroup,
        updatedAt: new Date(),
      },
    });

    // Gestionar las series (borrado, actualización o creación)
    const setPromises = sets.map(async (set) => {
      if (set.id.startsWith('new-set')) {
        // Crear una nueva serie si el ID es temporal
        return db.set.create({
          data: {
            exerciseId: id,
            repetitions: set.repetitions,
            weight: set.weight || null,
            duration: set.duration || null,
            restTime: set.restTime || null,
          },
        });
      } else {
        // Actualizar una serie existente
        return db.set.update({
          where: { id: set.id },
          data: {
            repetitions: set.repetitions,
            weight: set.weight || null,
            duration: set.duration || null,
            restTime: set.restTime || null,
            updatedAt: new Date(),
          },
        });
      }
    });

    // Borrar sets que no estén en la nueva lista
    const existingSetIds = sets.filter((set) => !set.id.startsWith('new-set')).map((set) => set.id);
    await db.set.deleteMany({
      where: {
        exerciseId: id,
        NOT: { id: { in: existingSetIds } },
      },
    });

    await Promise.all(setPromises);

    return updatedExercise;
  } catch (error) {
    console.error('Error updating exercise:', error);
    throw new Error('No se pudo actualizar el ejercicio. Inténtalo nuevamente.');
  }
}
