import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, ClipboardList, Dumbbell } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Crea tu cuenta',
    description: 'Regístrate fácilmente para comenzar tu viaje fitness.',
  },
  {
    icon: ClipboardList,
    title: 'Diseña tu plan',
    description: 'Crea un plan de entrenamiento personalizado que se ajuste a tus objetivos.',
  },
  {
    icon: Dumbbell,
    title: 'Empieza a entrenar',
    description: 'Sigue tu plan, registra tus progresos y alcanza tus metas.',
  },
];

export function StepsSection() {
  return (
    <section className='py-20'>
      <div className='max-w-4xl mx-auto text-center'>
        <h2 className='text-3xl font-bold mb-6'>Comienza tu viaje fitness en tres simples pasos</h2>
        <div className='grid md:grid-cols-3 gap-8 mt-10'>
          {steps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <div className='h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <step.icon className='h-6 w-6 text-primary' />
                </div>
                <CardTitle className='text-xl font-semibold'>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
