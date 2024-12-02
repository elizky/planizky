import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '../../ui/button';

interface NavigationButtonsProps {
  isAllExercisesCompleted: boolean;
  currentExerciseIndex: number;
  exercisesLength: number;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
}

export function NavigationButtons({
  isAllExercisesCompleted,
  currentExerciseIndex,
  exercisesLength,
  onPrevious,
  onNext,
  onFinish,
}: NavigationButtonsProps) {
  return (
    <div className='flex justify-between mt-4'>
      {!isAllExercisesCompleted && (
        <Button onClick={onPrevious} disabled={currentExerciseIndex === 0}>
          <ChevronLeft className='mr-2 h-4 w-4' /> Anterior
        </Button>
      )}
      <Button
        onClick={isAllExercisesCompleted ? onFinish : onNext}
        disabled={currentExerciseIndex === exercisesLength - 1 && !isAllExercisesCompleted}
        className={`ml-auto ${isAllExercisesCompleted && 'w-full'} `}
      >
        {isAllExercisesCompleted ? (
          <>Finalizar Entrenamiento</>
        ) : (
          <>
            Siguiente <ChevronRight className='ml-2 h-4 w-4' />
          </>
        )}
      </Button>
    </div>
  );
}
