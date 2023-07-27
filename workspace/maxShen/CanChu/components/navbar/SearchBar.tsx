import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { UserSearchType } from '@/types';
import useUsers from '@/hooks/useUsers';
import SearchedUser from './SearchedUser';

interface Props {
  focus: boolean;
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchBar({ focus, setFocus }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [users, setUsers] = useState<UserSearchType[]>([]);
  const getUsers = useUsers();
  const findUsers = async (keyword: string) => {
    if (keyword === '') {
      setUsers([]);
      return;
    }
    const fetchedUsers = await getUsers(keyword);
    setUsers(fetchedUsers);
  };

  let timeout: NodeJS.Timeout;
  function debounce(keyword: string, delay: number) {
    clearTimeout(timeout);
    timeout = setTimeout(() => findUsers(keyword), delay);
  }

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

  return (
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
            <SearchedUser
              key={u.id}
              user={u}
              isLast={idx !== users.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
