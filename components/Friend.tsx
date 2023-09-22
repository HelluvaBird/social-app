'use client';

import { UserMinusIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import UserImage from './UserImage';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Props {
  name: string;
  userId: string;
  isFriend: boolean;
  picturePath: string;
}

export default function Friend({ name, userId, isFriend, picturePath }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/profile/${userId}`);
  };

  const addFriend = async () => {
    const res = await fetch(`/api/users/${session?.user.id}/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div
        className="flex items-center justify-between gap-4 cursor-pointer group"
        onClick={handleClick}
      >
        <UserImage
          image={picturePath || '/images/placeholder.png'}
          size="40px"
        />
        <div>
          <h5 className="text-[#C2C2C2] font-medium group-hover:text-[#99EEFD]">
            {name}
          </h5>
        </div>
      </div>
      {session?.user.id !== userId ? (
        <button className="cursor-pointer" onClick={addFriend}>
          {isFriend ? (
            <UserMinusIcon className="w-6 h-6 fill-[#00353F] text-[#99EEFD]" />
          ) : (
            <UserPlusIcon className="w-6 h-6 fill-[#00353F] text-[#99EEFD]" />
          )}
        </button>
      ) : null}
    </div>
  );
}
