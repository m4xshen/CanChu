import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import useGetPicture from '@/hooks/useGetPicture';
import useProfile from '@/hooks/useProfile';
import DropDown from './DropDown';

interface Props {
  userId: number;
}

export default function UserIcon({ userId }: Props) {
  const [displayDropDown, setDisplayDropDown] = useState(false);

  const profile = useProfile(userId);
  const picture = useGetPicture(profile);
  const router = useRouter();

  return (
    <div
      className="relative ml-auto"
      onMouseLeave={() => setDisplayDropDown(false)}
    >
      <div
        onMouseEnter={() => setDisplayDropDown(true)}
      >
        <div className="relative h-9 w-9 overflow-hidden rounded-full">
          <Image
            src={picture}
            fill
            sizes="2.25rem"
            alt="user avatar"
            className="object-cover"
          />
        </div>
      </div>
      {displayDropDown && <DropDown profile={profile} router={router} />}
    </div>
  );
}
