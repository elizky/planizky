'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

interface ButtonSocialProps {
  children: React.ReactNode;
  provider: string;
}

const ButtonSocial = ({ children, provider }: ButtonSocialProps) => {
  const handleClick = async () => {
    await signIn(provider);
  };

  return (
    <Button type='button' variant='outline' className='w-full' onClick={handleClick}>
      {children}
    </Button>
  );
};
export default ButtonSocial;
