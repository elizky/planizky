export type Exercise = {
  name: string;
  series: number;
  repetitions: string | number;
  weight: string;
  type: string;
  muscle: string;
  comment?: string;
};

export type TrainingDay = {
  id: string;
  day: string;
  type: string;
  circuit_info?: string;
  exercises: Exercise[];
};
