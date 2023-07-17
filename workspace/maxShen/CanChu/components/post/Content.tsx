import Image from 'next/image';
import Link from 'next/link';

import getDisplayTime from '@/utils';
import { PostType } from '@/types';

import CommentIcon from '../icons/CommentIcon';
import HeartIcon from '../icons/HeartIcon';

interface Props {
  post: PostType;
  url: string;
  detail: boolean;
}

function Content({ post, url, detail }: Props) {
  const heart = (
    <div>
      {post.is_liked ? (
        <Image src="/heart.png" width={28} height={28} alt="heart icon" />
      ) : (
        <HeartIcon />
      )}
    </div>
  );

  return (
    <div className="pt-7">
      <div className="flex w-full items-center gap-3">
        <Link href="/">
          <div className="relative ml-7 h-20 w-20 shrink-0 overflow-hidden rounded-full">
            <Image
              src={post.picture ? post.picture : '/avatar.png'}
              fill
              alt="user avatar"
              className="object-cover"
            />
          </div>
        </Link>
        <div>
          <div className="cursor-pointer text-lg font-bold">{post.name}</div>
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
      <pre
        className={`whitespace-pre-wrap leading-6 text-lg
          my-4 mx-7 min-h-[83px]`}
      >
        {post.context}
      </pre>
      <div
        className="mx-9 flex h-14 items-center gap-2
          border-b border-t border-[#B7B7B7]"
      >
        {detail ? (
          <>
            <button type="button" className="ml-2">
              {heart}
            </button>
            <button type="button">
              <CommentIcon />
            </button>
          </>
        ) : (
          <>
            <Link href={url} className="ml-2">
              {heart}
            </Link>
            <Link href={url}>
              <CommentIcon />
            </Link>
          </>
        )}
      </div>
      <div
        className="mx-9 flex h-12 items-center justify-between
          text-base font-normal text-[#5c5c5c]"
      >
        <Link href={url} className={`${detail && 'pointer-events-none'}`}>
          {post.like_count ?? 0} 人喜歡這則貼文
        </Link>
        <Link href={url} className={`mr-2 ${detail && 'pointer-events-none'}`}>
          {post.comment_count ?? 0} 則留言
        </Link>
      </div>
    </div>
  );
}

export default Content;
