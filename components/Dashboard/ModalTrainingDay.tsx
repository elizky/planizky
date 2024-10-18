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
        <ScrollArea className='w-full h-96 '>
          {dayInfo.exercises.map((ex) => (
            <div key={ex.id} className='mb-4 last:mb-0'>
              <h3 className='text-lg font-semibold'>{ex.title}</h3>
              <p className='text-sm text-muted-foreground'>{ex.description}</p>

              {ex.sets && <p className='text-sm'>Sets: {ex.sets.length}</p>}
              {ex.sets && (
                <p className='text-sm'>
                  Reps:{' '}
                  {ex.sets.map((rep) => (
                    <>{rep.repetitions} - </>
                  ))}
                </p>
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
