import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { useState } from 'react';

import DropDown from './DropDown';
import useGetPicture from '@/hooks/useGetPicture';
import useProfile from '@/hooks/useProfile';

export default function UserIcon() {
  const [displayDropDown, setDisplayDropDown] = useState(false);

  const userCookie = getCookie('user')?.toString();
  const user = JSON.parse(userCookie || '{}');
  const profile = useProfile(user.id);
  const picture = useGetPicture(user.id);

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
