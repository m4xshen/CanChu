import Image from 'next/image';
import Link from 'next/link';
import FriendsIcon from '../icons/FriendsIcon';
import User from './User';

function Sidebar() {
  return (
    <nav
      className="flex flex-col gap-3 w-96 h-max p-5 bg-white
    rounded-2xl border border-[#0000001A]"
    >
      <User text="你的名字" />
      <User text="好友邀請" />
      <div className="border-t border-t-[#D9D9D9] my-2" />
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 flex justify-center items-center">
          <FriendsIcon />
        </div>
        <div className="font-bold text-[#767676] text-lg leading-6">
          我的好友
        </div>
      </div>
      <User text="好朋友" />
      <User text="好朋友" />
      <User text="好朋友" />
      <User text="好朋友" />
      <User text="好朋友" />
      <User text="好朋友" />
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 flex justify-center items-center">
          <Image width="39" height="39" src="/bar.png" alt="bar" />
        </div>
        <Link href="/" className="font-medium text-lg underline">
          查看全部
        </Link>
      </div>
    </nav>
  );
}

export default Sidebar;
