import { XMarkIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface Props {
  closeMenu: () => void;
  userId: string;
}

export default function MobileMenu({ closeMenu, userId }: Props) {
  const handleSignOut = () => {
    signOut();
    closeMenu();
  };
  return (
    <div className="absolute inset-0 bg-[#1a1a1a] z-10">
      <div className="h-full flex flex-col">
        <div className="flex justify-end pt-4 pe-4">
          <button type="button" onClick={closeMenu}>
            <XMarkIcon className="w-8 h-8 text-red-500" />
          </button>
        </div>
        <div className="flex flex-col grow justify-center items-center gap-8">
          <Link href="/" onClick={closeMenu}>
            <p className="text-4xl">Home</p>
          </Link>
          <Link href={`/profile/${userId}`} onClick={closeMenu}>
            <p className="text-4xl">Profile</p>
          </Link>
          <button type="button" onClick={handleSignOut}>
            <p className="text-4xl">Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
}
