import React from 'react'

interface Props {
  text: string,
  time: number
}

const Comment:React.FC<Props> = ({ text, time }) => {
  return (
    <div className="flex mt-[24px] ml-[26px] gap-[10px] mr-[34px]">
      <div className="w-[32px] h-[32px] rounded-full bg-[#d9d9d9] shrink-0" />
      <div>
        <div className="flex flex-col gap-[3px] pt-[8px] pb-[14px] pl-[16px] pr-[12px] mb-[6px]
          rounded-[20px] bg-opacity-[0.32] bg-[#d9d9d9] text-[#525252]">
          <div className="font-semibold">
            朋友
          </div>
          <p>
            {text}
          </p>
        </div>
        <div className="text-[14px] text-[#525252]">
          {time} 小時前
        </div>
      </div>
    </div>
  );
};

export default Comment;
