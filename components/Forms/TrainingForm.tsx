import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Minus, Plus } from 'lucide-react';

type Exercise = {
  name: string;
  sets: number;
  reps: string;
  weight: string;
};

type TrainingDay = {
  name: string;
  exercises: Exercise[];
};

type TrainingPlan = {
  name: string;
  description: string;
  days: TrainingDay[];
};

export function TrainingForm({ children }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [plan, setPlan] = useState<TrainingPlan>({
    name: '',
    description: '',
    days: [],
  });

  const handlePlanDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const handleDayNameChange = (index: number, name: string) => {
    const updatedDays = [...plan.days];
    updatedDays[index] = { ...updatedDays[index], name };
    setPlan({ ...plan, days: updatedDays });
  };

  const handleExerciseChange = (
    dayIndex: number,
    exerciseIndex: number,
    field: keyof Exercise,
    value: string | number
  ) => {
    const updatedDays = [...plan.days];
    const updatedExercises = [...updatedDays[dayIndex].exercises];
    updatedExercises[exerciseIndex] = { ...updatedExercises[exerciseIndex], [field]: value };
    updatedDays[dayIndex] = { ...updatedDays[dayIndex], exercises: updatedExercises };
    setPlan({ ...plan, days: updatedDays });
  };

  const addExercise = (dayIndex: number) => {
    const updatedDays = [...plan.days];
    updatedDays[dayIndex].exercises.push({ name: '', sets: 1, reps: '', weight: '' });
    setPlan({ ...plan, days: updatedDays });
  };

  const removeExercise = (dayIndex: number, exerciseIndex: number) => {
    const updatedDays = [...plan.days];
    updatedDays[dayIndex].exercises.splice(exerciseIndex, 1);
    setPlan({ ...plan, days: updatedDays });
  };

  const handleSubmit = () => {
    // Here you would handle saving the plan data
    console.log('Submitted plan:', plan);
    setIsOpen(false);
    setStep(0);
    setPlan({ name: '', description: '', days: [] });
  };

  const handleNext = () => {
    if (step === 0) {
      const numberOfDays = parseInt(plan.days.length.toString());
      setPlan({
        ...plan,
        days: Array.from({ length: numberOfDays }, (_, i) => ({
          name: `Day ${i + 1}`,
          exercises: [],
        })),
      });
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Añadir Plan de Entrenamiento</DialogTitle>
          <DialogDescription>
            Crea tu plan de entrenamiento personalizado.{' '}
            {step === 0
              ? 'Comienza con los detalles básicos.'
              : `Configura el Día ${step} de tu plan.`}
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          {step === 0 ? (
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Nombre del Plan</Label>
                <Input
                  id='name'
                  name='name'
                  value={plan.name}
                  onChange={handlePlanDetailsChange}
                  placeholder='Ej: Plan de 4 semanas para principiantes'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='description'>Descripción</Label>
                <Textarea
                  id='description'
                  name='description'
                  value={plan.description}
                  onChange={handlePlanDetailsChange}
                  placeholder='Describe brevemente tu plan de entrenamiento'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='days'>Número de Días</Label>
                <Input
                  id='days'
                  name='days'
                  type='number'
                  min='1'
                  value={plan.days.length}
                  onChange={(e) =>
                    setPlan({
                      ...plan,
                      days: Array(parseInt(e.target.value)).fill({ name: '', exercises: [] }),
                    })
                  }
                  placeholder='Ej: 7'
                />
              </div>
            </div>
          ) : (
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor={`day-${step}-name`}>Nombre del Día</Label>
                <Input
                  id={`day-${step}-name`}
                  value={plan.days[step - 1].name}
                  onChange={(e) => handleDayNameChange(step - 1, e.target.value)}
                  placeholder='Ej: Día de Piernas'
                />
              </div>
              <div className='space-y-4'>
                <Label>Ejercicios</Label>
                {plan.days[step - 1].exercises.map((exercise, index) => (
                  <div key={index} className='space-y-2 p-4 border rounded-md'>
                    <div className='flex justify-between items-center'>
                      <Label htmlFor={`exercise-${index}-name`}>Ejercicio {index + 1}</Label>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => removeExercise(step - 1, index)}
                      >
                        <Minus className='h-4 w-4' />
                      </Button>
                    </div>
                    <Input
                      id={`exercise-${index}-name`}
                      value={exercise.name}
                      onChange={(e) =>
                        handleExerciseChange(step - 1, index, 'name', e.target.value)
                      }
                      placeholder='Nombre del ejercicio'
                    />
                    <div className='grid grid-cols-3 gap-2'>
                      <div>
                        <Label htmlFor={`exercise-${index}-sets`}>Series</Label>
                        <Input
                          id={`exercise-${index}-sets`}
                          type='number'
                          min='1'
                          value={exercise.sets}
                          onChange={(e) =>
                            handleExerciseChange(step - 1, index, 'sets', parseInt(e.target.value))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor={`exercise-${index}-reps`}>Repeticiones</Label>
                        <Input
                          id={`exercise-${index}-reps`}
                          value={exercise.reps}
                          onChange={(e) =>
                            handleExerciseChange(step - 1, index, 'reps', e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor={`exercise-${index}-weight`}>Peso</Label>
                        <Input
                          id={`exercise-${index}-weight`}
                          value={exercise.weight}
                          onChange={(e) =>
                            handleExerciseChange(step - 1, index, 'weight', e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  className='mt-2'
                  onClick={() => addExercise(step - 1)}
                >
                  <Plus className='mr-2 h-4 w-4' /> Añadir Ejercicio
                </Button>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          {step > 0 && (
            <Button type='button' variant='outline' onClick={handleBack}>
              Atrás
            </Button>
          )}
          {step < plan.days.length ? (
            <Button type='button' onClick={handleNext}>
              Siguiente
            </Button>
          ) : (
            <Button type='button' onClick={handleSubmit}>
              Guardar Plan
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
