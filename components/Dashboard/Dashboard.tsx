'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Dumbbell, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Label } from '../ui/label';
import { dataMock } from '@/lib/dataMock';

export default function DashboardComponent() {
  const data = dataMock;
  const trainingDays = data.map(({ day, type }) => ({
    day,
    type,
  }));
  const router = useRouter();
  const [completedDays, setCompletedDays] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [selectedDay, setSelectedDay] = useState(trainingDays[0].day);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const days = parseInt(localStorage.getItem('completedDays') || '0');
    const time = parseInt(localStorage.getItem('totalTime') || '0');
    setCompletedDays(days);
    setTotalTime(time);

    // Retrieve and parse chart data from localStorage
    const storedChartData = JSON.parse(localStorage.getItem('chartData') || '[]');
    setChartData(storedChartData);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  const handleStartTraining = () => {
    router.push(`/training?day=${selectedDay}`);
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Resumen de Entrenamiento</h1>
      <div className='grid gap-4 md:grid-cols-2 max-w-2xl mx-auto mb-8'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <Dumbbell className='mr-2' />
              Días Completados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-4xl font-bold text-center'>{completedDays}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <Clock className='mr-2' />
              Tiempo Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-4xl font-bold text-center'>{formatTime(totalTime)}</p>
          </CardContent>
        </Card>
      </div>

      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Progreso por Día</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='w-full h-64'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={chartData}>
                <XAxis dataKey='day' />
                <YAxis yAxisId='left' orientation='left' stroke='#8884d8' />
                <YAxis yAxisId='right' orientation='right' stroke='#82ca9d' />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId='left'
                  dataKey='completedExercises'
                  fill='#8884d8'
                  name='Ejercicios Completados'
                />
                <Bar yAxisId='right' dataKey='timeSpent' fill='#82ca9d' name='Tiempo (minutos)' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className='mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>Selecciona tu día de entrenamiento</h2>
        <RadioGroup
          value={selectedDay}
          onValueChange={setSelectedDay}
          className='grid grid-cols-2 gap-4'
        >
          {trainingDays.map((day) => (
            <div key={day.day}>
              <RadioGroupItem value={day.day} id={day.day} className='peer sr-only' />
              <Label
                htmlFor={day.day}
                className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
              >
                <span className='text-lg font-semibold'>{day.day}</span>
                <span className='text-sm text-muted-foreground'>{day.type}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className='text-center'>
        <Button onClick={handleStartTraining} size='lg'>
          Comenzar Entrenamiento
        </Button>
      </div>
    </div>
  );
}
