import React from 'react';
import Image from 'next/image';
import getDisplayTime from '@/utils';
import { CommentType } from '@/types';

interface Props {
  comment: CommentType;
}

function Comment({ comment }: Props) {
  return (
    <div className="m-6 flex gap-2">
      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
        <Image
          src={comment.user.picture ?? ''}
          fill
          sizes="2rem"
          alt="user avatar"
          className="object-cover"
        />
      </div>
      <div>
        <div
          className="mb-1 flex flex-col gap-1 rounded-2xl
            bg-[#d9d9d9] bg-opacity-30 p-3 text-[#525252]"
        >
          <div className="font-semibold">{comment.user.name}</div>
          <p>{comment.content}</p>
        </div>
        <div className="text-sm text-[#525252]">
          {getDisplayTime(comment.created_at)}
        </div>
      </div>
    </div>
  );
}

export default Comment;
