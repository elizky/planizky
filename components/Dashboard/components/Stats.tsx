import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { Dumbbell, Clock, Timer, Activity, Trophy } from 'lucide-react';

const Stats = () => {
  return (
    <div className='space-y-4'>
      <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Your stats</h3>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='grid gap-4 grid-cols-2 md:grid-cols-4 mb-8 w-full'>
          <Card className='bg-[#1e1e2d] border-0'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-sm font-medium text-white'>Workout Time</CardTitle>
              <Timer className='h-4 w-4 text-green-400' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-white'>1h 12m</div>
              <Progress value={65} className='mt-2' />
              <p className='text-xs text-zinc-400 mt-2'>Average session duration</p>
            </CardContent>
          </Card>
          <Card className='bg-[#1e1e2d] border-0'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-sm font-medium text-white'>Monthly Progress</CardTitle>
              <Activity className='h-4 w-4 text-blue-400' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-white'>16/20</div>
              <Progress value={80} className='mt-2' />
              <p className='text-xs text-zinc-400 mt-2'>Workouts completed</p>
            </CardContent>
          </Card>
          <Card className=' bg-[#1e1e2d] border-0'>
            <CardHeader>
              <CardTitle className='text-white flex items-center gap-2'>
                <Trophy className='h-5 w-5 text-yellow-400' />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {[
                  {
                    title: '5 Day Streak',
                    description: 'Completed workouts 5 days in a row',
                    date: 'Today',
                  },
                  {
                    title: 'New PR',
                    description: 'Bench Press: 100kg',
                    date: 'Yesterday',
                  },
                  {
                    title: 'Monthly Goal',
                    description: 'Completed 80% of monthly target',
                    date: '3 days ago',
                  },
                ].map((achievement, index) => (
                  <div key={index} className='flex items-center gap-4 p-3 rounded-lg bg-black/20'>
                    <div className='flex-1'>
                      <h3 className='font-semibold text-white'>{achievement.title}</h3>
                      <p className='text-sm text-zinc-400'>{achievement.description}</p>
                    </div>
                    <div className='text-xs text-zinc-500'>{achievement.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Stats;
