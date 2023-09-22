import { client } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/nextauth';
import UserImage from './UserImage';
import {
  BriefcaseIcon,
  CalendarDaysIcon,
  CursorArrowRaysIcon,
  EyeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  userId: string;
}

const getUserData = async (id: string) => {
  const res = await client.user.findUnique({
    where: {
      id,
    },
  });

  return res;
};

export default async function UserBio({ userId }: Props) {
  const user = await getUserData(userId);
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/');
  }
  const isOwnProfile = session.user.id === userId;
  return (
    <div className="pb-3 mb-4 bg-[#1a1a1a] text-[#C2C2C2] rounded-xl">
      <div className="flex justify-between items-center gap-2 pb-4">
        <div className="h-48 relative bg-neutral-700 grow rounded-t-xl">
          {user?.coverPath ? (
            <div className="relative h-48">
              <Image
                src={user?.coverPath}
                alt=""
                fill
                priority
                sizes="33vw"
                className="object-cover rounded-t-xl"
              />
            </div>
          ) : null}
          <div className="absolute bottom-0 translate-y-1/2 left-8 rounded-full border-[8px] border-[#1a1a1a]">
            <UserImage
              image={user?.picturePath || '/images/placeholder.png'}
              size="120px"
            />
          </div>
        </div>
      </div>
      <div className="sm:flex">
        <div className="grow">
          <div className="ps-10 pt-16 space-y-2">
            <p>{user?.name}</p>
            <p>{user?.friends.length} Friends</p>
            <p className="flex gap-2 items-center">
              <span>
                <MapPinIcon className="w-6 h-6 text-[#C2C2C2]" />
              </span>
              <span>{user?.location}</span>
            </p>
            <p className="flex gap-2 items-center">
              <span>
                <BriefcaseIcon className="w-6 h-6 text-[#C2C2C2]" />
              </span>
              <span>{user?.occupation}</span>
            </p>
            <div className="flex gap-4">
              <p className="flex gap-2 items-center">
                <span>
                  <EyeIcon className="w-6 h-6 text-[#c2c2c2]" />
                </span>
                <span>{user?.viewedProfile}</span>
              </p>
              <p className="flex gap-2 items-center">
                <span>
                  <CursorArrowRaysIcon className="w-6 h-6 text-[#c2c2c2]" />
                </span>
                <span>{user?.impressions}</span>
              </p>
            </div>
            <p className="flex gap-2 items-center">
              <span>
                <CalendarDaysIcon className="w-6 h-6 text-[#C2C2C2]" />
              </span>
              <span>
                Joined:{' '}
                {Intl.DateTimeFormat('en-US', {
                  month: 'short',
                  year: 'numeric',
                }).format(new Date(user?.createdAt!))}
              </span>
            </p>
          </div>
        </div>
        <div>
          <div className="grid ps-10 mt-2 sm:ps-0 sm:mt-0 sm:flex sm:justify-end pe-10">
            {isOwnProfile ? (
              <Link href={`/profile/${session.user.id}/edit`}>
                <button
                  type="button"
                  className="border border-[#00D5FA] px-4 py-2 rounded-full text-[#00D5FA] w-full sm:w-auto"
                >
                  Edit profile
                </button>
              </Link>
            ) : (
              <div className="py-2"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
