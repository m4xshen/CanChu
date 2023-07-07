import CommentIcon from './CommentIcon';
import Image from 'next/image';
import HeartIcon from './HeartIcon';

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
        <Image
          src={url}
          width={75}
          height={75}
          alt="user avatar"
          className="rounded-full ml-[26px]"
        />
        <div>
          <div className="text-[18px] font-bold cursor-pointer">{name}</div>
          <div className="text-[14px] font-normal text-[#909090]">{created_at}</div>
        </div>
      </div>
      <pre className={`h-[59px] text-[18px] my-[17px] mx-[28px] min-h-[83px]`}>{context}</pre>
      <div className="flex items-center h-[52px] mx-[34px] gap-[10px] border-t border-[#B7B7B7] border-b">
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
      <div className="h-[48px] mx-[34px] flex items-center justify-between text-[16px] font-normal text-[#5c5c5c]">
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