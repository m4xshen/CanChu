import Image from 'next/image';

interface Props {
  picture: string;
  text: string;
  request: boolean;
}

function User({ picture, text, request }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative flex h-11 w-11 items-center justify-center
          overflow-hidden rounded-full"
      >
        <Image
          src={picture}
          fill
          alt="friend avatar"
          className="object-cover"
        />
      </div>
      <div className="text-lg font-bold leading-6">{text}</div>
      {request && (
        <div className="ml-auto">
          <button
            type="button"
            className="h-10 w-16 rounded-md bg-[#5458F7] text-white"
          >
            確認
          </button>
          <button
            type="button"
            className="ml-2 h-10 w-16 rounded-md bg-[#BFBFBF] text-white"
          >
            取消
          </button>
        </div>
      )}
    </div>
  );
}

export default User;
