import Link from 'next/link';
import { Pattaya } from 'next/font/google';
import { useState } from 'react';

import SearchBar from './SearchBar';
import UserIcon from './UserIcon';

const pattaya = Pattaya({
  weight: '400',
  subsets: ['cyrillic'],
});

interface Props {
  userId: number;
}

function Navbar({ userId }: Props) {
  const [focus, setFocus] = useState(false);

  return (
    <div className="flex h-24 items-center border-b border-[#d9d9d9] bg-white">
      <Link href="/">
        <h1 className={`text-[#7763FB] text-4xl ml-36 ${pattaya.className}`}>
          CanChu
        </h1>
      </Link>
      <SearchBar focus={focus} setFocus={setFocus} />
      <UserIcon userId={userId} />
    </div>
  );
}

export default Navbar;
