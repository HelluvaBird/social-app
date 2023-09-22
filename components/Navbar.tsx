'use client';

import {
  MagnifyingGlassIcon,
  Bars3Icon,
  ChatBubbleBottomCenterTextIcon,
  BellIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const { data } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(
    (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        userButtonRef.current &&
        !userButtonRef.current.contains(e.target as Node) &&
        isMenuOpen &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    },
    [isMenuOpen]
  );

  useEffect(() => {
    document.addEventListener('mousedown', (e) => closeMenu(e));

    return document.removeEventListener('mousedown', (e) => closeMenu(e));
  }, [closeMenu]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="p-4 bg-[#1a1a1a] flex justify-between items-center">
      <div className="flex justify-between items-center gap-7 max-w-[1400px] flex-1 mx-auto">
        <div className="flex flex-1 justify-between items-center lg:justify-start gap-7">
          <Link
            href="/"
            className="text-lg font-bold text-[#00D5FA] hover:text-[#99EEFD] transition-colors"
          >
            Social App
          </Link>
          <div className="hidden lg:block relative flex-1 max-w-[400px]">
            <input
              type="text"
              name="search"
              id="search"
              className="ps-2 py-1 pe-10 rounded-md bg-[#333] w-full"
            />
            <MagnifyingGlassIcon className="w-6 h-6 text-[#c2c2c2] absolute top-1 right-2" />
          </div>
          <button
            type="button"
            className="p-1 bg-[#1a1a1a] rounded-md lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Bars3Icon className="w-6 h-6 text-[#c2c2c2]" />
          </button>
          {isMobileMenuOpen ? (
            <MobileMenu
              closeMenu={() => setIsMobileMenuOpen(false)}
              userId={data?.user.id!}
            />
          ) : null}
        </div>
        <div className="hidden lg:flex items-center gap-4 relative">
          <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-white" />
          <BellIcon className="w-6 h-6 text-white" />
          <QuestionMarkCircleIcon className="w-6 h-6 text-white" />
          {data?.user ? (
            <>
              <button type="button" onClick={toggleMenu} ref={userButtonRef}>
                <UserCircleIcon className="w-6 h-6 text-white" />
              </button>
              {isMenuOpen ? (
                <div
                  ref={userMenuRef}
                  className="menu p-4 bg-[#333] text-[#c2c2c2] rounded-md grid grid-cols-1 gap-4 absolute top-8 right-4 w-[300px] z-10"
                >
                  <div>
                    <p className="text-center">{data?.user?.name}</p>
                    <hr className="h-0 border-[0.5px] border-gray-300" />
                  </div>
                  <button
                    type="button"
                    className="justify-self-center"
                    onClick={() => signOut()}
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
