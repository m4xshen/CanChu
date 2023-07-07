import React from 'react'
import Image from 'next/image';

interface User {
  id: number;
  name: string;
  picture: string;
}

interface CommentObj {
  id: number;
  content: string;
  created_at: string;
  user: User;
}

interface Props {
  comment: CommentObj;
}

const Comment:React.FC<Props> = ({ comment }) => {
  return (
    <div className="flex m-6 gap-2">
      <div className="rounded-full w-8 h-8 overflow-hidden relative shrink-0">
        <Image
          src={comment.user.picture}
          fill={true}
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
          {comment.created_at}
        </div>
      </div>
    </div>
  );
};

export default Comment;
