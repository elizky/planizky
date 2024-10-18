// types.ts

export interface Comment {
  id: string;
  content: string;
  userId: string;
  exerciseId: string | null;
  trainingDayId: string | null;
  createdAt: Date;
  updatedAt: Date;
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
  id: string;
  trainingDayId: string | null; // Ajusta aquí
  title: string;
  description: string | null; // Ajusta aquí
  category: string;
  muscleGroup: string;
  createdAt: Date;
  updatedAt: Date;
  sets: Set[];
  comments: Comment[];
}

export interface Progress {
  id: string;
  userId: string;
  trainingDayId: string | null; // Ajusta aquí
  date: Date;
  weight: number | null; // Ajusta aquí
  notes: string | null; // Ajusta aquí
  stats: any; // Ajusta según sea necesario
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingDay {
  id: string;
  planId: string;
  title: string;
  type: string;
  description: string | null; // Ajusta aquí
  completedCount: number;
  completionTimes: any[]; // Ajusta según sea necesario
  completionDurations: any[]; // Ajusta según sea necesario
  date: Date[];
  createdAt: Date;
  updatedAt: Date;
  exercises: Exercise[];
  comments: Comment[];
  progress: Progress[];
}

export interface Plan {
  id: string;
  userId: string;
  title: string;
  description: string | null; // Ajusta aquí
  isActive: boolean;
  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  trainingDays: TrainingDay[];
  user: {
    id: string;
    name: string | null; // Ajusta aquí
    email: string;
    emailVerified: Date | null;
    password: string | null;
    image: string | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export const emptyTrainingDay = {
  title: '', // Campo obligatorio
  type: '', // Campo obligatorio
  description: '', // Campo opcional
  exercises: [
    {
      title: '', // Campo obligatorio
      category: '', // Campo obligatorio
      muscleGroup: '', // Campo obligatorio
      sets: [
        {
          repetitions: 0, // Valor por defecto requerido
          weight: 0, // O puedes inicializar con undefined si es opcional
          duration: undefined, // O valor por defecto si aplica
          restTime: undefined, // O valor por defecto si aplica
        },
      ],
      description: '', // Campo opcional
    },
  ],
};
