import { client } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const handler = async (req: Request) => {
  const { postId, userId, comment } = await req.json();

  const newComment = await client.comment.create({
    data: {
      postId,
      userId,
      comment,
    },
  });

  return NextResponse.json({ comment: newComment }, { status: 200 });
};

export { handler as POST };
