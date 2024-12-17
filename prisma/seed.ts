import { PrismaClient } from '@prisma/client';
import * as deepl from 'deepl-node';

const prisma = new PrismaClient();
const BASE_URL = 'https://exercisedb.p.rapidapi.com/exercises';
const LIMIT = 100;
const TOTAL = 1324;

const translator = new deepl.Translator('3f1b798f-2bef-4800-83e5-e298daab6f67:fx');
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '36f99e638fmsh8781151a13f4f69p1b364djsn0941ec50a2d2',
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
  },
};

// Mapeo de bodyPart a categorías
const bodyPartToCategory: Record<string, string> = {
  back: 'Fuerza',
  cardio: 'Cardiovascular',
  chest: 'Hipertrofia',
  'lower arms': 'Estabilización',
  'lower legs': 'Peso Corporal',
  neck: 'Movilidad y Flexibilidad',
  shoulders: 'Fuerza',
  'upper arms': 'Hipertrofia',
  'upper legs': 'Peso Corporal',
  waist: 'Core',
};

async function translateText(text: string): Promise<string> {
  try {
    const result = await translator.translateText(text, null, 'es'); // Traduce al español
    return result.text; // Devuelve el texto traducido
  } catch (error) {
    console.error(`Error traduciendo "${text}":`, error);
    return text; // En caso de error, devuelve el texto original
  }
}

async function fetchExercises() {
  try {
    for (let offset = 0; offset < TOTAL; offset += LIMIT) {
      const url = `${BASE_URL}?limit=${LIMIT}&offset=${offset}`;
      const response = await fetch(url, options);
      const exercises = await response.json();

      // Obtener las categorías de la base de datos para vincularlas
      const categories = await prisma.category.findMany();
      const categoryMap = categories.reduce<Record<string, string>>((acc, category) => {
        acc[category.name] = category.id;
        return acc;
      }, {});

      // Transforma los datos para que coincidan con el modelo de Prisma
      const transformedExercises = await Promise.all(
        exercises.map(async (exercise: any) => {
          const categoryName = bodyPartToCategory[exercise.bodyPart.toLowerCase()] || 'General';
          const categoryId = categoryMap[categoryName] || null;

          return {
            id: exercise.id,
            title: await translateText(exercise.name),
            englishTitle: exercise.name,
            description: null,
            videoUrl: exercise.gifUrl,
            muscleGroup: await translateText(exercise.bodyPart || 'General'),
            difficulty: 'Medium', // Por defecto o ajusta según tus reglas
            equipment: [await translateText(exercise.equipment)],
            primaryMuscles: [await translateText(exercise.target)],
            secondaryMuscles: await Promise.all(
              (exercise.secondaryMuscles || []).map(translateText)
            ),
            tips: await Promise.all((exercise.instructions || []).map(translateText)),
            safetyWarnings: [],
            categoryId: categoryId,
          };
        })
      );

      // Inserta los ejercicios en la base de datos
      await prisma.exerciseCatalog.createMany({
        data: transformedExercises,
        skipDuplicates: true, // Evita duplicados si se reinicia el script
      });

      console.log(`Lote desde offset ${offset} insertado correctamente.`);
    }
  } catch (error) {
    console.error('Error al procesar ejercicios:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fetchExercises()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
