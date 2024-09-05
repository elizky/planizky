import { PlanSchema } from '@/types/formSchemas';

export const dataMock = [
  {
    id: '1278930123',
    day: 'Día 1',
    type: 'Circuito Cuerpo Completoooo',
    circuit_info:
      'Realiza todos los ejercicios en orden 4 veces seguidas con descansos mínimos entre ejercicios.',
    exercises: [
      {
        name: 'Remo/Bicicleta',
        series: 1,
        repetitions: '10 min',
        weight: '-',
        type: 'cardio',
        muscle: 'cuerpo completo',
        comment: 'A ritmo moderado.',
      },
      {
        name: 'Salto al cajón o Skipping con stepper',
        series: 4,
        repetitions: '30 seg',
        weight: '-',
        type: 'pliométrico',
        muscle: 'gemelos, cuádriceps',
        comment: 'Mejora la resistencia cardiovascular y la potencia de piernas. Ideal para tenis.',
      },
      {
        name: 'Sentadilla con mancuernas',
        series: 4,
        repetitions: '12-15',
        weight: 'Moderado',
        type: 'fuerza',
        muscle: 'cuádriceps, glúteos',
        comment: 'Activa cuádriceps y glúteos.',
      },
      {
        name: 'Flexiones',
        series: 4,
        repetitions: '10-12',
        weight: '-',
        type: 'fuerza',
        muscle: 'pecho, tríceps',
        comment: 'Trabaja pecho y tríceps.',
      },
      {
        name: 'Cuerdas de batalla',
        series: 4,
        repetitions: '30 seg',
        weight: '-',
        type: 'cardio',
        muscle: 'cuerpo completo',
        comment: 'Incrementa la resistencia y quema calorías.',
      },
      {
        name: 'Giros rusos',
        series: 4,
        repetitions: '15 por lado',
        weight: 'Ligero',
        type: 'fuerza',
        muscle: 'abdominales, oblicuos',
        comment: 'Trabaja los oblicuos abdominales, esenciales para giros en tenis.',
      },
      {
        name: 'Estiramiento de Cuádriceps',
        series: 1,
        repetitions: '20-30 seg',
        weight: '-',
        type: 'estiramiento',
        muscle: 'cuádriceps',
        comment: 'Mantén las rodillas juntas y siente el estiramiento.',
      },
      {
        name: 'Estiramiento de Hombros y Trapecios',
        series: 1,
        repetitions: '20-30 seg',
        weight: '-',
        type: 'estiramiento',
        muscle: 'hombros, trapecios',
        comment: 'Lleva el brazo cruzado sobre el pecho.',
      },
      {
        name: 'Estiramiento de Espalda (posición del niño)',
        series: 1,
        repetitions: '20-30 seg',
        weight: '-',
        type: 'estiramiento',
        muscle: 'espalda baja',
        comment: 'Siéntate sobre los talones y estira los brazos hacia adelante.',
      },
    ],
  },
  {
    id: '786900841',
    day: 'Día 2',
    type: 'Pesas: Fuerza y Estabilidad',
    exercises: [
      {
        name: 'Movilidad de hombros/cadera',
        series: 1,
        repetitions: '5 min',
        weight: '-',
        type: 'estiramiento',
        muscle: 'cuerpo completo',
        comment: 'Mejora rango de movimiento.',
      },
      {
        name: 'Prensa de piernas',
        series: 4,
        repetitions: 12,
        weight: 'Moderado a pesado',
        type: 'fuerza',
        muscle: 'cuádriceps, glúteos, isquiotibiales',
        comment: 'Fortalece cuádriceps, glúteos y femorales.',
      },
      {
        name: 'Peso muerto rumano',
        series: 4,
        repetitions: 12,
        weight: 'Moderado',
        type: 'fuerza',
        muscle: 'isquiotibiales, espalda baja, glúteos',
        comment: 'Fortalece la cadena posterior.',
      },
      {
        name: 'Remo con barra',
        series: 4,
        repetitions: 10,
        weight: 'Moderado',
        type: 'fuerza',
        muscle: 'espalda media, bíceps',
        comment: 'Trabaja la espalda alta y los bíceps.',
      },
      {
        name: 'Curl de bíceps y tríceps en polea',
        series: 3,
        repetitions: '12 cada uno',
        weight: 'Ligero a Moderado',
        type: 'fuerza',
        muscle: 'bíceps, tríceps',
        comment: 'Aísla y define los brazos.',
      },
      {
        name: 'Estiramiento de Isquiotibiales (sentado)',
        series: 1,
        repetitions: '20-30 seg',
        weight: '-',
        type: 'estiramiento',
        muscle: 'isquiotibiales',
        comment: 'Inclínate hacia adelante sin doblar la espalda.',
      },
      {
        name: 'Estiramiento de Glúteos (en el suelo)',
        series: 1,
        repetitions: '20-30 seg',
        weight: '-',
        type: 'estiramiento',
        muscle: 'glúteos',
        comment: 'Lleva las rodillas hacia el pecho cruzando una pierna.',
      },
      {
        name: 'Estiramiento de Pecho (en una puerta)',
        series: 1,
        repetitions: '20-30 seg',
        weight: '-',
        type: 'estiramiento',
        muscle: 'pecho',
        comment: 'Coloca el brazo en la puerta y avanza ligeramente.',
      },
    ],
  },
  {
    id: '16747192048902',

    day: 'Día 3',
    type: 'Circuito Piernas y Core',
    circuit_info:
      'Realiza todos los ejercicios en orden 4 veces seguidas con descansos mínimos entre ejercicios.',
    exercises: [
      {
        name: 'Elíptica/Bicicleta',
        series: 1,
        repetitions: '5 min',
        weight: '-',
        type: 'cardio',
        muscle: 'piernas',
        comment: 'Activación moderada de piernas.',
      },
      {
        name: 'Extensión de gemelos sobre disco',
        series: 4,
        repetitions: 12,
        weight: 'Moderado',
        type: 'fuerza',
        muscle: 'gemelos',
        comment: 'Fortalece los gemelos y mejora el equilibrio.',
      },
      {
        name: 'Zancadas caminando con mancuernas',
        series: 4,
        repetitions: '12 por pierna',
        weight: 'Moderado',
        type: 'fuerza',
        muscle: 'glúteos, cuádriceps',
        comment: 'Activa glúteos y piernas. Importante para desplazamientos laterales en tenis.',
      },
      {
        name: 'Elevación de cadera en máquina',
        series: 4,
        repetitions: 15,
        weight: 'Moderado',
        type: 'fuerza',
        muscle: 'glúteos, espalda baja',
        comment: 'Enfocado en glúteos y lumbares.',
      },
      {
        name: 'Camilla de isquios',
        series: 4,
        repetitions: 10,
        weight: 'Moderado',
        type: 'fuerza',
        muscle: 'isquiotibiales',
        comment: 'Ejercicio específico para isquiotibiales.',
      },
      {
        name: 'Estiramiento de Psoas (zancada baja)',
        series: 1,
        repetitions: '20-30 seg',
        weight: '-',
        type: 'estiramiento',
        muscle: 'flexores de cadera',
        comment: 'Lleva la cadera hacia adelante con el torso recto.',
      },
      {
        name: 'Estiramiento de Cuádriceps (de pie)',
        series: 1,
        repetitions: '20-30 seg',
        weight: '-',
        type: 'estiramiento',
        muscle: 'cuádriceps',
        comment: 'Mantén las rodillas juntas y siente el estiramiento.',
      },
      {
        name: 'Estiramiento de Gemelos (de pie contra la pared)',
        series: 1,
        repetitions: '20-30 seg',
        weight: '-',
        type: 'estiramiento',
        muscle: 'gemelos',
        comment: 'Lleva la pierna hacia atrás manteniéndola estirada.',
      },
    ],
  },
  {
    id: '4526781931',
    day: 'Día 4',
    type: 'Pesas + Movilidad y Estiramientos Funcionales',
    exercises: [
      {
        name: 'Movilidad de cadera y elíptica',
        series: 1,
        repetitions: '5 min',
        weight: '-',
        type: 'estiramiento',
        muscle: 'cuerpo completo',
      },
      {
        name: 'Sentadilla frontal con barra',
        series: 4,
        repetitions: 10,
        weight: 'Moderado',
        type: 'fuerza',
        muscle: 'cuádriceps, core',
        comment: 'Mejora la fuerza en piernas y core.',
      },
      {
        name: 'Press militar con mancuernas',
        series: 4,
        repetitions: 12,
        weight: 'Moderado',
        type: 'fuerza',
        muscle: 'hombros, tríceps',
        comment: 'Trabaja hombros y estabilizadores.',
      },
      {
        name: 'Abductores en máquina',
        series: 4,
        repetitions: 15,
        weight: 'Moderado',
        type: 'fuerza',
        muscle: 'abductores',
        comment: 'Fortalece los abductores de cadera, útil para movimientos laterales en tenis.',
      },
      {
        name: 'Peso muerto con mancuernas',
        series: 4,
        repetitions: 8,
        weight: 'Moderado',
        type: 'fuerza',
        muscle: 'glúteos, isquiotibiales, espalda baja',
        comment: 'Fortalece glúteos, isquiotibiales y espalda baja.',
      },
      {
        name: 'Estiramiento de Cuádriceps (de pie)',
        series: 1,
        repetitions: '20-30 seg',
        weight: '-',
        type: 'estiramiento',
        muscle: 'cuádriceps',
        comment: 'Mantén las rodillas juntas y siente el estiramiento.',
      },
      {
        name: 'Estiramiento de Hombros y Trapecios',
        series: 1,
        repetitions: '20-30 seg',
        weight: '-',
        type: 'estiramiento',
        muscle: 'hombros, trapecios',
        comment: 'Lleva el brazo cruzado sobre el pecho.',
      },
    ],
  },
];

