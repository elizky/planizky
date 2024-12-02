import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <div className='flex items-center justify-center min-h-screen -mt-[88px]'>
      <div className='max-w-3xl mx-auto text-center'>
        <h1 className='text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80'>
          Transforma tu rutina de ejercicio
        </h1>
        <p className='text-xl text-muted-foreground mb-8'>
          Monitorea tus entrenamientos, sigue tu progreso y alcanza tus metas fitness con nuestra
          completa plataforma de seguimiento.
        </p>
        <Link href='/register'>
          <Button size='lg' className='gap-2'>
            Comienza tu entrenamiento <ArrowRight className='h-4 w-4' />
          </Button>
        </Link>
      </div>
    </div>
  );
}
