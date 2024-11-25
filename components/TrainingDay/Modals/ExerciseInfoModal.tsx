import { Exercise } from '@/types/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface ExerciseInfoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  exercise: Exercise | null;
}

export default function ExerciseInfoModal({
  isOpen,
  onOpenChange,
  exercise,
}: ExerciseInfoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{exercise?.title}</DialogTitle>
        </DialogHeader>
        <div className='mt-4'>
          <p>{exercise?.description}</p>
          <video controls className='w-full mt-4'>
            <source src='/placeholder-video.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
