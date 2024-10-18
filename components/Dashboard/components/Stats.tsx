import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Dumbbell, Clock } from 'lucide-react';

const Stats = () => {
  return (
    <div className='space-y-4'>
      <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Your stats</h3>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='grid gap-4 grid-cols-2 md:grid-cols-4 mb-8 w-full'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center justify-between'>
                Stat
                <Dumbbell className='mr-2 h-4 w-4' />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-4xl font-bold text-center'>-</p>
              {/* <p className='text-4xl font-bold text-center'>{completedDays}</p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader >
              <CardTitle className='flex items-center justify-between'>
                Stat
                <Clock className='mr-2 h-4 w-4' />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-4xl font-bold text-center'>-</p>
              {/* <p className='text-4xl font-bold text-center'>{formatTime(totalTime)}</p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader >
              <CardTitle className='flex items-center justify-between'>
                Stat
                <Dumbbell className='mr-2 h-4 w-4' />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-4xl font-bold text-center'>-</p>
              {/* <p className='text-4xl font-bold text-center'>{completedDays}</p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader >
              <CardTitle className='flex items-center justify-between'>
                Stat
                <Clock className='mr-2 h-4 w-4' />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-4xl font-bold text-center'>-</p>
              {/* <p className='text-4xl font-bold text-center'>{formatTime(totalTime)}</p> */}
            </CardContent>
          </Card>
        </div>
      </div >
    </div>
  );
};

export default Stats;
