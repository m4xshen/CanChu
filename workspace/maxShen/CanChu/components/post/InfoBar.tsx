import Image from 'next/image';
import Link from 'next/link';

import CommentIcon from '../icons/CommentIcon';
import HeartIcon from '../icons/HeartIcon';
import useLike from '@/hooks/useLike';
import { PostType } from '@/types';
import useThrottle from '@/hooks/useThrottle';

interface Props {
  post: PostType;
  commentCount: number | null;
  url: string;
  detail: boolean;
}

export default function InfoBar({ post, commentCount, url, detail }: Props) {
  const [isLiked, likeCount, toggleLike] = useLike(post);
  const throttle = useThrottle();

  const heartIcon = (
    <div>
      {isLiked ? (
        <Image src="/heart.png" width={28} height={28} alt="heart icon" />
      ) : (
        <HeartIcon />
      )}
    </div>
  );

  return (
    <>
      <div
        className="flex h-14 items-center gap-2
          border-b border-t border-[#B7B7B7]"
      >
        <button
          type="button"
          className="ml-2"
          onClick={() => {
            throttle(toggleLike);
          }}
        >
          {heartIcon}
        </button>
        {detail ? (
          <button type="button">
            <CommentIcon />
          </button>
        ) : (
          <Link href={url}>
            <CommentIcon />
          </Link>
        )}
      </div>
      <div
        className="flex h-12 items-center justify-between
          text-base font-normal text-[#5c5c5c]"
      >
        <Link href={url} className={`${detail && 'pointer-events-none'}`}>
          {likeCount} 人喜歡這則貼文
        </Link>
        <Link href={url} className={`mr-2 ${detail && 'pointer-events-none'}`}>
          {commentCount ?? 0} 則留言
        </Link>
      </div>
    </>
  );
}
