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
    <div className="pt-[30px]">
      <div className="w-full flex gap-[13px] items-center">
        <div className="rounded-full w-[75px] h-[75px] ml-[26px] overflow-hidden relative">
          <Image
            src={url}
            fill={true}
            alt="user avatar"
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-[18px] font-bold cursor-pointer">{name}</div>
          <div className="text-[14px] font-normal text-[#909090]">{created_at}</div>
        </div>
      </div>
      <pre
        className={`whitespace-pre-wrap leading-[24px] text-[18px]
          my-[17px] mx-[28px] min-h-[83px]`}
      >
        {context}
      </pre>
      <div
        className="flex items-center h-[52px] mx-[34px] gap-[10px]
          border-t border-[#B7B7B7] border-b"
      >
        { is_liked ?
          <button className="ml-[9px]">
            <Image
              src="/heart.png"
              width={28}
              height={28}
              alt="heart icon"
            />
          </button> :
          <button className="ml-[9px] w-[24px] h-[24px]">
            <HeartIcon />
          </button>
        }
        <button>
          <CommentIcon />
        </button>
      </div>
      <div
        className="h-[48px] mx-[34px] flex items-center justify-between
          text-[16px] font-normal text-[#5c5c5c]"
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
