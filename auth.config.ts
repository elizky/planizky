import { loginSchema } from '@/lib/zod';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import Google from 'next-auth/providers/google';
import { db } from './server/db/prisma';

export default {
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);
        console.log('data', data);

        if (!success) {
          throw new Error('Invalid credentials');
        }

        // verificar si existe el usuario en la base de datos
        const user = await db.user.findUnique({
          where: {
            email: data.email,
          },
        });

        if (!user || !user.password) {
          throw new Error('No user found');
        }

        // verificar si la contraseña es correcta
        const isValid = await bcrypt.compare(data.password, user.password);

        if (!isValid) {
          throw new Error('Incorrect password');
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
