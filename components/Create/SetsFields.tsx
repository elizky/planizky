import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { Button } from '../ui/button';
import { emptyMockData } from '@/lib/dataMock';
import { LucideEdit2, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

export default function SetFields({
  nestIndex,
  exerciseIndex,
  control,
}: {
  nestIndex: number;
  exerciseIndex: number;
  control: any;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets`,
  });

  return (
    <div className='space-y-4'>
      <h5 className='text-md font-semibold'>Sets</h5>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {fields.map((field, index) => (
          <SetCard
            key={field.id}
            nestIndex={nestIndex}
            exerciseIndex={exerciseIndex}
            setIndex={index}
            control={control}
            onRemove={() => remove(index)}
            isDisabled={fields.length <= 1}
          />
        ))}
      </div>
      <Button
        type='button'
        onClick={() => append(emptyMockData.trainingDays[0].exercises[0].sets[0])}
        className='w-full'
      >
        <PlusCircle className='mr-2 h-4 w-4' />
        Add Set
      </Button>
    </div>
  );
}

function SetCard({
  nestIndex,
  exerciseIndex,
  setIndex,
  control,
  onRemove,
  isDisabled,
}: {
  nestIndex: number;
  exerciseIndex: number;
  setIndex: number;
  control: any;
  onRemove: () => void;
  isDisabled: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { setValue } = useForm();

  const setData = useWatch({
    control,
    name: `trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets.${setIndex}`,
    defaultValue: emptyMockData.trainingDays[0].exercises[0].sets[0],
  });

  const handleSave = (data: any) => {
    Object.entries(data).forEach(([key, value]) => {
      setValue(
        `trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets.${setIndex}.${key}`,
        value
      );
    });
    setIsOpen(false);
  };

  return (
    <Card>
      <CardContent className='p-4'>
        <div className='flex justify-between items-center mb-2'>
          <h6 className='text-sm font-semibold'>Set {setIndex + 1}</h6>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button variant='ghost' size='icon'>
                <LucideEdit2 className='h-4 w-4' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-80'>
              <SetForm
                nestIndex={nestIndex}
                exerciseIndex={exerciseIndex}
                setIndex={setIndex}
                control={control}
                onSave={handleSave}
                initialData={setData}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className='space-y-1 text-sm'>
          <p>Reps: {setData.repetitions || '-'}</p>
          <p>Weight: {setData.weight ? `${setData.weight}kg` : '-'}</p>
          <p>Duration: {setData.duration ? `${setData.duration}s` : '-'}</p>
          <p>Rest: {setData.restTime ? `${setData.restTime}s` : '-'}</p>
        </div>
        <Button
          type='button'
          variant='outline'
          onClick={onRemove}
          disabled={isDisabled}
          className='w-full mt-2'
        >
          <Trash2 className='mr-2 h-4 w-4' />
          Remove
        </Button>
      </CardContent>
    </Card>
  );
}

function SetForm({
  nestIndex,
  exerciseIndex,
  setIndex,
  control,
  onSave,
  initialData,
}: {
  nestIndex: number;
  exerciseIndex: number;
  setIndex: number;
  control: any;
  onSave: (data: any) => void;
  initialData: any;
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className='space-y-4'>
      <div className='space-y-2'>
        <Label
          htmlFor={`trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets.${setIndex}.repetitions`}
        >
          Repetitions
        </Label>
        <Input
          {...register(`repetitions`, { valueAsNumber: true })}
          type='number'
          id={`trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets.${setIndex}.repetitions`}
        />
      </div>
      <div className='space-y-2'>
        <Label
          htmlFor={`trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets.${setIndex}.weight`}
        >
          Weight (kg)
        </Label>
        <Input
          {...register(`weight`, { valueAsNumber: true })}
          type='number'
          id={`trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets.${setIndex}.weight`}
        />
      </div>
      <div className='space-y-2'>
        <Label
          htmlFor={`trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets.${setIndex}.duration`}
        >
          Duration (seconds)
        </Label>
        <Input
          {...register(`duration`, { valueAsNumber: true })}
          type='number'
          id={`trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets.${setIndex}.duration`}
        />
      </div>
      <div className='space-y-2'>
        <Label
          htmlFor={`trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets.${setIndex}.restTime`}
        >
          Rest Time (seconds)
        </Label>
        <Input
          {...register(`restTime`, { valueAsNumber: true })}
          type='number'
          id={`trainingDays.${nestIndex}.exercises.${exerciseIndex}.sets.${setIndex}.restTime`}
        />
      </div>
      <Button type='submit' className='w-full'>
        Save
      </Button>
    </form>
  );
}
