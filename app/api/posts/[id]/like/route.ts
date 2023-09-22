import { client } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const handler = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { userId } = await req.json();
  const { id } = params;

  const post = await client.post.findFirst({
    where: {
      id,
    },
  });

  let postUpdate;

  if (post?.likedIDs.includes(userId)) {
    const filteredIDs = post.likedIDs.filter((item) => item !== userId);
    postUpdate = await client.post.update({
      where: {
        id,
      },
      data: {
        likedIDs: filteredIDs,
      },
    });
  } else {
    postUpdate = await client.post.update({
      where: {
        id,
      },
      data: {
        likedIDs: {
          push: userId,
        },
      },
    });
  }

  return NextResponse.json({ postUpdate }, { status: 200 });
};

export { handler as PATCH };
