import AnimatedSVG from '@/components/AnimatedSVG';

export default function Loading() {
  return (
    <div className='h-[calc(100vh-56px)] sm:h-[calc(100vh-88px)] place-content-center text-center'>
      <AnimatedSVG />
    </div>
  );
}
