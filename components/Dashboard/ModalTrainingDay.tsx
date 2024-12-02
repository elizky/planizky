import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Exercise } from '@/types/types';
import { VideoIcon } from 'lucide-react';

interface ModalTrainingDayProps {
  open: boolean;
  handleClose: any;
  dayInfo: { exercises: Exercise[]; title: string; description: string | null };
  handleStartTraining: () => void;
}

const ModalTrainingDay = ({
  open,
  handleClose,
  dayInfo,
  handleStartTraining,
}: ModalTrainingDayProps) => {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='w-11/12 max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-xl'>{dayInfo.title} Exercises</DialogTitle>
          <DialogDescription>{dayInfo.description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className='w-full '>
          {dayInfo.exercises.map((ex) => (
            <div key={ex.id} className='mb-4 last:mb-0'>
              <div className='flex gap-2 items-center'>
                <h3 className='text-lg font-semibold'>{ex.title}</h3>
                {ex.videoUrl && <VideoIcon className='w-4 h-4' />}
              </div>
              <p className='text-sm text-muted-foreground'>{ex.description}</p>

              {ex.sets && (
                <>
                  <p className='text-sm'>Sets: {ex.sets.length}</p>
                  {ex.sets.some((set) => set.repetitions) && (
                    <p className='text-sm'>
                      Reps:{' '}
                      {ex.sets.map((rep, index) => (
                        <span key={rep.id}>
                          {rep.repetitions || '-'}
                          {index < ex.sets.length - 1 ? ' - ' : ''}
                        </span>
                      ))}
                    </p>
                  )}
                  {ex.sets.some((set) => set.duration) && (
                    <p className='text-sm'>
                      Duration:{' '}
                      {ex.sets.map((rep, index) => (
                        <span key={rep.id}>
                          {rep.duration || '-'}
                          {index < ex.sets.length - 1 ? ' - ' : ''}
                        </span>
                      ))}
                    </p>
                  )}
                </>
              )}
            </div>
          ))}
        </ScrollArea>
        <DialogFooter className='gap-4 sm:gap-0'>
          <Button variant='default' onClick={handleStartTraining}>
            Go Training
          </Button>
          <Button variant='outline' disabled>
            Full Description
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalTrainingDay;
