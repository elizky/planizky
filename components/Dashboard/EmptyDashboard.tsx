'use client';

import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { toast } from '@/components/ui/use-toast';
import { Upload, FileText, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function EmptyDashboard() {
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
            <Link href='/create' className='flex items-center justify-center'>
              <Button className='w-full'>
                <PlusCircle className='mr-2 h-4 w-4' /> Entrada Manual
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
