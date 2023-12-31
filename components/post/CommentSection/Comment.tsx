import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getDisplayTime } from '@/utils';
import { CommentType } from '@/types';
import SmallVerifiedIcon from '@/components/icons/SmallVerifiedIcon';

interface Props {
  comment: CommentType;
}

function Comment({ comment }: Props) {
  return (
    <div className="m-6 flex gap-2">
      <Link
        href={`/users/${comment.user.id}`}
        className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full"
      >
        <Image
          src={comment.user.picture ?? ''}
          fill
          sizes="2rem"
          alt="user avatar"
          className="object-cover"
        />
      </Link>
      <div className="max-w-[91%]">
        <div
          className="mb-1 flex max-w-full flex-col gap-1 rounded-2xl
            bg-[#d9d9d9] bg-opacity-30 p-3 text-[#525252]"
        >
          <Link
            href={`/users/${comment.user.id}`}
            className="flex items-center font-semibold"
          >
            {comment.user.name}
            {comment.user.name === 'Max Shen' && <SmallVerifiedIcon />}
          </Link>
          <p className="max-w-full break-words">{comment.content}</p>
        </div>
        <div className="text-sm text-[#525252]">
          {getDisplayTime(comment.created_at)}
        </div>
      </div>
    </div>
  );
}

export default Comment;
