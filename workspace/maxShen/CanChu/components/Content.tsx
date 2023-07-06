import CommentIcon from './CommentIcon';
import Image from 'next/image';
import { Outfit } from 'next/font/google';

const outfit = Outfit({
  weight: '500',
  subsets: ['latin']
});

const Content = () => {
  return (
    <div className="pt-[30px] px-[28px]">
      <div className="w-full flex gap-[13px] items-center">
        <Image
          src="https://i.imgur.com/5NAGJfl.png"
          width={75}
          height={75}
          alt="user avatar"
          className="rounded-full"
        />
        <div>
          <div className="text-[18px] font-bold cursor-pointer">你的朋友</div>
          <div className="text-[14px] font-normal text-[#909090]">一小時前</div>
        </div>
      </div>
      <article className={`h-[59px] text-[18px] mt-[17px] min-h-[83px] ${outfit.className}`}>
        動態動態動態動態動態動態，動態動態動態動態。
      </article>
      <div className="flex items-center h-[52px] gap-[10px] border-t border-[#bfbfbf] border-b">
        <button>
          <Image
            src="/heart.png"
            width={28}
            height={28}
            alt="heart icon"
          />
        </button>
        <button>
          <CommentIcon />
        </button>
      </div>
      <div className="h-[48px] flex items-center justify-between text-[16px] font-normal text-[#5c5c5c]">
        <div>
          7 人喜歡這則貼文
        </div>
        <div className="mr-2">
          1 則留言
        </div>
      </div>
    </div>
  );
};

export default Content;
