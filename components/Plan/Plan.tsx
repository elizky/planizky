'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlusCircle, Search, Activity, Calendar, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Plan } from '@/types/types';
import PlanTable from './Table';
import { InputSearch } from '../ui/input-search';

export default function PlanPage({ plans }: { plans: Plan[] }) {
  console.log('plans', plans);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlans = plans.filter(
    (plan) =>
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activePlans = filteredPlans.filter((plan) => plan.isActive);
  const inactivePlans = filteredPlans.filter((plan) => !plan.isActive);

  const totalPlans = plans.length;
  const totalTrainingDays = plans.reduce((sum, plan) => sum + plan.trainingDays.length, 0);

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-baseline mb-6'>
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-8'>
          Gym Plans
        </h1>
        <Link href='/gym-plans/create'>
          <Button>
            <PlusCircle className='mr-2 h-4 w-4' />
            Create New Plan
          </Button>
        </Link>
      </div>

      <div className='grid gap-4 md:grid-cols-3 mb-6'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Plans</CardTitle>
            <Activity className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalPlans}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Training Days</CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalTrainingDays}</div>
          </CardContent>
        </Card>
      </div>

      <div className='mb-6'>
        <InputSearch
          placeholder='Search plans...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='max-w-sm'
          icon={<Search className='h-4 w-4 text-muted-foreground' />}
        />
      </div>

      <Tabs defaultValue='all' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='all'>All Plans</TabsTrigger>
          <TabsTrigger value='active'>Active Plans</TabsTrigger>
          <TabsTrigger value='inactive'>Inactive Plans</TabsTrigger>
        </TabsList>
        <TabsContent value='all' className='space-y-4'>
          <PlanTable plans={filteredPlans} />
        </TabsContent>
        <TabsContent value='active' className='space-y-4'>
          <PlanTable plans={activePlans} />
        </TabsContent>
        <TabsContent value='inactive' className='space-y-4'>
          <PlanTable plans={inactivePlans} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
