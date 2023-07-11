import Image from 'next/image';
import Link from 'next/link';
import FriendsIcon from '../icons/FriendsIcon';
import User from './User';

function Sidebar() {
  return (
    <nav
      className="flex h-max w-96 flex-col gap-3 rounded-2xl border
        border-[#0000001A] bg-white p-5"
    >
      <User text="你的名字" />
      <div className="my-2 border-t border-t-[#D9D9D9]" />
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center">
          <FriendsIcon />
        </div>
        <div className="text-lg font-bold leading-6 text-[#767676]">
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
        <div className="flex h-11 w-11 items-center justify-center">
          <Image width="39" height="39" src="/bar.png" alt="bar" />
        </div>
        <Link href="/" className="text-lg font-medium underline">
          查看全部
        </Link>
      </div>
    </nav>
  );
}

export default Sidebar;
