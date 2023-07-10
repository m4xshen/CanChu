import Image from 'next/image';
import Link from 'next/link';
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
  detail: boolean;
  url: string;
}

const CommentSection: React.FC<Props> = ({ comments, detail, url }) => {
  return (
    <Link
      href={url}
      className="border-t border-t-[#b7b7b7]"
    >
      { detail && comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
        />
      )) }
      <div className="flex gap-4 items-center mt-3 mb-5">
        <Image
          src="/avatar.png"
          width={50}
          height={50}
          alt="user avatar"
          className="ml-10"
        />
        <div
          className="w-full h-12 mr-12 pl-6 pr-3 rounded-lg
            flex justify-between items-center text-xl leading-10
            font-normal text-[#777777] bg-[#f0f2f5] border border-[#d9d9d9]"
        >
          <input
            type="text"
            placeholder="留個言吧"
            className="w-full h-6 pr-2 bg-[#f0f2f5] text-[#777777] text-xl outline-0"
          />
          { detail && 
            <button>
              <SendIcon />
            </button>
          }
        </div>
      </div>
    </Link>
  );
};

export default CommentSection;
