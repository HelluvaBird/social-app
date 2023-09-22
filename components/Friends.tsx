import { client } from '@/lib/prisma';
import Friend from './Friend';

interface Props {
  friends: string[];
}

const getFriends = async (friends: string[]) => {
  const friendsList = await client.user.findMany({
    where: {
      id: {
        in: friends,
      },
    },
  });

  return friendsList;
};

export default async function Friends({ friends }: Props) {
  const myFriends = await getFriends(friends);

  return (
    <div className="p-7 pb-3 bg-[#1a1a1a] rounded-xl">
      <h5 className="font-medium text-[#E0E0E0]">Friend List</h5>
      <div className="flex flex-col gap-6 mt-6">
        {myFriends.map((friend) => (
          <Friend
            key={friend.id}
            userId={friend.id}
            name={friend.name}
            isFriend={true}
            picturePath={friend.picturePath || ''}
          />
        ))}
      </div>
    </div>
  );
}
