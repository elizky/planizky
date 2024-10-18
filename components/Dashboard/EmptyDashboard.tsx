import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function EmptyDashboard() {
  return (
    <div className='container mx-auto p-4 max-w-xl'>
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle>No hay plan de entrenamiento</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='mb-8'>
            Para comenzar, añade días de entrenamiento utilizando una de las siguientes opciones:
          </p>
          <div className='grid grid-cols-1 gap-8'>
            <Link href='/create' className='flex items-center justify-center'>
              <Button className='w-full'>
                <PlusCircle className='mr-2 h-4 w-4' /> Entrada Manual
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
