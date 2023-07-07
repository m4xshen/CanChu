import Image from "next/image";

const PostCreator = () => {
  return (
    <div className="flex gap-6 w-[48rem] p-5 border border-[#0000001A] rounded-2xl bg-white">
      <div className="rounded-full w-20 h-20 overflow-hidden relative shrink-0">
        <Image
          src="https://i.imgur.com/5NAGJfl.png"
          fill={true}
          alt="user avatar"
          className="object-cover"
        />
      </div>
      <div className="w-full flex flex-col gap-3">
        <textarea
          placeholder="說點什麼嗎？"
          className="h-24 pr-2 p-3 bg-[#F0F2F5] text-[#767676] border border-[#D9D9D9]
            text-xl rounded-lg outline-0 resize-none"
        />
        <button
          className="flex items-center self-end justify-center w-36 h-10 rounded-md
            bg-[#5458F7] text-white"
        >
          發佈貼文
        </button>
      </div>
    </div>
  );
};

export default PostCreator;
