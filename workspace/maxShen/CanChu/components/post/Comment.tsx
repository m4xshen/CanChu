import React from 'react'
import Image from 'next/image';
import { getDisplayTime } from '@/utils';
import { CommentType } from '@/types';

interface Props {
  comment: CommentType;
}

const Comment:React.FC<Props> = ({ comment }) => {
  return (
    <div className="flex m-6 gap-2">
      <div className="rounded-full w-8 h-8 overflow-hidden relative shrink-0">
        <Image
          src={comment.user.picture ?? ""}
          fill={true}
          sizes="2rem"
          alt="user avatar"
          className="object-cover"
        />
      </div>
      <div>
        <div className="flex flex-col gap-1 p-3 mb-1
          rounded-2xl bg-opacity-30 bg-[#d9d9d9] text-[#525252]">
          <div className="font-semibold">
            {comment.user.name}
          </div>
          <p>
            {comment.content}
          </p>
        </div>
        <div className="text-sm text-[#525252]">
          {getDisplayTime(comment.created_at)}
        </div>
      </div>
    </div>
  );
};

export default Comment;
