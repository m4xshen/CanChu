import Image from 'next/image';

const Post = () => {
  return (
    <div className="w-[700px] border-[#d3d3d3] rounded-[20px] bg-white">
      <div className="pt-[20px] px-[40px]">
        <div className="w-full flex gap-[10px] items-center">
          <div className="w-[75px] h-[75px] rounded-full cursor-pointer bg-[#d3d3d3]" />
          <div>
            <div className="text-[16px] font-bold cursor-pointer">你的朋友</div>
            <div className="text-[13px] font-normal text-[#909090]">一小時前</div>
          </div>
        </div>
        <article className="h-[59px] mt-[17px] mb-[41px]">
          動態動態動態動態動態動態，動態動態動態動態。
        </article>
        <div className="flex py-[10px] gap-[10px] border-t border-[#bfbfbf] border-b">
          <div className="w-[30px] h-[30px] rounded-full cursor-pointer bg-[#f85c53]" />
          <div className="w-[30px] h-[30px] rounded-full cursor-pointer bg-[#d3d3d3]" />
        </div>
        <div className="py-[10px] flex justify-between text-[16px] font-normal text-[#5c5c5c]">
          <div>
            7 人喜歡這則貼文
          </div>
          <div>
            1 則留言
          </div>
        </div>
      </div>
      <div className="border-t border-t-[#d9d9d9] flex gap-[15px] items-center h-[90px]">
        <Image
          src="/avatar.png"
          width={50}
          height={50}
          alt="user avatar"
          className="ml-[40px]"
        />
        <div
          className="w-[555px] h-[50px] leading-[50px] text-center rounded-[30px] border-none
          text-[20px] font-normal text-[#777777] bg-[#f0f0f0]"
        >
          留個言吧
        </div>
      </div>
    </div>
  );
};

export default Post;
