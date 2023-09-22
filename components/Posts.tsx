import { client } from '@/lib/prisma';
import Post from './Post';

interface Props {
  userId: string;
  isProfile?: boolean;
  friends: string[];
  sessionPicturePath: string;
}

const getUserPosts = async (id: string) => {
  const posts = client.post.findMany({
    where: {
      userId: id,
    },
    include: {
      user: true,
      comments: {
        include: {
          user: {
            select: {
              name: true,
              picturePath: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return posts;
};

const getAllPosts = async () => {
  const posts = client.post.findMany({
    include: {
      user: true,
      comments: {
        include: {
          user: {
            select: {
              name: true,
              picturePath: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return posts;
};

export default async function Posts({
  userId,
  isProfile = false,
  friends,
  sessionPicturePath,
}: Props) {
  let posts = [];
  if (isProfile) {
    posts = await getUserPosts(userId);
  } else {
    posts = await getAllPosts();
  }

  return (
    <>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userId={post.userId}
          name={post.user.name}
          isFriend={friends.includes(post.user.id)}
          description={post.description ?? ''}
          likes={post.likedIDs.length}
          liked={post.likedIDs}
          comments={post.comments}
          picturePath={post.user.picturePath || ''}
          sessionPicturePath={sessionPicturePath || ''}
        />
      ))}
    </>
  );
}
