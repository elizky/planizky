import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Navigation } from '@/components/Landing/NavBar';
import { Hero } from '@/components/Landing/Hero';
import { FeatureCards } from '@/components/Landing/FeatureCards';
import { StepsSection } from '@/components/Landing/Steps';
import { Footer } from '@/components/Landing/Footer';
export const metadata: Metadata = {
  title: 'Home | Planizky ',
};

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect('/dashboard');
  }
  return (
    <div className='min-h-screen bg-muted/40'>
      <div className='container mx-auto px-4'>
        <Navigation />
        <Hero />
      </div>
      <div className='container mx-auto px-4 pb-20 space-y-20'>
        <FeatureCards />
        <StepsSection />
      </div>
      <Footer />
    </div>
  );
}
