'use client';

import React, { useState, useEffect } from 'react';
import { Exercise, Set } from '@/types/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { updateExerciseAction } from '@/actions/exercise-actions';

interface EditExerciseModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  exercise: Exercise | null;
  onExerciseEdit: (updatedExercise: Exercise) => void;
}

export default function EditExerciseModal({
  isOpen,
  onOpenChange,
  exercise,
  onExerciseEdit,
}: EditExerciseModalProps) {
  const [editedExercise, setEditedExercise] = useState<Exercise | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (exercise) {
      setEditedExercise({ ...exercise });
    }
  }, [exercise]);

  const handleInputChange = (field: keyof Exercise, value: string) => {
    if (editedExercise) {
      setEditedExercise({ ...editedExercise, [field]: value });
    }
  };

  const handleSetEdit = (setIndex: number, field: keyof Set, value: number | null) => {
    if (editedExercise) {
      const updatedSets = [...editedExercise.sets];
      const parsedValue = value === 0 ? null : value;

      if (field === 'repetitions' && parsedValue !== null) {
        updatedSets[setIndex] = {
          ...updatedSets[setIndex],
          repetitions: parsedValue,
          duration: null,
        };
      } else if (field === 'duration' && parsedValue !== null) {
        updatedSets[setIndex] = {
          ...updatedSets[setIndex],
          duration: parsedValue,
          repetitions: 0,
        };
      } else {
        updatedSets[setIndex] = { ...updatedSets[setIndex], [field]: parsedValue };
      }

      setEditedExercise({ ...editedExercise, sets: updatedSets });
    }
  };

  const handleAddSet = () => {
    if (editedExercise) {
      const newSet: Set = {
        id: `new-set-${Date.now()}`,
        exerciseId: editedExercise.id,
        repetitions: 0,
        weight: null,
        duration: null,
        restTime: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setEditedExercise({
        ...editedExercise,
        sets: [...editedExercise.sets, newSet],
      });
    }
  };

  const handleRemoveSet = (setIndex: number) => {
    if (editedExercise) {
      const updatedSets = editedExercise.sets.filter((_, index) => index !== setIndex);
      setEditedExercise({ ...editedExercise, sets: updatedSets });
    }
  };

  const handleSave = async () => {
    if (editedExercise) {
      setIsSaving(true);
      try {
        await updateExerciseAction({
          id: editedExercise.id,
          title: editedExercise.title,
          description: editedExercise.description || undefined,
          category: editedExercise.category,
          muscleGroup: editedExercise.muscleGroup,
          sets: editedExercise.sets.map((set) => ({
            id: set.id,
            exerciseId: set.exerciseId,
            repetitions: set.repetitions,
            weight: set.weight,
            createdAt: set.createdAt,
            updatedAt: set.updatedAt,
            duration: set.duration,
            restTime: set.restTime,
          })),
        });
        onExerciseEdit(editedExercise);
        onOpenChange(false);
      } catch (error) {
        console.error('Error al guardar el ejercicio:', error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (!editedExercise) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[625px]'>
        <ScrollArea className='max-h-[80vh] px-1'>
          <DialogHeader>
            <DialogTitle>Editar {editedExercise.title}</DialogTitle>
          </DialogHeader>
          <Accordion type='single' collapsible className='w-full'>
            <AccordionItem value='exercise-info'>
              <AccordionTrigger>Información del Ejercicio</AccordionTrigger>
              <AccordionContent>
                <div className='grid gap-4 py-4'>
                  <div className='grid gap-2'>
                    <Label htmlFor='title'>Título</Label>
                    <Input
                      id='title'
                      value={editedExercise.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='description'>Descripción</Label>
                    <Textarea
                      id='description'
                      value={editedExercise.description || ''}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='category'>Categoría</Label>
                    <Select
                      value={editedExercise.category}
                      onValueChange={(value) => handleInputChange('category', value)}
                    >
                      <SelectTrigger id='category'>
                        <SelectValue placeholder='Selecciona una categoría' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='STRENGTH'>Fuerza</SelectItem>
                        <SelectItem value='CARDIO'>Cardio</SelectItem>
                        <SelectItem value='FLEXIBILITY'>Flexibilidad</SelectItem>
                        <SelectItem value='BALANCE'>Equilibrio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='muscleGroup'>Grupo Muscular</Label>
                    <Input
                      id='muscleGroup'
                      value={editedExercise.muscleGroup}
                      onChange={(e) => handleInputChange('muscleGroup', e.target.value)}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='series-editing'>
              <AccordionTrigger>Edición de Series</AccordionTrigger>
              <AccordionContent>
                <div className='mt-4'>
                  <div className='flex justify-between items-center mb-2'>
                    <h3 className='text-lg font-medium'>Series</h3>
                    <Button onClick={handleAddSet} variant='outline' size='sm'>
                      <PlusCircle className='mr-2 h-4 w-4' />
                      Añadir Serie
                    </Button>
                  </div>
                  <div className='overflow-x-auto'>
                    <Table className='w-full'>
                      <TableHeader>
                        <TableRow>
                          <TableHead className='w-[80px] px-2'>Reps</TableHead>
                          <TableHead className='w-[80px] px-2'>Peso (kg)</TableHead>
                          <TableHead className='w-[80px] px-2'>Dur (seg)</TableHead>
                          <TableHead className='w-[80px] px-2'>Desc (seg)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {editedExercise.sets.map((set, index) => (
                          <TableRow key={set.id}>
                            <TableCell className='px-2'>
                              <Input
                                type='number'
                                value={set.repetitions}
                                onChange={(e) =>
                                  handleSetEdit(
                                    index,
                                    'repetitions',
                                    parseInt(e.target.value) || null
                                  )
                                }
                                className='w-full sm:w-24'
                              />
                            </TableCell>
                            <TableCell className='px-2'>
                              <Input
                                type='number'
                                value={set.weight ?? ''}
                                onChange={(e) =>
                                  handleSetEdit(index, 'weight', parseFloat(e.target.value) || null)
                                }
                                className='w-full sm:w-24'
                              />
                            </TableCell>
                            <TableCell className='px-2'>
                              <Input
                                type='number'
                                value={set.duration ?? ''}
                                onChange={(e) =>
                                  handleSetEdit(index, 'duration', parseInt(e.target.value) || null)
                                }
                                className='w-full sm:w-24'
                              />
                            </TableCell>
                            <TableCell className='px-2'>
                              <Input
                                type='number'
                                value={set.restTime ?? ''}
                                onChange={(e) =>
                                  handleSetEdit(index, 'restTime', parseInt(e.target.value) || null)
                                }
                                className='w-full sm:w-24'
                              />
                            </TableCell>
                            <TableCell className='px-2'>
                              <Button
                                onClick={() => handleRemoveSet(index)}
                                variant='ghost'
                                size='sm'
                                className='text-destructive hover:text-destructive p-0 h-8 w-8'
                              >
                                <Trash2 className='h-4 w-4' />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>
        <DialogFooter className='mt-6'>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
