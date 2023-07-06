import Image from 'next/image';
import SendIcon from './SendIcon';
import Comment from './Comment';

const CommentSection = () => (
  <div className="border-t border-t-[#b7b7b7] ">
    <Comment
      text="朋友的留言，朋友的留言。"
      time={1}
    />
    <Comment
      text="朋友的留言，朋友的留言。朋友的留言，朋友的留言。朋友的留言，朋友的留言。"
      time={21}
    />
    <Comment
      text="朋友的留言，朋友的留言。朋友的留言，朋友的留言。朋友的留言，朋友的留言。朋友的留言，朋友的留言。朋友的留言，朋友的留言。"
      time={23}
    />
    <Comment
      text="朋友的留言，朋友的留言。"
      time={24}
    />
    <div className="flex gap-[15px] items-center mt-[38px] mb-[35px]">
      <Image
        src="/avatar.png"
        width={50}
        height={50}
        alt="user avatar"
        className="ml-[26px]"
      />
      <div
        className="w-[639px] h-[50px] pl-[24px] pr-[13px] flex justify-between items-center leading-[50px] rounded-[10px]
        text-[20px] font-normal text-[#777777] bg-[#f0f2f5] border border-[#d9d9d9]"
      >
        <input
          type="text"
          placeholder="留個言吧"
          className="w-auto h-[24px] bg-[#f0f2f5] text-[#777777] outline-0"
        />
        <button>
          <SendIcon />
        </button>
      </div>
    </div>
  </div>
);

export default CommentSection;
