import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import { client } from './prisma';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string;
      email?: string;
      image?: string;
      id?: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(client),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Invalid Credentials');
        }
        const user = await client.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user || !user.password) {
          throw new Error('Invalid Credentials');
        }

        const isCorrectPassword = await bcryptjs.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid Credentials');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
    async jwt({ token }) {
      return {
        ...token,
        id: token.sub,
      };
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
