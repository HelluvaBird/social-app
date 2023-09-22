import Posts from '@/components/Posts';
import { client } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/nextauth';
import Friends from '@/components/Friends';
import UserBio from '@/components/UserBio';

const getUser = async (id: string) => {
  const user = await client.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

export default async function ProfilePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  const user = await getUser(id);
  const sessionUser = await getUser(session.user.id as string);

  return (
    <div>
      <div className="w-full p-4">
        <div className="lg:flex justify-center max-w-[1400px] mx-auto">
          <div className="basis-3/4">
            <UserBio userId={id} />
          </div>
        </div>
        <div className="lg:flex justify-center gap-4 max-w-[1400px] mx-auto">
          <div className="basis-3/4 flex gap-4">
            <div className="hidden lg:block basis-1/3">
              <Friends friends={user?.friends ?? []} />
            </div>
            <div className="mt-8 lg:mt-0 basis-full lg:basis-2/3">
              <Posts
                friends={sessionUser?.friends ?? []}
                userId={id}
                isProfile={true}
                sessionPicturePath={sessionUser?.picturePath ?? ''}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
