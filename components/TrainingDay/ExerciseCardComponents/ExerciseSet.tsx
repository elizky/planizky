interface ExerciseSetProps {
  set: any; // Replace with proper type
  setIndex: number;
  isCompleted: boolean;
  onSetComplete: () => void;
  handleTime: (time: number) => string;
}

export function ExerciseSet({
  set,
  setIndex,
  isCompleted,
  onSetComplete,
  handleTime,
}: ExerciseSetProps) {
  return (
    <button
      onClick={onSetComplete}
      className={`p-4 rounded-lg text-center transition-colors ${
        isCompleted
          ? 'bg-green-500 text-white hover:bg-green-600'
          : 'bg-muted hover:outline hover:outline-primary'
      }`}
    >
      <span className='text-lg font-semibold'>Serie {setIndex + 1}</span>
      <div className='flex flex-col gap-1'>
        <div className='flex justify-between w-full'>
          <span className='text-sm'>Reps:</span>
          <span className='text-sm'>{set.repetitions > 0 ? set.repetitions : '-'}</span>
        </div>
        <div className='flex justify-between w-full'>
          <span className='text-sm'>Peso:</span>
          <span className='text-sm'>{set.weight && set.weight > 0 ? `${set.weight} kg` : '-'}</span>
        </div>
        {set.duration > 0 && (
          <div className='flex justify-between w-full'>
            <span className='text-sm'>Duración:</span>
            <span className='text-sm'>{handleTime(set.duration)}</span>
          </div>
        )}
      </div>
    </button>
  );
}
