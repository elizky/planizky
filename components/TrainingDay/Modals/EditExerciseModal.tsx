import { Exercise } from '@/types/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface EditExerciseModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  exercise: Exercise | null;
  onSetEdit: (setIndex: number, field: string, value: number | null) => void;
}

export default function EditExerciseModal({
  isOpen,
  onOpenChange,
  exercise,
  onSetEdit,
}: EditExerciseModalProps) {
  console.log('exercise', exercise);
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar {exercise?.title}</DialogTitle>
        </DialogHeader>
        <div className='mt-4'>
          <table className='w-full'>
            <thead>
              <tr>
                <th className='text-left'>Serie</th>
                <th className='text-left'>Reps</th>
                <th className='text-left'>Peso (kg)</th>
                <th className='text-left'>Duración (seg)</th>
                <th className='text-left'>Descanso (seg)</th>
              </tr>
            </thead>
            <tbody>
              {exercise?.sets.map((set, index) => (
                <tr key={set.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Input
                      type='number'
                      value={set.repetitions}
                      onChange={(e) =>
                        onSetEdit(index, 'repetitions', parseInt(e.target.value))
                      }
                      className='w-16'
                    />
                  </td>
                  <td>
                    <Input
                      type='number'
                      value={set.weight ?? ''}
                      onChange={(e) => onSetEdit(index, 'weight', parseInt(e.target.value))}
                      className='w-16'
                    />
                  </td>
                  <td>
                    <Input
                      type='number'
                      value={set.duration ?? ''}
                      onChange={(e) => onSetEdit(index, 'duration', parseInt(e.target.value))}
                      className='w-16'
                    />
                  </td>
                  <td>
                    <Input
                      type='number'
                      value={set.restTime ?? ''}
                      onChange={(e) => onSetEdit(index, 'restTime', parseInt(e.target.value))}
                      className='w-16'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 