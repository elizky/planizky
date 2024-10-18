import { Exercise } from '@prisma/client';
import { Button } from '../ui/button';

const DayInfo = ({
  dayInfo,
  setOpenModal,
}: {
  dayInfo: { exercises: Exercise[]; title: string; description: string | null };
  setOpenModal: () => void;
}) => {
  return (
    <div className='flex flex-col gap-2 items-center font-mono text-xs'>
      <p>Description: {dayInfo.description}</p>
      <p>
        Some exercise:{' '}
        {dayInfo.exercises.slice(0, 5).map((ex) => (
          <span key={ex.id}>{ex.title} </span>
        ))}
      </p>

      <Button variant='link' onClick={setOpenModal}>
        See all day
      </Button>
    </div>
  );
};

export default DayInfo;
