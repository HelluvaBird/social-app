import Advert from '@/components/Advert';
import Friends from '@/components/Friends';
import NewPost from '@/components/NewPost';
import Posts from '@/components/Posts';
import User from '@/components/User';
import { authOptions } from '@/lib/nextauth';
import { client } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

const getUser = async (id: string) => {
  const user = await client.user.findUnique({
    where: {
      id,
    },
  });

  const userWithoutPassword = { ...user };

  delete userWithoutPassword.password;

  return userWithoutPassword;
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const user = await getUser(session.user.id as string);

  return (
    <div>
      <div className="w-full p-4">
        <div className="lg:flex justify-between gap-4 max-w-[1400px] mx-auto">
          <div className="basis-1/4">
            <User
              viewedProfile={user.viewedProfile ?? 0}
              impressions={user.impressions ?? 0}
              name={user.name ?? ''}
              userId={user.id ?? ''}
              friends={user?.friends?.length ?? 0}
              picturePath={user.picturePath || ''}
              location={user.location ?? ''}
              occupation={user.occupation ?? ''}
            />
          </div>
          <div className="mt-8 lg:mt-0 basis-3/4 xl:basis-1/2">
            <NewPost
              userId={session.user.id ?? ''}
              picturePath={user.picturePath || ''}
            />
            <Posts
              friends={user.friends ?? []}
              userId={session.user.id ?? ''}
              sessionPicturePath={user.picturePath || ''}
            />
          </div>
          <div className="hidden xl:block basis-1/4">
            <Advert />
            <div className="mt-8">
              <Friends friends={user.friends ?? []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
