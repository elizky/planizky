import { handleActivate } from '@/actions/dashboard-actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Plan } from '@/types/types';

import { Dumbbell, Clock, Text, CheckCircle2 } from 'lucide-react';

interface StatsProps {
  totalTrainingData: Plan[];

  activePlan: Plan;
}

const Stats = ({ totalTrainingData, activePlan }: StatsProps) => {
  return (
    <div className='space-y-4'>
      <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Your stats</h3>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='grid gap-4 md:grid-cols-2 mb-8 w-full'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Dumbbell className='mr-2' />
                Días Completados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-4xl font-bold text-center'>falta</p>
              {/* <p className='text-4xl font-bold text-center'>{completedDays}</p> */}
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
              <p className='text-4xl font-bold text-center'>falta</p>
              {/* <p className='text-4xl font-bold text-center'>{formatTime(totalTime)}</p> */}
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
              <p className='text-4xl font-bold text-center'>falta</p>
              {/* <p className='text-4xl font-bold text-center'>{completedDays}</p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Text className='mr-2' />
                All My Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              {totalTrainingData.map((plan, i) => (
                <Tooltip key={`${plan.title}_${i}`}>
                  <TooltipTrigger className='flex justify-between items-center'>
                    <Button
                      className={`${plan.isActive && 'text-green-500'}`}
                      variant='link'
                      onClick={async () => handleActivate(plan.id, activePlan)}
                    >
                      {plan.title}
                    </Button>
                    {plan.isActive && <CheckCircle2 className='h-4 w-4' />}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click for active this plan</p>
                  </TooltipContent>
                  <div></div>
                </Tooltip>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Stats;
