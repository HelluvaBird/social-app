import { authOptions } from '@/lib/nextauth';
import { client } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const getProfile = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const profile = await client.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  if (!profile) {
    return NextResponse.json('Profile not found', { status: 404 });
  }

  const info = {
    location: profile.location || '',
    occupation: profile.occupation || '',
    picturePath: profile.picturePath || '',
    coverPath: profile.coverPath || '',
  };

  return NextResponse.json(info, { status: 200 });
};

const updateProfile = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const { location, occupation, picturePath, coverPath } = await req.json();

  try {
    const profile = await client.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        location,
        occupation,
        picturePath,
        coverPath,
      },
    });

    return NextResponse.json('Updated profile', { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json('Something went wrong updating profile', {
        status: 500,
      });
  }
};

export { getProfile as GET, updateProfile as PATCH };
