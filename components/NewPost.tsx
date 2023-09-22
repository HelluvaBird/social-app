'use client';

import {
  EllipsisHorizontalIcon,
  GifIcon,
  MicrophoneIcon,
  PaperClipIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import UserImage from './UserImage';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  userId: string;
  picturePath: string;
}

export default function NewPost({ userId, picturePath }: Props) {
  const [post, setPost] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(e.target.value);
  };
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!post) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          description: post,
        }),
      });

      if (res.ok) {
        setPost('');
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-7 pb-3 bg-[#1a1a1a] rounded-xl mb-8">
      <div className="flex items-center justify-between gap-6">
        <UserImage
          image={picturePath || '/images/placeholder.png'}
          size="40px"
        />
        <input
          type="text"
          placeholder={`What's on your mind...`}
          className="w-full bg-[#333333] py-4 px-8 rounded-lg text-lg"
          value={post}
          onChange={handleChange}
        />
      </div>
      <hr className="h-0 border-[0.5px] border-gray-500 my-5" />
      <div className="flex items-center lg:justify-between gap-4">
        <div className="flex items-center justify-between gap-1 group cursor-pointer">
          <PhotoIcon className="w-6 h-6 text-[#858585] group-hover:text-[#A3A3A3] transition-colors" />
          <p className="text-[#858585] group-hover:text-[#A3A3A3] transition-colors">
            Image
          </p>
        </div>
        <div className="hidden lg:flex items-center justify-between gap-1 group cursor-pointer">
          <GifIcon className="w-6 h-6 text-[#858585] group-hover:text-[#A3A3A3] transition-colors" />
          <p className="text-[#858585] group-hover:text-[#A3A3A3] transition-colors">
            Clip
          </p>
        </div>
        <div className="hidden lg:flex items-center justify-between gap-1 group cursor-pointer">
          <PaperClipIcon className="w-6 h-6 text-[#858585] group-hover:text-[#A3A3A3] transition-colors" />
          <p className="text-[#858585] group-hover:text-[#A3A3A3] transition-colors">
            Attachment
          </p>
        </div>
        <div className="hidden lg:flex items-center justify-between gap-1 group cursor-pointer">
          <MicrophoneIcon className="w-6 h-6 text-[#858585] group-hover:text-[#A3A3A3] transition-colors" />
          <p className="text-[#858585] group-hover:text-[#A3A3A3] transition-colors">
            Audio
          </p>
        </div>
        <div className="flex items-center justify-between gap-1 cursor-pointer me-auto lg:me-0">
          <EllipsisHorizontalIcon className="w-6 h-6 text-[#858585] hover:text-[#A3A3A3] transition-colors" />
        </div>
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          type="button"
          className="uppercase bg-[#00D5FA] hover:bg-[#33DDFB] transition-colors rounded-md px-4 py-2"
        >
          post
        </button>
      </div>
    </div>
  );
}
