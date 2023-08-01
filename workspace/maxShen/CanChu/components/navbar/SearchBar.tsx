import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { UserSearchType } from '@/types';
import useUsers from '@/hooks/useUsers';
import useDebounce from '@/hooks/useDebounce';
import SearchedUserList from './SearchedUserList';

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
  const debounce = useDebounce();

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
      className="relative ml-5 flex h-12 w-1/2 max-w-xs items-center rounded-lg
        border border-[#d9d9d9] bg-[#f0f2f5] px-4 md:ml-6"
    >
      <Image src="/search.png" width={17} height={17} alt="search icon" />
      <input
        ref={inputRef}
        type="text"
        placeholder="搜尋"
        className="ml-2 w-full bg-[#f0f2f5] text-[#566470] outline-none"
        onChange={(e) => debounce(() => findUsers(e.target.value))}
        onFocus={() => setFocus(true)}
      />
      {focus && users.length > 0 && <SearchedUserList users={users} />}
    </div>
  );
}
