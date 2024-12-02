import Link from 'next/link';
import { Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  return (
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
          <Button>Empieza</Button>
        </Link>
      </div>
    </nav>
  );
}
