import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Pattaya } from 'next/font/google';
import { getCookie } from 'cookies-next';
import { useEffect, useRef, useState } from 'react';

import useGetPicture from '@/hooks/useGetPicture';
import useProfile from '@/hooks/useProfile';
import useUsers from '@/hooks/useUsers';
import { UserSearchType } from '@/types';
import User from './User';
import DropDown from './DropDown';

const pattaya = Pattaya({
  weight: '400',
  subsets: ['cyrillic'],
});

function Navbar() {
  const [displayDropDown, setDisplayDropDown] = useState(false);
  const [users, setUsers] = useState<UserSearchType[]>([]);
  const router = useRouter();

  const userCookie = getCookie('user')?.toString();
  const user = JSON.parse(userCookie || '{}');
  const profile = useProfile(user.id);
  const picture = useGetPicture(user.id);
  const getUsers = useUsers();
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const findUsers = async (keyword: string) => {
    if (keyword === '') {
      setUsers([]);
      return;
    }
    const res = await getUsers(keyword);
    const data = await res.json();
    setUsers(data.data.users);
  };

  let timeout: NodeJS.Timeout;
  function debounce(keyword: string, delay: number) {
    clearTimeout(timeout);
    timeout = setTimeout(() => findUsers(keyword), delay);
  }

  return (
    <div className="flex h-24 items-center border-b border-[#d9d9d9] bg-white">
      <Link href="/">
        <h1 className={`text-[#7763FB] text-4xl ml-36 ${pattaya.className}`}>
          CanChu
        </h1>
      </Link>
      <div
        className="relative ml-6 flex h-12 w-80 items-center rounded-lg
          border border-[#d9d9d9] bg-[#f0f2f5] px-4"
      >
        <Image src="/search.png" width={17} height={17} alt="search icon" />
        <input
          ref={inputRef}
          type="text"
          placeholder="搜尋"
          className="ml-2 w-full bg-[#f0f2f5] text-[#566470] outline-0"
          onChange={(e) => debounce(e.target.value, 500)}
          onFocus={() => setFocus(true)}
        />
        {focus && users.length > 0 && (
          <div
            className="absolute left-0 top-12 z-10 max-h-[14rem] w-80
              overflow-y-scroll rounded-2xl border border-[#00000019] bg-white"
          >
            {users.map((u, idx) => (
              <User user={u} isLast={idx !== users.length - 1} />
            ))}
          </div>
        )}
      </div>
      <div
        className="relative ml-auto mr-36"
        onMouseLeave={() => setDisplayDropDown(false)}
      >
        <Link
          href={profile?.id ? `/users/${profile.id}` : '/'}
          onMouseEnter={() => setDisplayDropDown(true)}
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-full">
            <Image
              src={picture}
              fill
              alt="user avatar"
              className="object-cover"
            />
          </div>
        </Link>
        {displayDropDown && <DropDown profile={profile} router={router} />}
      </div>
    </div>
  );
}

export default Navbar;
