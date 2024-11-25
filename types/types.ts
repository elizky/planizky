// types.ts
export type TrainingType = 'series' | 'circuit' | 'combined';
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
  userId: string;
  exerciseId: string | null;
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
  trainingDayId: string;
  title: string;
  description: string | null;
  category: string;
  muscleGroup: string;
  type: TrainingType;
  createdAt: Date;
  updatedAt: Date;
  sets: Set[];
  comments: Comment[];
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
  type: 'series',
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
  type: 'series',
  description: null,
  completedCount: 0,
  completionTimes: [],
  completionDurations: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  exercises: [emptyExercise],
};
