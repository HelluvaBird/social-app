import { NextResponse } from 'next/server';
import { client } from '@/lib/prisma';

const handler = async (req: Request) => {
  try {
    const { description, userId } = await req.json();

    const newPost = await client.post.create({
      data: {
        userId,
        description,
      },
    });

    return new NextResponse(JSON.stringify(newPost), { status: 200 });
  } catch (error) {
    return new NextResponse('Something went wrong posting new post');
  }
};

export { handler as POST };
