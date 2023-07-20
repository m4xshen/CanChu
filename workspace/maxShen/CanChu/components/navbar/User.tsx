import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { UserSearchType } from '@/types';

interface Props {
  user: UserSearchType;
  isLast: boolean;
}

export default function User({ user, isLast }: Props) {
  const { id } = user;
  const [picture, setPicture] = useState(user.picture);

  return (
    <Link
      href={`/users/${id}`}
      key={id}
      className={`flex h-14 items-center ${
        isLast && 'border-b border-[#00000019]'
      }`}
    >
      <Image
        className="ml-8 rounded-full"
        src={picture}
        alt="user profile"
        width={39}
        height={39}
        onError={() => {
          setPicture('/avatar.png');
        }}
      />
      <div className="ml-4 text-[#566470]">{user.name}</div>
    </Link>
  );
}
