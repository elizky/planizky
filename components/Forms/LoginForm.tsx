'use client';
import { useState, useTransition } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema } from '@/lib/zod';
import { loginAction } from '@/actions/auth-actions';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError(null);
    startTransition(async () => {
      const response = await loginAction(values);
      if (response.error) {
        setError(response.error);
      } else {
        router.push('/dashboard');
      }
    });
  }

  const handleLoginGoogle = async () => {
    await signIn('google');
  };

  return (
    <div className='w-full flex justify-center lg:grid lg:grid-cols-2 h-screen '>
      <div className='flex items-center justify-center py-12 container'>
        <div className='mx-auto grid sm:w-[350px] gap-6'>
          <div className='grid gap-2 text-left'>
            <h1 className='text-3xl font-bold'>Login</h1>
            <p className=' text-muted-foreground'>
              Enter your credentials to login to your account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='grid gap-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input id='email' type='email' placeholder='m@example.com' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input id='password' type='password' placeholder='******' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && <FormMessage>{error}</FormMessage>}
                <Button type='submit' className='w-full' disabled={isPending}>
                  Login
                </Button>
                <Button
                  type='button'
                  variant='outline'
                  className='w-full'
                  onClick={handleLoginGoogle}
                >
                  Login with Google
                </Button>
              </div>
              <div className='mt-4 text-center text-sm'>
                Don&apos;t have an account?{' '}
                <Link href='/register' className='underline'>
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className='hidden lg:block'>
        <Image
          src='/pattern.jpg'
          alt='Image'
          width='1920'
          height='1080'
          className='h-full w-full object-cover '
        />
      </div>
    </div>
  );
};

export default LoginForm;
