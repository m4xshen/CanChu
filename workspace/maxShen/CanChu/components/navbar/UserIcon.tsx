import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { useState } from 'react';

import useGetPicture from '@/hooks/useGetPicture';
import useProfile from '@/hooks/useProfile';
import DropDown from './DropDown';

export default function UserIcon() {
  const [displayDropDown, setDisplayDropDown] = useState(false);

  const userId = parseInt(getCookie('user_id') as string, 10);
  const profile = useProfile(userId);
  const picture = useGetPicture(profile);
  const router = useRouter();

  return (
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
  );
}
