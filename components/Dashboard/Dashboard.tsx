'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Dumbbell, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Label } from '../ui/label';
import { TrainingDay } from '@/types/types';

export default function DashboardComponent({ data }: { data: TrainingDay[] }) {
  const trainingDays = data.map(({ day, type, id }) => ({
    id,
    day,
    type,
  }));
  const router = useRouter();
  const [completedDays, setCompletedDays] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [selectedDay, setSelectedDay] = useState(trainingDays[0].id);
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
    router.push(`/training/${selectedDay}`);
  };

  return (
    <div className='space-y-8'>
      {/* select training day */}
      <div className='mb-8 space-y-4'>
        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
          Selecciona tu día de entrenamiento
        </h3>
        <RadioGroup
          value={selectedDay}
          onValueChange={setSelectedDay}
          className='grid sm:grid-cols-2 gap-4'
        >
          {trainingDays.map((day) => (
            <div key={day.day}>
              <RadioGroupItem value={day.id} id={day.id} className='peer sr-only' />
              <Label
                htmlFor={day.id}
                className='flex flex-col items-center justify-start text-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-muted hover:text-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary h-28 cursor-pointer'
              >
                <span className='text-lg font-semibold'>{day.day}</span>
                <span className='text-sm text-muted-foreground'>{day.type}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
        <div className='pt-8'>
          <Button onClick={handleStartTraining} size='lg' className='w-full'>
            Comenzar Entrenamiento
          </Button>
        </div>
      </div>
      {/* statistics */}
      <div className='space-y-4'>
        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Your stats</h3>
        <div className='flex flex-col sm:flex-row gap-4'>
          {/* progressBar */}
          <Card className='mb-8 sm:w-1/2'>
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
                    <Bar
                      yAxisId='right'
                      dataKey='timeSpent'
                      fill='#82ca9d'
                      name='Tiempo (minutos)'
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          {/* other staff */}
          <div className='grid gap-4 md:grid-cols-2 mb-8 sm:w-1/2'>
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
        </div>
      </div>
    </div>
  );
}
