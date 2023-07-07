import { getDisplayTime } from '@/utils';
import CommentIcon from '../icons/CommentIcon';
import HeartIcon from '../icons/HeartIcon';
import Image from 'next/image';

interface Props {
  name: string;
  url: string;
  created_at: string;
  context: string;
  is_liked: boolean;
  like_count: number;
  comment_count: number;
}

const Content: React.FC<Props> = ({ name, url, created_at, context, is_liked, like_count, comment_count }) => {
  return (
    <div className="pt-7">
      <div className="w-full flex gap-3 items-center">
        <div className="rounded-full w-20 h-20 ml-7 overflow-hidden relative shrink-0">
          <Image
            src={url}
            fill={true}
            alt="user avatar"
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-lg font-bold cursor-pointer">{name}</div>
          <div
            className="text-sm font-normal text-[#909090]"
          >
            {getDisplayTime(created_at)}
          </div>
        </div>
      </div>
      <pre
        className={`whitespace-pre-wrap leading-6 text-lg
          my-4 mx-7 min-h-[83px]`}
      >
        {context}
      </pre>
      <div
        className="flex items-center h-14 mx-9 gap-2
          border-t border-[#B7B7B7] border-b"
      >
        <button className="ml-2">
          {is_liked ?
            <Image
              src="/heart.png"
              width={28}
              height={28}
              alt="heart icon"
            /> :
            <HeartIcon />
          }
        </button>
        <button>
          <CommentIcon />
        </button>
      </div>
      <div
        className="h-12 mx-9 flex items-center justify-between
          text-base font-normal text-[#5c5c5c]"
      >
        <div>
          {like_count} 人喜歡這則貼文
        </div>
        <div className="mr-2">
          {comment_count} 則留言
        </div>
      </div>
    </div>
  );
};

export default Content;
