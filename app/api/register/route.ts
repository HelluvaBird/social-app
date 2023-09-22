import { client } from '@/lib/prisma';
import { genSalt, hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

async function handler(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const user = await client.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
      },
    });

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse('Something went wrong register new user', {
      status: 200,
    });
  }
}

export { handler as POST };
