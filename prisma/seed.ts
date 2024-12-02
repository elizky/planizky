// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// const dataMockForSeed = {
//   plan: {
//     title: 'Plan de Resistencia Avanzado',
//     description: 'Un plan avanzado para mejorar la resistencia y fuerza general.',
//     isActive: true,
//     startDate: new Date(),
//   },
//   trainingDays: [
//     {
//       title: 'Día 1 - Circuito Cuerpo Completo',
//       type: 'CARDIO',
//       description:
//         'Realiza todos los ejercicios en orden 4 veces seguidas con descansos mínimos entre ejercicios.',
//       date: [new Date()],
//     },
//     {
//       title: 'Día 2 - Pesas: Fuerza y Estabilidad',
//       type: 'STRENGTH',
//       description: 'Entrenamiento de fuerza para el tren superior y resistencia general.',
//       date: [new Date()],
//     },
//     {
//       title: 'Día 3 - Circuito Piernas y Core',
//       type: 'STRENGTH',
//       description:
//         'Realiza todos los ejercicios en orden 4 veces seguidas con descansos mínimos entre ejercicios.',
//       date: [new Date()],
//     },
//     {
//       title: 'Día 4 - Pesas + Movilidad y Estiramientos Funcionales',
//       type: 'STRENGTH',
//       description: 'Entrenamiento con pesas y movilidad funcional.',
//       date: [new Date()],
//     },
//   ],
//   exercises: [
//     // Ejercicios para el Día 1
//     {
//       title: 'Remo/Bicicleta',
//       description: 'Activación moderada de piernas.',
//       category: 'CARDIO',
//       muscleGroup: 'cuerpo completo',
//     },
//     {
//       title: 'Salto al cajón o Skipping con stepper',
//       description:
//         'Mejora la resistencia cardiovascular y la potencia de piernas. Ideal para tenis.',
//       category: 'PLYOMETRIC',
//       muscleGroup: 'gemelos, cuádriceps',
//     },
//     {
//       title: 'Sentadilla con mancuernas',
//       description: 'Activa cuádriceps y glúteos.',
//       category: 'STRENGTH',
//       muscleGroup: 'cuádriceps, glúteos',
//     },
//     {
//       title: 'Flexiones',
//       description: 'Trabaja pecho y tríceps.',
//       category: 'STRENGTH',
//       muscleGroup: 'pecho, tríceps',
//     },
//     {
//       title: 'Cuerdas de batalla',
//       description: 'Incrementa la resistencia y quema calorías.',
//       category: 'CARDIO',
//       muscleGroup: 'cuerpo completo',
//     },
//     {
//       title: 'Giros rusos',
//       description: 'Trabaja los oblicuos abdominales, esenciales para giros en tenis.',
//       category: 'STRENGTH',
//       muscleGroup: 'abdominales, oblicuos',
//     },
//     // Ejercicios para el Día 2
//     {
//       title: 'Movilidad de hombros/cadera',
//       description: 'Mejora rango de movimiento.',
//       category: 'STRETCHING',
//       muscleGroup: 'cuerpo completo',
//     },
//     {
//       title: 'Prensa de piernas',
//       description: 'Fortalece cuádriceps, glúteos y femorales.',
//       category: 'STRENGTH',
//       muscleGroup: 'cuádriceps, glúteos, isquiotibiales',
//     },
//     {
//       title: 'Peso muerto rumano',
//       description: 'Fortalece la cadena posterior.',
//       category: 'STRENGTH',
//       muscleGroup: 'isquiotibiales, espalda baja, glúteos',
//     },
//     {
//       title: 'Remo con barra',
//       description: 'Trabaja la espalda alta y los bíceps.',
//       category: 'STRENGTH',
//       muscleGroup: 'espalda media, bíceps',
//     },
//     {
//       title: 'Curl de bíceps y tríceps en polea',
//       description: 'Aísla y define los brazos.',
//       category: 'STRENGTH',
//       muscleGroup: 'bíceps, tríceps',
//     },
//     // Ejercicios para el Día 3
//     {
//       title: 'Elíptica/Bicicleta',
//       description: 'Activación moderada de piernas.',
//       category: 'CARDIO',
//       muscleGroup: 'piernas',
//     },
//     {
//       title: 'Extensión de gemelos sobre disco',
//       description: 'Fortalece los gemelos y mejora el equilibrio.',
//       category: 'STRENGTH',
//       muscleGroup: 'gemelos',
//     },
//     {
//       title: 'Zancadas caminando con mancuernas',
//       description: 'Activa glúteos y piernas. Importante para desplazamientos laterales en tenis.',
//       category: 'STRENGTH',
//       muscleGroup: 'glúteos, cuádriceps',
//     },
//     {
//       title: 'Elevación de cadera en máquina',
//       description: 'Enfocado en glúteos y lumbares.',
//       category: 'STRENGTH',
//       muscleGroup: 'glúteos, espalda baja',
//     },
//     {
//       title: 'Camilla de isquios',
//       description: 'Ejercicio específico para isquiotibiales.',
//       category: 'STRENGTH',
//       muscleGroup: 'isquiotibiales',
//     },
//     // Ejercicios para el Día 4
//     {
//       title: 'Movilidad de cadera y elíptica',
//       description: 'Mejora rango de movimiento.',
//       category: 'STRETCHING',
//       muscleGroup: 'cuerpo completo',
//     },
//     {
//       title: 'Sentadilla frontal con barra',
//       description: 'Mejora la fuerza en piernas y core.',
//       category: 'STRENGTH',
//       muscleGroup: 'cuádriceps, core',
//     },
//     {
//       title: 'Press militar con mancuernas',
//       description: 'Trabaja hombros y estabilizadores.',
//       category: 'STRENGTH',
//       muscleGroup: 'hombros, tríceps',
//     },
//     {
//       title: 'Abductores en máquina',
//       description: 'Fortalece los abductores de cadera, útil para movimientos laterales en tenis.',
//       category: 'STRENGTH',
//       muscleGroup: 'abductores',
//     },
//     {
//       title: 'Peso muerto con mancuernas',
//       description: 'Fortalece glúteos, isquiotibiales y espalda baja.',
//       category: 'STRENGTH',
//       muscleGroup: 'glúteos, isquiotibiales, espalda baja',
//     },
//   ],
//   sets: [
//     // Sets para los ejercicios del Día 1
//     { repetitions: 0, weight: 0, restTime: 0, duration: 600 }, // 10 min = 600 seg
//     { repetitions: 0, weight: 0, restTime: 0, duration: 30 }, // 30 seg
//     { repetitions: 12, weight: 50, restTime: 0, duration: 0 }, // Moderado (peso en kg)
//     { repetitions: 10, weight: 0, restTime: 0, duration: 0 }, // Sin peso especificado
//     { repetitions: 0, weight: 0, restTime: 0, duration: 30 }, // 30 seg
//     { repetitions: 15, weight: 10, restTime: 0, duration: 0 }, // Ligero (peso en kg)
//     { repetitions: 0, weight: 0, restTime: 0, duration: 20 }, // 20 seg
//     { repetitions: 0, weight: 0, restTime: 0, duration: 20 }, // 20 seg
//     { repetitions: 0, weight: 0, restTime: 0, duration: 20 }, // 20 seg
//     // Sets para los ejercicios del Día 2
//     { repetitions: 0, weight: 0, restTime: 0, duration: 300 }, // 5 min = 300 seg
//     { repetitions: 12, weight: 60, restTime: 0, duration: 0 }, // Moderado a pesado (peso en kg)
//     { repetitions: 12, weight: 50, restTime: 0, duration: 0 }, // Moderado (peso en kg)
//     { repetitions: 10, weight: 50, restTime: 0, duration: 0 }, // Moderado (peso en kg)
//     { repetitions: 12, weight: 10, restTime: 0, duration: 0 }, // Ligero a Moderado (peso en kg)
//     { repetitions: 0, weight: 0, restTime: 0, duration: 20 }, // 20 seg
//     { repetitions: 0, weight: 0, restTime: 0, duration: 20 }, // 20 seg
//     { repetitions: 0, weight: 0, restTime: 0, duration: 20 }, // 20 seg
//     // Sets para los ejercicios del Día 3
//     { repetitions: 0, weight: 0, restTime: 0, duration: 300 }, // 5 min = 300 seg
//     { repetitions: 12, weight: 50, restTime: 0, duration: 0 }, // Moderado (peso en kg)
//     { repetitions: 12, weight: 50, restTime: 0, duration: 0 }, // Moderado (peso en kg)
//     { repetitions: 15, weight: 50, restTime: 0, duration: 0 }, // Moderado (peso en kg)
//     { repetitions: 15, weight: 10, restTime: 0, duration: 0 }, // Ligero a Moderado (peso en kg)
//     { repetitions: 10, weight: 0, restTime: 0, duration: 0 }, // Sin peso especificado
//     // Sets para los ejercicios del Día 4
//     { repetitions: 0, weight: 0, restTime: 0, duration: 300 }, // 5 min = 300 seg
//     { repetitions: 12, weight: 50, restTime: 0, duration: 0 }, // Moderado (peso en kg)
//     { repetitions: 10, weight: 50, restTime: 0, duration: 0 }, // Moderado (peso en kg)
//     { repetitions: 15, weight: 10, restTime: 0, duration: 0 }, // Ligero (peso en kg)
//     { repetitions: 10, weight: 10, restTime: 0, duration: 0 }, // Ligero a Moderado (peso en kg)
//   ],
//   progress: {
//     date: new Date(),
//     weight: 98,
//     notes: 'Progreso inicial del plan.',
//     stats: {}, // Ajusta esto según el esquema de tu base de datos
//   },
//   comments: [
//     // Comentarios para los días de entrenamiento
//     {
//       content: 'Mantén una alta intensidad durante los ejercicios de cardio.',
//       userId: 'cm0lb5q680000om8mpuw9cvmu',
//     },
//     {
//       content: 'Realiza los ejercicios de pesas con atención a la forma.',
//       userId: 'cm0lb5q680000om8mpuw9cvmu',
//     },
//     {
//       content: 'Recupera adecuadamente entre cada serie.',
//       userId: 'cm0lb5q680000om8mpuw9cvmu',
//     },
//     {
//       content: 'Enfócate en la técnica durante los ejercicios de movilidad.',
//       userId: 'cm0lb5q680000om8mpuw9cvmu',
//     },
//   ],
// };

