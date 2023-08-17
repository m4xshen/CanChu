import Image from 'next/image';
import Link from 'next/link';

import useProfile from '@/hooks/useProfile';
import { PostType } from '@/types';
import { getDisplayTime } from '@/utils';
import SmallVerifiedIcon from '../icons/SmallVerifiedIcon';

interface Props {
  post: PostType;
  url: string;
  detail: boolean;
}

export default function TitleBar({ post, url, detail }: Props) {
  const profile = useProfile(post.user_id);

  return (
    <div className="flex w-full items-center gap-3">
      <Link href={profile?.id ? `/users/${profile.id}` : '/'}>
        <div
          className="relative h-[6vw] max-h-[5rem] min-h-[3rem] w-[6vw] min-w-[3rem]
        max-w-[5rem] shrink-0 overflow-hidden rounded-full"
        >
          <Image
            src={post.picture ? post.picture : '/avatar.png'}
            fill
            sizes="5rem"
            alt="user avatar"
            className="object-cover"
          />
        </div>
      </Link>
      <div>
        <Link href={profile?.id ? `/users/${profile.id}` : '/'}>
          <div className="flex cursor-pointer items-center text-lg font-bold">
            {post.name}
            {post.name === 'Max Shen' && <SmallVerifiedIcon />}
          </div>
        </Link>
        <Link
          href={url}
          className={`text-sm font-normal text-[#909090] ${
            detail && 'pointer-events-none'
          }`}
        >
          {getDisplayTime(post.created_at)}
        </Link>
      </div>
    </div>
  );
}
