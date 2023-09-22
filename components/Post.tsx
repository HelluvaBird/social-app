'use client';

import {
  ChatBubbleLeftIcon,
  HeartIcon,
  PaperAirplaneIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import Friend from './Friend';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import UserImage from './UserImage';
import { Prisma } from '@prisma/client';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

type Comments = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: {
        name: true;
        picturePath: true;
      };
    };
  };
}>;

interface Props {
  id: string;
  userId: string;
  description: string;
  name: string;
  likes: number;
  liked: string[];
  comments: Comments[];
  isFriend: boolean;
  picturePath: string;
  sessionPicturePath: string;
}

export default function Post({
  id,
  userId,
  description,
  name,
  likes = 0,
  liked,
  comments,
  isFriend,
  picturePath,
  sessionPicturePath,
}: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleLike = async () => {
    const res = await fetch(`/api/posts/${id}/like`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: session?.user.id }),
    });
    if (res.ok) {
      router.refresh();
    }
  };

  const toggleComments = () => {
    setIsCommentsOpen((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!comment || comment.length < 3) return;
    setIsLoading(true);

    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'appilcation/json',
      },
      body: JSON.stringify({
        postId: id,
        userId: session?.user.id,
        comment,
      }),
    });

    if (res.ok) {
      setComment('');
      setIsLoading(false);
      router.refresh();
    }
  };

  const isLiked = liked.includes(session?.user.id ?? '');
  return (
    <div className="p-6 pb-3 mb-8 rounded-xl bg-[#1A1A1A]">
      <Friend
        name={name}
        userId={userId}
        isFriend={isFriend}
        picturePath={picturePath}
      />
      <p className="text-[#C2C2C2] mt-4">{description}</p>
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center justify-between gap-1">
            <button onClick={handleLike}>
              <HeartIcon
                className={`w-6 h-6 hover:text-red-500 transition-colors ${
                  isLiked ? 'fill-red-500 text-red-500' : ''
                }`}
              />
            </button>
            <span>{likes}</span>
          </div>
          <div className="flex items-center justify-between gap-1">
            <button
              onClick={toggleComments}
              className={`group ${isCommentsOpen ? 'text-[#00D5FA]' : ''}`}
            >
              <ChatBubbleLeftIcon className="w-6 h-6 group-hover:text-[#00D5FA] transition-colors" />
            </button>
            <span>{comments.length}</span>
          </div>
        </div>
        <ShareIcon className="w-6 h-6" />
      </div>
      {isCommentsOpen ? (
        <div className="mt-2">
          <hr className="h-0 border-[0.5px] border-gray-500" />
          {comments.map((comment) => (
            <div key={comment.id}>
              <div className="flex items-center gap-6 mt-2">
                <UserImage
                  image={comment.user.picturePath || '/images/placeholder.png'}
                  size="30px"
                />
                <div className="bg-[#333333] flex-1 rounded-xl px-4">
                  <p className="text-[#C2C2C2] mt-1 text-xs flex justify-between">
                    <span>{comment.user.name}</span>
                    <span>{dayjs().to(dayjs(comment.createdAt))}</span>
                  </p>
                  <p className="text-[#C2C2C2] my-1">{comment.comment}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-6 mt-2">
            <UserImage
              image={sessionPicturePath || '/images/placeholder.png'}
              size="30px"
            />
            <input
              type="text"
              placeholder={`Write a comment...`}
              className="w-full bg-[#333333] py-2 px-4 rounded-lg text-lg"
              value={comment}
              onChange={handleChange}
            />
            <button
              disabled={isLoading}
              onClick={handleSubmit}
              type="button"
              className="uppercase bg-[#00D5FA] hover:bg-[#33DDFB] transition-colors rounded-md px-4 py-2"
            >
              <PaperAirplaneIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
