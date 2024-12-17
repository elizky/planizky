// types.ts
export type TrainingType = 'SERIES' | 'CIRCUIT' | 'COMBINED';
export type Role = 'user' | 'admin';

export interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  password: string | null;
  image: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string | Date;
  exerciseId: string | null;
  trainingDayId: string | null;
  updatedAt: Date;
  userId: string;
}

export interface Set {
  id: string;
  exerciseId: string;
  repetitions: number;
  weight: number | null;
  duration: number | null;
  restTime: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Exercise {
  category: string;
  comments: Comment[];
  createdAt: Date;
  description: string | null;
  id: string;
  videoUrl?: string;
  muscleGroup: string;
  sets: Set[];
  title: string;
  trainingDayId: string;
  updatedAt: Date;
}

export interface Progress {
  id: string;
  userId: string;
  trainingDayId: string | null;
  date: Date;
  weight: number | null;
  notes: string | null;
  stats: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingDay {
  id: string;
  planId: string;
  title: string;
  type: TrainingType;
  description: string | null;
  completedCount: number;
  completionTimes: number[];
  completionDurations: number[];
  createdAt: Date;
  updatedAt: Date;
  exercises: Exercise[];
  plan: Plan;
}

export interface Plan {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  isActive: boolean;
  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  trainingDays: TrainingDay[];
  user: User;
}

// Defaults
export const emptySet: Set = {
  id: '',
  exerciseId: '',
  repetitions: 0,
  weight: null,
  duration: null,
  restTime: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const emptyExercise: Exercise = {
  id: '',
  trainingDayId: '',
  title: '',
  category: '',
  muscleGroup: '',
  description: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  sets: [emptySet],
  comments: [],
};

export const emptyTrainingDay: TrainingDay = {
  id: '',
  planId: '',
  title: '',
  type: 'SERIES',
  description: null,
  completedCount: 0,
  completionTimes: [],
  completionDurations: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  exercises: [emptyExercise],
  plan: {} as Plan,
};

export const bodyPartToCategory: Record<string, string> = {
  back: 'Fuerza', // Espalda suele estar asociada a ejercicios de fuerza o hipertrofia.
  cardio: 'Cardiovascular', // Ejercicios de tipo aeróbico.
  chest: 'Hipertrofia', // Pecho típicamente relacionado con el crecimiento muscular.
  'lower arms': 'Estabilización', // Enfoque en control y estabilidad.
  'lower legs': 'Peso Corporal', // Ejercicios de peso corporal como sentadillas.
  neck: 'Movilidad y Flexibilidad', // Cuello a menudo relacionado con movilidad y prevención de lesiones.
  shoulders: 'Fuerza', // Hombros pueden enfocarse en fuerza o hipertrofia.
  'upper arms': 'Hipertrofia', // Brazo superior relacionado con aumento de masa muscular.
  'upper legs': 'Peso Corporal', // Tren inferior puede incluir fuerza y peso corporal.
  waist: 'Core', // Cintura enfocada en ejercicios de core.
};
