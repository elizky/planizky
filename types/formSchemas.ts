import * as z from 'zod';

// Add TrainingType enum to match Prisma schema
export const TrainingType = {
  SERIES: 'SERIES',
  CIRCUIT: 'CIRCUIT',
  COMBINED: 'COMBINED',
} as const;

// Definición del esquema para los sets de un ejercicio
export const setSchema = z.object({
  repetitions: z.number().min(1, 'At least 1 repetition is required'),
  weight: z.number().optional(),
  duration: z.number().optional(),
  restTime: z.number().optional(),
});

// Definición del esquema para los ejercicios dentro de un día de entrenamiento
export const exerciseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  videoUrl: z.string().url().optional(),
  category: z.string().min(1, 'Category is required'),
  muscleGroup: z.string().min(1, 'Muscle group is required'),
  sets: z.array(setSchema).min(1, 'At least one set is required'),
});

// Update trainingDaySchema to include type and settings
export const trainingDaySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  type: z.enum([TrainingType.SERIES, TrainingType.CIRCUIT, TrainingType.COMBINED], {
    required_error: 'Training type is required',
  }),
  settings: z.record(z.any()).optional(), // For the Json settings field
  exercises: z.array(exerciseSchema).min(1, 'At least one exercise is required'),
});

// Update planSchema to remove trainingDaysCount since it's not in Prisma
export const planSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  trainingDaysCount: z.number().min(1, 'At least one day is required'),
  trainingDays: z.array(trainingDaySchema).min(1, 'At least one training day is required'),
});

export type SetSchema = z.infer<typeof setSchema>;
export type ExerciseSchema = z.infer<typeof exerciseSchema>;
export type DaySchema = z.infer<typeof trainingDaySchema>;
export type PlanSchema = z.infer<typeof planSchema>;

// Add export for TrainingType
export type TrainingType = (typeof TrainingType)[keyof typeof TrainingType];
