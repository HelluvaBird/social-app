import { client } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const handler = async (
  req: Request,
  { params }: { params: { id: string; friendId: string } }
) => {
  const { id, friendId } = params;

  let user = await client.user.findFirst({
    where: {
      id,
    },
  });

  if (user?.friends.includes(friendId)) {
    const removeFriend = user.friends.filter((item) => item !== friendId);

    user = await client.user.update({
      where: {
        id,
      },
      data: {
        friends: removeFriend,
      },
    });
  } else {
    user = await client.user.update({
      where: {
        id,
      },
      data: {
        friends: {
          push: friendId,
        },
      },
    });
  }

  return NextResponse.json({ user });
};

export { handler as POST };
