'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Upload, FileText, PlusCircle } from 'lucide-react';
import { TrainingForm } from '../Forms/TrainingForm';

export default function EmptyDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const csvInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: 'csv' | 'json'
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would handle the file upload and parsing
      // For now, we'll just show a success message
      toast({
        title: 'File uploaded',
        description: `${fileType.toUpperCase()} file "${
          file.name
        }" has been uploaded successfully.`,
      });
    }
  };

  const handleManualEntry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const trainingData = {
      day: formData.get('day'),
      type: formData.get('type'),
      exercises: formData.get('exercises'),
    };
    // Here you would handle the manual data entry
    // For now, we'll just show a success message
    toast({
      title: 'Training day added',
      description: `Training day "${trainingData.day}" has been added successfully.`,
    });
    setIsDialogOpen(false);
  };

  return (
    <div className='container mx-auto p-4 max-w-xl'>
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle>No hay plan de entrenamiento</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='mb-8'>
            Para comenzar, añade días de entrenamiento utilizando una de las siguientes opciones:
          </p>
          <div className='grid grid-cols-1 gap-8'>
            <Button
              onClick={() => csvInputRef.current?.click()}
              className='flex items-center justify-center'
            >
              <Upload className='mr-2 h-4 w-4' /> Subir CSV
            </Button>
            <input
              type='file'
              ref={csvInputRef}
              onChange={(e) => handleFileUpload(e, 'csv')}
              accept='.csv'
              className='hidden'
            />

            <Button
              onClick={() => jsonInputRef.current?.click()}
              className='flex items-center justify-center'
            >
              <FileText className='mr-2 h-4 w-4' /> Subir JSON
            </Button>
            <input
              type='file'
              ref={jsonInputRef}
              onChange={(e) => handleFileUpload(e, 'json')}
              accept='.json'
              className='hidden'
            />
            <TrainingForm>
              <Button className='flex items-center justify-center'>
                <PlusCircle className='mr-2 h-4 w-4' /> Entrada Manual
              </Button>
            </TrainingForm>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
