export const strengthExercises = [
  // Los ejercicios previamente mencionados se mantienen, y añado los restantes
  {
    title: 'Press Neck',
    englishTitle: 'Neck Press',
    description:
      'Variación del press de banca que se realiza con la barra más cerca del cuello, enfocado en desarrollo de tríceps.',
    videoUrl: 'https://www.youtube.com/embed/LGQYUHfmcwU',
    muscleGroup: 'Tríceps',
    difficulty: 'Avanzado',
    equipment: ['Banco', 'Barra'],
    primaryMuscles: ['Tríceps', 'Pectorales'],
    secondaryMuscles: ['Deltoides'],
    tips: ['Mantener los codos cerca del cuerpo', 'Control en el descenso', 'Movimiento preciso'],
    safetyWarnings: [
      'Técnica muy específica',
      'Riesgo de lesión si se hace incorrectamente',
      'Comenzar con poco peso',
    ],
    categoryId: 1, // Fuerza
  },
  {
    title: 'Peso Muerto Rumano',
    englishTitle: 'Romanian Deadlift',
    description:
      'Variación del peso muerto que enfatiza los isquiotibiales y la parte posterior de la cadena cinética.',
    videoUrl: 'https://www.youtube.com/embed/JoZQ6ZK1HVU',
    muscleGroup: 'Piernas',
    difficulty: 'Intermedio',
    equipment: ['Barra', 'Discos de peso'],
    primaryMuscles: ['Isquiotibiales', 'Glúteos'],
    secondaryMuscles: ['Espalda baja', 'Pantorrillas'],
    tips: ['Mantener la espalda recta', 'Flexión ligera en rodillas', 'Descenso controlado'],
    safetyWarnings: [
      'No redondear la espalda',
      'Movimiento lento y controlado',
      'Iniciar con peso ligero',
    ],
    categoryId: 1, // Fuerza
  },
  {
    title: 'Press de Hombros con Mancuernas',
    englishTitle: 'Dumbbell Shoulder Press',
    description:
      'Ejercicio de presión para desarrollar fuerza y volumen en los hombros con mayor rango de movimiento.',
    videoUrl: 'https://www.youtube.com/embed/qEwKCR5JCog',
    muscleGroup: 'Hombros',
    difficulty: 'Intermedio',
    equipment: ['Mancuernas', 'Banco'],
    primaryMuscles: ['Deltoides', 'Tríceps'],
    secondaryMuscles: ['Trapecio', 'Pecho'],
    tips: ['Mantener el core comprometido', 'Movimiento simétrico', 'No arquear la espalda'],
    safetyWarnings: [
      'Control del peso',
      'Evitar movimientos bruscos',
      'Calentar antes del ejercicio',
    ],
    categoryId: 1, // Fuerza
  },
  {
    title: 'Press Francés',
    englishTitle: 'Skull Crushers',
    description:
      'Ejercicio de aislamiento para tríceps que permite gran desarrollo de fuerza en la parte posterior del brazo.',
    videoUrl: 'https://www.youtube.com/embed/LGlg9UT8xe0',
    muscleGroup: 'Brazos',
    difficulty: 'Intermedio',
    equipment: ['Barra', 'Banco'],
    primaryMuscles: ['Tríceps'],
    secondaryMuscles: ['Deltoides'],
    tips: ['Mantener los codos quietos', 'Movimiento controlado', 'No mover los brazos'],
    safetyWarnings: ['Cuidado con la técnica', 'No usar peso excesivo', 'Movimiento preciso'],
    categoryId: 1, // Fuerza
  },
  {
    title: 'Peso Muerto con Piernas Rígidas',
    englishTitle: 'Stiff Leg Deadlift',
    description:
      'Variación del peso muerto que enfatiza el estiramiento y fortalecimiento de isquiotibiales.',
    videoUrl: 'https://www.youtube.com/embed/cmUyvmIGSLI',
    muscleGroup: 'Piernas',
    difficulty: 'Intermedio',
    equipment: ['Barra', 'Discos de peso'],
    primaryMuscles: ['Isquiotibiales', 'Glúteos'],
    secondaryMuscles: ['Espalda baja', 'Pantorrillas'],
    tips: [
      'Mantener piernas casi extendidas',
      'Descenso controlado',
      'Estirar parte posterior del muslo',
    ],
    safetyWarnings: [
      'No redondear la espalda',
      'Control total del movimiento',
      'Comenzar con peso ligero',
    ],
    categoryId: 1, // Fuerza
  },
  {
    title: 'Pull-up con Peso',
    englishTitle: 'Weighted Pull-up',
    description: 'Dominadas con carga adicional para incrementar fuerza en espalda y brazos.',
    videoUrl: 'https://www.youtube.com/embed/zOxPqkA5dAM',
    muscleGroup: 'Espalda',
    difficulty: 'Avanzado',
    equipment: ['Barra de dominadas', 'Cinturón de peso'],
    primaryMuscles: ['Dorsales', 'Bíceps'],
    secondaryMuscles: ['Trapecio', 'Antebrazos'],
    tips: ['Agarre firme', 'Llevar barbilla por encima de la barra', 'Movimiento controlado'],
    safetyWarnings: [
      'Dominar dominadas sin peso primero',
      'Incrementar carga gradualmente',
      'Técnica correcta',
    ],
    categoryId: 1, // Fuerza
  },
  {
    title: 'Sentadilla Hack',
    englishTitle: 'Hack Squat',
    description: 'Ejercicio de sentadilla en máquina que aísla los músculos de las piernas.',
    videoUrl: 'https://www.youtube.com/embed/3qqtHfSQAkU',
    muscleGroup: 'Piernas',
    difficulty: 'Intermedio',
    equipment: ['Máquina de Sentadilla'],
    primaryMuscles: ['Cuádriceps', 'Glúteos'],
    secondaryMuscles: ['Pantorrillas', 'Aductores'],
    tips: ['Mantener la espalda contra el pad', 'Control en el descenso', 'No bloquear rodillas'],
    safetyWarnings: ['Ajustar máquina correctamente', 'No sobrecargar', 'Movimiento controlado'],
    categoryId: 1, // Fuerza
  },
  {
    title: 'Press con Mancuerna Inclinado',
    englishTitle: 'Incline Dumbbell Press',
    description: 'Variación del press que enfatiza la parte superior del pecho.',
    videoUrl: 'https://www.youtube.com/embed/CQ_Ei1nA3p4',
    muscleGroup: 'Pecho',
    difficulty: 'Intermedio',
    equipment: ['Banco Inclinado', 'Mancuernas'],
    primaryMuscles: ['Pectorales superiores', 'Tríceps'],
    secondaryMuscles: ['Deltoides', 'Pectorales medios'],
    tips: ['Ángulo de 30-45 grados', 'Control en el descenso', 'Mantener los pies firmes'],
    safetyWarnings: ['No sobrecargarse', 'Técnica antes que peso', 'Control en todo momento'],
    categoryId: 1, // Fuerza
  },
  {
    title: 'Curl de Bíceps con Barra',
    englishTitle: 'Barbell Bicep Curl',
    description: 'Ejercicio clásico para desarrollar fuerza en bíceps.',
    videoUrl: 'https://www.youtube.com/embed/LY1bp3-pn1Y',
    muscleGroup: 'Brazos',
    difficulty: 'Principiante',
    equipment: ['Barra', 'Discos de peso'],
    primaryMuscles: ['Bíceps'],
    secondaryMuscles: ['Antebrazos'],
    tips: ['Codos pegados al cuerpo', 'No balancear la espalda', 'Control en la bajada'],
    safetyWarnings: ['No usar momento', 'Peso adecuado', 'Técnica correcta'],
    categoryId: 1, // Fuerza
  },
  {
    title: 'Extensión de Tríceps en Polea',
    englishTitle: 'Cable Tricep Pushdown',
    description: 'Ejercicio de aislamiento para desarrollar fuerza en tríceps usando polea.',
    videoUrl: 'https://www.youtube.com/embed/2-8ghUmKIR0',
    muscleGroup: 'Brazos',
    difficulty: 'Principiante',
    equipment: ['Máquina de Polea'],
    primaryMuscles: ['Tríceps'],
    secondaryMuscles: ['Antebrazos'],
    tips: ['Mantener codos pegados al cuerpo', 'Extensión completa', 'No mover los codos'],
    safetyWarnings: ['No usar peso excesivo', 'Movimiento controlado', 'Técnica antes que peso'],
    categoryId: 1, // Fuerza
  },
  // En la siguiente respuesta, añadiré los 5 ejercicios restantes para completar los 15
];
