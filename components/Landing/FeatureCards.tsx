import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Clock, Shield } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Seguimiento de metas',
    description:
      'Define y alcanza tus objetivos de fitness con un monitoreo detallado de tu progreso.',
  },
  {
    icon: Clock,
    title: 'Historial de entrenamientos',
    description: 'Lleva un registro completo de todos tus entrenamientos y mejora con el tiempo.',
  },
  {
    icon: Shield,
    title: 'Datos seguros',
    description: 'Tus datos fitness están protegidos y siempre accesibles.',
  },
];

export function FeatureCards() {
  return (
    <section className='grid md:grid-cols-3 gap-8 mt-20'>
      {features.map((feature, index) => (
        <Card key={index}>
          <CardHeader>
            <div className='h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4'>
              <feature.icon className='h-6 w-6 text-primary' />
            </div>
            <CardTitle className='text-xl font-semibold'>{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
