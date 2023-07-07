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
    <div className="flex mt-[24px] ml-[26px] gap-[10px] mr-[34px]">
      <div className="rounded-full w-[32px] h-[32px] overflow-hidden relative">
        <Image
          src={comment.user.picture}
          fill={true}
          alt="user avatar"
          className="object-cover"
        />
      </div>
      <div>
        <div className="flex flex-col gap-[3px] pt-[8px] pb-[14px] pl-[16px] pr-[12px] mb-[6px]
          rounded-[20px] bg-opacity-[0.32] bg-[#d9d9d9] text-[#525252]">
          <div className="font-semibold">
            {comment.user.name}
          </div>
          <p>
            {comment.content}
          </p>
        </div>
        <div className="text-[14px] text-[#525252]">
          {comment.created_at}
        </div>
      </div>
    </div>
  );
};

export default Comment;
