import Image from 'next/image';
import profile from '@/data/profile';

function Profilebar() {
  return (
    <div className="h-[23rem] px-32 bg-white mb-6 flex flex-col">
      <div className="flex items-center h-72 border-b border-[#C8C8C8] gap-11">
        <div className="rounded-full w-44 h-44 ml-7 overflow-hidden relative shrink-0">
          <Image
            src={profile.picture ? profile.picture : ''}
            fill
            sizes="5rem"
            alt="user avatar"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-around">
          <div>
            <div className="font-bold text-4xl">{profile.name}</div>
            <div className="font-medium text-xl text-[#484848]">
              {profile.friend_count}位朋友
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow">
        <button
          type="button"
          className="h-full w-28 text-xl font-bold text-[#5458F7] border-b-4 border-[#5458F7]"
        >
          貼文
        </button>
      </div>
    </div>
  );
}

export default Profilebar;
