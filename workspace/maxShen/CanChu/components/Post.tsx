import Navbar from './Navbar';
import Content from './Content';
import Image from 'next/image';
import SendIcon from './SendIcon';

const Post = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-[769px] border border-[#d3d3d3] rounded-[20px] bg-white">
          <Content />
          <div className="border-t border-t-[#b7b7b7] flex gap-[15px] items-center h-[90px]">
            <Image
              src="/avatar.png"
              width={50}
              height={50}
              alt="user avatar"
              className="ml-[40px]"
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
      </div>
    </>
  );
};

export default Post;
