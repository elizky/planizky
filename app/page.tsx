import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home | Planizky ',
};
const Home = () => (
  <div className='bg-cover bg-no-repeat bg-landing-pattern '>
    <div className='flex min-h-screen flex-col items-center justify-center container'>
      <div className='flex flex-col items-center gap-12 bg-white/90 dark:bg-black/90 p-12 lg:py-20 rounded-2xl shadow-2xl'>
        <div className='text-center'>
          <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Welcome to Planizky
          </h1>
          <p className='leading-7 [&:not(:first-child)]:mt-6'>
            Track your gym sessino each day and have statistics from your plan
          </p>
        </div>
        <div className='flex gap-4'>
          <Link href='/login'>
            <Button className='w-24'>Login</Button>
          </Link>
          <Link href='/register'>
            <Button className='w-24'>Register</Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
