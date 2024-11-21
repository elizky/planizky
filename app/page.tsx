import { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Dumbbell, Shield, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Home | Planizky ',
};

const Home = async () => {
  const session = await auth();
  console.log('session', session);
  return (
    <div className='min-h-screen bg-gradient-to-r from-slate-900 to-slate-700'>
      <div className='container mx-auto px-4'>
        {/* Hero Section */}
        <nav className='py-6 flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <Dumbbell className='h-6 w-6' />
            <span className='font-bold text-xl'>GymTrack</span>
          </div>
          <div className='space-x-4'>
            <Link href='/login'>
              <Button variant='ghost'>Login</Button>
            </Link>
            <Link href='/register'>
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
        <main className='py-20'>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80'>
              Transform Your Fitness Journey
            </h1>
            <p className='text-xl text-muted-foreground mb-8'>
              Track your workouts, monitor progress, and achieve your fitness goals with our
              comprehensive gym tracking platform.
            </p>
            <Link href='/register'>
              <Button size='lg' className='gap-2'>
                Start Your Journey <ArrowRight className='h-4 w-4' />
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className='grid md:grid-cols-3 gap-8 mt-20'>
            <div className='bg-card p-6 rounded-lg shadow-lg'>
              <div className='h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4'>
                <Target className='h-6 w-6 text-primary' />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Goal Tracking</h3>
              <p className='text-muted-foreground'>
                Set and track your fitness goals with detailed progress monitoring.
              </p>
            </div>
            <div className='bg-card p-6 rounded-lg shadow-lg'>
              <div className='h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4'>
                <Clock className='h-6 w-6 text-primary' />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Workout History</h3>
              <p className='text-muted-foreground'>
                Keep a detailed log of all your workouts and track your improvements.
              </p>
            </div>
            <div className='bg-card p-6 rounded-lg shadow-lg'>
              <div className='h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4'>
                <Shield className='h-6 w-6 text-primary' />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Secure Data</h3>
              <p className='text-muted-foreground'>
                Your fitness data is safely stored and always accessible.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
