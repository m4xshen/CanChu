import Image from 'next/image';
import SendIcon from '../icons/SendIcon';
import Comment from './Comment';

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
  comments: CommentObj[];
}

const CommentSection: React.FC<Props> = ({ comments }) => {
  return (
    <div className="border-t border-t-[#b7b7b7]">
      { comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
        />
      )) }
      <div className="flex gap-[18px] items-center mt-[38px] mb-[35px]">
        <Image
          src="/avatar.png"
          width={50}
          height={50}
          alt="user avatar"
          className="ml-[26px]"
        />
        <div
          className="w-[639px] h-[50px] pl-[24px] pr-[13px] rounded-[10px]
            flex justify-between items-center text-[20px] leading-[50px]
            font-normal text-[#777777] bg-[#f0f2f5] border border-[#d9d9d9]"
        >
          <input
            type="text"
            placeholder="留個言吧"
            className="w-full h-[24px] pr-2 bg-[#f0f2f5] text-[#777777] text-[20px] outline-0"
          />
          <button>
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
