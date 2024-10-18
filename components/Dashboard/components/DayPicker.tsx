import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import DayInfo from '../DayInfo';
import { Exercise } from '@prisma/client';

interface DayPickerProps {
  selectedDay: string;
  setSelectedDay: React.Dispatch<React.SetStateAction<string>>;
  trainingDays: {
    id: string;
    title: string;
    type: string;
  }[];
  handleStartTraining: () => void;
  dayInfo: { exercises: Exercise[]; title: string; description: string | null };
  setOpenModal: any;
}

const DayPicker = ({
  selectedDay,
  setSelectedDay,
  trainingDays,
  handleStartTraining,
  dayInfo,
  setOpenModal,
}: DayPickerProps) => {
  return (
    <div className='mb-8 space-y-4'>
      <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
        Selecciona tu día de entrenamiento
      </h3>
      <RadioGroup
        value={selectedDay}
        onValueChange={setSelectedDay}
        className='grid grid-cols-2 sm:grid-cols-4 gap-4'
      >
        {trainingDays.map((day) => (
          <div key={day.id}>
            <RadioGroupItem value={day.id} id={day.id} className='peer sr-only' />
            <Label
              htmlFor={day.id}
              className='flex flex-col items-center justify-start text-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-muted hover:text-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary h-28 cursor-pointer'
            >
              <span className='text-lg font-semibold'>{day.title}</span>
              <span className='text-sm text-muted-foreground'>{day.type}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
      <DayInfo dayInfo={dayInfo} setOpenModal={setOpenModal} />

      <div className='pt-8'>
        <Button onClick={handleStartTraining} size='lg' className='w-full'>
          Comenzar Entrenamiento
        </Button>
      </div>
    </div>
  );
};

export default DayPicker;
