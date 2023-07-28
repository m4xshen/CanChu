import Link from 'next/link';
import Image from 'next/image';
import { NextRouter } from 'next/router';
import { ProfileType } from '@/types';
import useLogOut from '@/hooks/useLogOut';

interface Props {
  profile: ProfileType | undefined;
  router: NextRouter;
}

export default function DropDown({ profile, router }: Props) {
  const logOut = useLogOut(router);

  return (
    <div className="absolute right-0 top-9 z-10">
      <div className="h-10 bg-transparent" />
      <nav
        className="flex w-64 flex-col overflow-hidden rounded-2xl
          border border-[#0000001A] bg-[#f6f6f6] drop-shadow-lg"
      >
        <div className="flex h-16 items-center bg-[#5458F7] text-white">
          <div
            className="ml-4 flex h-9 w-9
              items-center justify-center rounded-full bg-white"
          >
            <Image
              src="/purpleAvatar.png"
              width={29}
              height={29}
              alt="purple avatar"
              className="h-auto w-auto"
            />
          </div>
          <div className="ml-4 text-xl font-bold">
            {profile?.name ? profile.name : ''}
          </div>
        </div>
        <Link
          href={profile?.id ? `/users/${profile.id}` : '/'}
          className="flex h-16 items-center pl-6 text-xl"
        >
          查看個人檔案
        </Link>
        <div className="w-60 self-center border-t border-[#D1CACE]" />
        <button
          type="button"
          className="flex h-16 items-center pl-6 text-xl"
          onClick={logOut}
        >
          登出
        </button>
      </nav>
    </div>
  );
}
