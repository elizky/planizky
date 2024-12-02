import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function EmptyDashboard() {
  return (
    <Card className='mt-16 text-center'>
      <CardHeader>
        <CardTitle>No hay plan de entrenamiento</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='mb-8'>Para comenzar, carga tu plan de entrenamiento a continuación</p>
        <div className='grid grid-cols-1 gap-8'>
          <Link href='/gym-plans/create' className='flex items-center justify-center'>
            <Button className='w-full'>
              <PlusCircle className='mr-2 h-4 w-4' /> Crear Plan
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
