'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Plan } from '@/types/types';
import DayPicker from './components/DayPicker';
import Stats from './components/Stats';
import ModalTrainingDay from './ModalTrainingDay';

export default function DashboardComponent({ data }: { data: Plan[] }) {
  const [openModal, setOpenModal] = useState(false);

  const activePlan = data.find((plan) => plan.isActive) || data[0];

  const trainingDays = activePlan.trainingDays.map(({ id, title, description, exercises }) => ({
    id,
    title,
    description,

    exercises,
  }));

  const router = useRouter();

  const [selectedDay, setSelectedDay] = useState(trainingDays[0].id);

  const dayInfo = trainingDays
    .filter((day) => day.id === selectedDay)
    .map(({ exercises, title, description }) => ({ exercises, title, description }))[0];

  const handleStartTraining = () => {
    router.push(`/training/${selectedDay}`);
  };

  return (
    <div className='space-y-8'>
      <h3>
        Estas con el plan{' '}
        <span className='font-bold underline underline-offset-4'>{activePlan.title}</span>
      </h3>
      {/* select training day */}
      <DayPicker
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        trainingDays={trainingDays}
        handleStartTraining={handleStartTraining}
        dayInfo={dayInfo}
        setOpenModal={setOpenModal}
      />
      {/* statistics */}
      {/* <Stats /> */}
      {/* modal */}
      <ModalTrainingDay
        open={openModal}
        handleClose={setOpenModal}
        dayInfo={dayInfo}
        handleStartTraining={handleStartTraining}
      />
    </div>
  );
}
