'use client';

import UserImage from './UserImage';
import {
  BriefcaseIcon,
  Cog6ToothIcon,
  CursorArrowRaysIcon,
  EyeIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
  viewedProfile: number;
  impressions: number;
  name: string;
  userId: string;
  friends: number;
  picturePath: string;
  location: string;
  occupation: string;
}

export default function User({
  viewedProfile,
  impressions,
  name,
  userId,
  friends,
  picturePath,
  location,
  occupation,
}: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/profile/${userId}`);
  };
  return (
    <div className="p-7 pb-3 bg-[#1a1a1a] rounded-xl">
      <div className="flex justify-between items-center gap-2 pb-4">
        <div
          className="flex lg:justify-between items-center gap-4 group cursor-pointer"
          onClick={handleClick}
        >
          <UserImage image={picturePath || '/images/placeholder.png'} />
          <div>
            <h4 className="font-medium text-[#E0E0E0] group-hover:text-[#99EEFD]">
              {name}
            </h4>
            <p className="text-[#858585] text-sm">{friends} friends</p>
          </div>
          <Cog6ToothIcon className="w-6 h-6 shrink-0" />
        </div>
      </div>
      <hr className="h-0 border-[0.5px] border-gray-500" />
      <div className="py-4">
        <div className="flex items-center gap-4 mb-2">
          <MapPinIcon className="w-6 h-6 text-[#C2C2C2]" />
          <p className="text-[#858585]">{location}</p>
        </div>
        <div className="flex items-center gap-4">
          <BriefcaseIcon className="w-6 h-6 text-[#C2C2C2]" />
          <p className="text-[#858585]">{occupation}</p>
        </div>
      </div>
      <hr className="h-0 border-[0.5px] border-gray-500" />
      <div className="py-4">
        <div className="flex lg:justify-between gap-4 items-center text-sm mb-2">
          <p className="text-[#C2C2C2] flex gap-1 items-center">
            <EyeIcon className="w-6 h-6" />
            <span>Views</span>
          </p>
          <p className="text-[#858585]">{viewedProfile}</p>
        </div>
        <div className="flex lg:justify-between gap-4 items-center text-sm">
          <p className="text-[#C2C2C2] flex gap-1 items-center">
            <CursorArrowRaysIcon className="w-6 h-6" />
            <span>Impressions</span>
          </p>
          <p className="text-[#858585]">{impressions}</p>
        </div>
      </div>
      <hr className="h-0 border-[0.5px] border-gray-500" />
      <div className="py-4">
        <p className="text-[#858585] font-medium mb-4">Social Profiles</p>
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center justify-between gap-4">
            <Image src="/images/twitter.png" alt="" width={25} height={25} />
            <div>
              <p className="font-medium text-[#C2C2C2]">Twitter</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center justify-between gap-4">
            <Image src="/images/linkedin.png" alt="" width={25} height={25} />
            <div>
              <p className="font-medium text-[#C2C2C2]">Linkedin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