export const dataMockForSeed = {
  plan: {
    title: 'Plan de Resistencia Avanzado',
    description: 'Un plan avanzado para mejorar la resistencia y fuerza general.',
    isActive: true,
    startDate: new Date(),
  },
  trainingDays: [
    {
      title: 'Día 1 - Circuito Cuerpo Completo',
      type: 'CARDIO',
      description:
        'Realiza todos los ejercicios en orden 4 veces seguidas con descansos mínimos entre ejercicios.',
      date: [new Date()],
    },
    {
      title: 'Día 2 - Pesas: Fuerza y Estabilidad',
      type: 'STRENGTH',
      description: 'Entrenamiento de fuerza para el tren superior y resistencia general.',
      date: [new Date()],
    },
    {
      title: 'Día 3 - Circuito Piernas y Core',
      type: 'STRENGTH',
      description:
        'Realiza todos los ejercicios en orden 4 veces seguidas con descansos mínimos entre ejercicios.',
      date: [new Date()],
    },
    {
      title: 'Día 4 - Pesas + Movilidad y Estiramientos Funcionales',
      type: 'STRENGTH',
      description: 'Entrenamiento con pesas y movilidad funcional.',
      date: [new Date()],
    },
  ],
  exercises: [
    // Ejercicios para el Día 1
    {
      title: 'Remo/Bicicleta',
      description: 'Activación moderada de piernas.',
      category: 'CARDIO',
      muscleGroup: 'cuerpo completo',
    },
    {
      title: 'Salto al cajón o Skipping con stepper',
      description:
        'Mejora la resistencia cardiovascular y la potencia de piernas. Ideal para tenis.',
      category: 'PLYOMETRIC',
      muscleGroup: 'gemelos, cuádriceps',
    },
    {
      title: 'Sentadilla con mancuernas',
      description: 'Activa cuádriceps y glúteos.',
      category: 'STRENGTH',
      muscleGroup: 'cuádriceps, glúteos',
    },
    {
      title: 'Flexiones',
      description: 'Trabaja pecho y tríceps.',
      category: 'STRENGTH',
      muscleGroup: 'pecho, tríceps',
    },
    {
      title: 'Cuerdas de batalla',
      description: 'Incrementa la resistencia y quema calorías.',
      category: 'CARDIO',
      muscleGroup: 'cuerpo completo',
    },
    {
      title: 'Giros rusos',
      description: 'Trabaja los oblicuos abdominales, esenciales para giros en tenis.',
      category: 'STRENGTH',
      muscleGroup: 'abdominales, oblicuos',
    },
    // Ejercicios para el Día 2
    {
      title: 'Movilidad de hombros/cadera',
      description: 'Mejora rango de movimiento.',
      category: 'STRETCHING',
      muscleGroup: 'cuerpo completo',
    },
    {
      title: 'Prensa de piernas',
      description: 'Fortalece cuádriceps, glúteos y femorales.',
      category: 'STRENGTH',
      muscleGroup: 'cuádriceps, glúteos, isquiotibiales',
    },
    {
      title: 'Peso muerto rumano',
      description: 'Fortalece la cadena posterior.',
      category: 'STRENGTH',
      muscleGroup: 'isquiotibiales, espalda baja, glúteos',
    },
    {
      title: 'Remo con barra',
      description: 'Trabaja la espalda alta y los bíceps.',
      category: 'STRENGTH',
      muscleGroup: 'espalda media, bíceps',
    },
    {
      title: 'Curl de bíceps y tríceps en polea',
      description: 'Aísla y define los brazos.',
      category: 'STRENGTH',
      muscleGroup: 'bíceps, tríceps',
    },
    // Ejercicios para el Día 3
    {
      title: 'Elíptica/Bicicleta',
      description: 'Activación moderada de piernas.',
      category: 'CARDIO',
      muscleGroup: 'piernas',
    },
    {
      title: 'Extensión de gemelos sobre disco',
      description: 'Fortalece los gemelos y mejora el equilibrio.',
      category: 'STRENGTH',
      muscleGroup: 'gemelos',
    },
    {
      title: 'Zancadas caminando con mancuernas',
      description: 'Activa glúteos y piernas. Importante para desplazamientos laterales en tenis.',
      category: 'STRENGTH',
      muscleGroup: 'glúteos, cuádriceps',
    },
    {
      title: 'Elevación de cadera en máquina',
      description: 'Enfocado en glúteos y lumbares.',
      category: 'STRENGTH',
      muscleGroup: 'glúteos, espalda baja',
    },
    {
      title: 'Camilla de isquios',
      description: 'Ejercicio específico para isquiotibiales.',
      category: 'STRENGTH',
      muscleGroup: 'isquiotibiales',
    },
    // Ejercicios para el Día 4
    {
      title: 'Movilidad de cadera y elíptica',
      description: 'Mejora rango de movimiento.',
      category: 'STRETCHING',
      muscleGroup: 'cuerpo completo',
    },
    {
      title: 'Sentadilla frontal con barra',
      description: 'Mejora la fuerza en piernas y core.',
      category: 'STRENGTH',
      muscleGroup: 'cuádriceps, core',
    },
    {
      title: 'Press militar con mancuernas',
      description: 'Trabaja hombros y estabilizadores.',
      category: 'STRENGTH',
      muscleGroup: 'hombros, tríceps',
    },
    {
      title: 'Abductores en máquina',
      description: 'Fortalece los abductores de cadera, útil para movimientos laterales en tenis.',
      category: 'STRENGTH',
      muscleGroup: 'abductores',
    },
    {
      title: 'Peso muerto con mancuernas',
      description: 'Fortalece glúteos, isquiotibiales y espalda baja.',
      category: 'STRENGTH',
      muscleGroup: 'glúteos, isquiotibiales, espalda baja',
    },
  ],
  sets: [
    // Sets para los ejercicios del Día 1
    { repetitions: 0, weight: 0, restTime: 0, duration: 600 }, // 10 min = 600 seg
    { repetitions: 0, weight: 0, restTime: 0, duration: 30 }, // 30 seg
    { repetitions: 12, weight: 50, restTime: 0, duration: 0 }, // Moderado (peso en kg)
    { repetitions: 10, weight: 0, restTime: 0, duration: 0 }, // Sin peso especificado
    { repetitions: 0, weight: 0, restTime: 0, duration: 30 }, // 30 seg
    { repetitions: 15, weight: 10, restTime: 0, duration: 0 }, // Ligero (peso en kg)
    { repetitions: 0, weight: 0, restTime: 0, duration: 20 }, // 20 seg
    { repetitions: 0, weight: 0, restTime: 0, duration: 20 }, // 20 seg
    { repetitions: 0, weight: 0, restTime: 0, duration: 20 }, // 20 seg
    // Sets para los ejercicios del Día 2
    { repetitions: 0, weight: 0, restTime: 0, duration: 300 }, // 5 min = 300 seg
    { repetitions: 12, weight: 60, restTime: 0, duration: 0 }, // Moderado a pesado (peso en kg)
    { repetitions: 12, weight: 50, restTime: 0, duration: 0 }, // Moderado (peso en kg)
    { repetitions: 10, weight: 50, restTime: 0, duration: 0 }, // Moderado (peso en kg)
    { repetitions: 12, weight: 10, restTime: 0, duration: 0 }, // Ligero a Moderado (peso en kg)
    { repetitions: 0, weight: 0, restTime: 0, duration: 20 }, // 20 seg
    { repetitions: 0, weight: 0, restTime: 0, duration: 20 }, // 20 seg
    { repetitions: 0, weight: 0, restTime: 0, duration: 20 }, // 20 seg
    // Sets para los ejercicios del Día 3
    { repetitions: 0, weight: 0, restTime: 0, duration: 300 }, // 5 min = 300 seg
    { repetitions: 12, weight: 50, restTime: 0, duration: 0 }, // Moderado (peso en kg)
    { repetitions: 12, weight: 50, restTime: 0, duration: 0 }, // Moderado (peso en kg)
    { repetitions: 15, weight: 50, restTime: 0, duration: 0 }, // Moderado (peso en kg)
    { repetitions: 15, weight: 10, restTime: 0, duration: 0 }, // Ligero a Moderado (peso en kg)
    { repetitions: 10, weight: 0, restTime: 0, duration: 0 }, // Sin peso especificado
    // Sets para los ejercicios del Día 4
    { repetitions: 0, weight: 0, restTime: 0, duration: 300 }, // 5 min = 300 seg
    { repetitions: 12, weight: 50, restTime: 0, duration: 0 }, // Moderado (peso en kg)
    { repetitions: 10, weight: 50, restTime: 0, duration: 0 }, // Moderado (peso en kg)
    { repetitions: 15, weight: 10, restTime: 0, duration: 0 }, // Ligero (peso en kg)
    { repetitions: 10, weight: 10, restTime: 0, duration: 0 }, // Ligero a Moderado (peso en kg)
  ],
  progress: {
    date: new Date(),
    weight: 98,
    notes: 'Progreso inicial del plan.',
    stats: {}, // Ajusta esto según el esquema de tu base de datos
  },
  comments: [
    // Comentarios para los días de entrenamiento
    {
      dayId: 1,
      content: 'Mantén una alta intensidad durante los ejercicios de cardio.',
      userId: 'cm0lb5q680000om8mpuw9cvmu',
    },
    {
      dayId: 2,
      content: 'Realiza los ejercicios de pesas con atención a la forma.',
      userId: 'cm0lb5q680000om8mpuw9cvmu',
    },
    {
      dayId: 3,
      content: 'Recupera adecuadamente entre cada serie.',
      userId: 'cm0lb5q680000om8mpuw9cvmu',
    },
    {
      dayId: 4,
      content: 'Enfócate en la técnica durante los ejercicios de movilidad.',
      userId: 'cm0lb5q680000om8mpuw9cvmu',
    },
  ],
};

export const emptyMockData: PlanSchema = {
  title: '',
  description: '',
  trainingDaysCount: '1',
  trainingDays: [
    {
      title: '',
      type: '',
      description: '',
      exercises: [
        {
          title: '',
          description: '',
          category: '',
          muscleGroup: '',
          sets: [
            {
              repetitions: 1,
              weight: undefined,
              duration: undefined,
              restTime: undefined,
            },
          ],
        },
      ],
    },
  ],
};
