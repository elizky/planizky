'use client';
import { useState, useTransition } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { registerSchema } from '@/lib/zod';
import { registerAction } from '@/actions/auth-actions';

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

const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setError(null);
    startTransition(async () => {
      const response = await registerAction(values);
      if (response.error) {
        setError(response.error);
      } else {
        router.push('/dashboard');
      }
    });
  }

  const handleLoginGoogle = () => {
    signIn('google');
  };

  return (
    <div className='w-full flex justify-center lg:grid lg:grid-cols-2 h-screen '>
      <div className='flex items-center justify-center py-12 container'>
        <div className='mx-auto grid sm:w-[350px] gap-6'>
          <div className='grid gap-2 text-left'>
            <h1 className='text-3xl font-bold'>Register</h1>
            <p className='text-balance text-muted-foreground'>
              Enter your information to create an account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='grid gap-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Name' type='text' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='email' type='email' {...field} />
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
                        <Input placeholder='password' type='password' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && <FormMessage>{error}</FormMessage>}
                <Button type='submit' className='w-full' disabled={isPending}>
                  Create an account
                </Button>
                <Button
                  type='button'
                  variant='outline'
                  className='w-full'
                  disabled={isPending}
                  onClick={handleLoginGoogle}
                >
                  Sign up with Google
                </Button>
              </div>
              <div className='mt-4 text-center text-sm'>
                Already have an account?{' '}
                <Link href='/login' className='underline'>
                  Sign in
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
          className='h-full w-full object-cover filter invert'
        />
      </div>
    </div>
  );
};

export default RegisterForm;