// async function main() {
//   // ID del usuario preexistente
//   const userId = 'cm0lb5q680000om8mpuw9cvmu';

//   // Crear Plan
//   const plan = await prisma.plan.create({
//     data: {
//       ...dataMockForSeed.plan,
//       userId: userId,
//     },
//   });

//   // Crear Días de Entrenamiento, Ejercicios y Sets
//   const exercises: Record<string, string> = {}; // Para almacenar IDs de ejercicios

//   await Promise.all(
//     dataMockForSeed.trainingDays.map(async (day) => {
//       const trainingDay = await prisma.trainingDay.create({
//         data: {
//           title: day.title,
//           description: day.description,
//           scheduledDate: day.date,
//           type: day.type as TrainingType, // Type assertion to match expected enum
//           planId: plan.id,
//         },
//       });

//       // Crear Ejercicios para cada Día de Entrenamiento
//       const createdExercises = await Promise.all(
//         dataMockForSeed.exercises.map(async (exercise) => {
//           const createdExercise = await prisma.exercise.create({
//             data: {
//               ...exercise,
//               trainingDayId: trainingDay.id,
//             },
//           });
//           exercises[exercise.title] = createdExercise.id; // Guardar ID del ejercicio
//           return createdExercise;
//         })
//       );

//       // Crear Sets para cada Ejercicio
//       await Promise.all(
//         dataMockForSeed.sets.map((set, index) =>
//           prisma.set.create({
//             data: {
//               ...set,
//               exerciseId: createdExercises[index % createdExercises.length].id,
//             },
//           })
//         )
//       );
//       await Promise.all(
//         dataMockForSeed.comments.map((comment) =>
//           prisma.comment.create({
//             data: {
//               ...comment,
//               userId: userId,
//               trainingDayId: trainingDay.id,
//               exerciseId:
//                 Object.values(exercises)[
//                   Math.floor(Math.random() * Object.values(exercises).length)
//                 ], // Selección aleatoria de un ejercicio
//             },
//           })
//         )
//       );
//     })
//   );

//   // Crear Progreso de Usuario
//   await prisma.progress.create({
//     data: {
//       ...dataMockForSeed.progress,
//       userId: userId,
//     },
//   });

//   console.log('Seeding completed successfully!');
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
