import Image from 'next/image';
import Link from 'next/link';
import { getCookie } from 'cookies-next';

import FriendsIcon from '../icons/FriendsIcon';
import User from './User';
import useProfile from '@/hooks/useProfile';
import usePicture from '@/hooks/usePicture';

const friends = [
  {
    id: 1,
    name: '大原所長',
    picture: 'https://i.imgur.com/rVRCiZC.png',
    friendship: {
      id: 32,
      status: 'friend',
    },
  },
  {
    id: 14,
    name: 'Joseph Joestar',
    picture: 'https://i.imgur.com/JSZhpVj.jpg',
    friendship: {
      id: 2,
      status: 'friend',
    },
  },
];

function Sidebar() {
  const userCookie = getCookie('user')?.toString();
  const user = JSON.parse(userCookie || '{}');
  const profile = useProfile(user.id);
  const picture = usePicture();

  return (
    <nav
      className="flex h-max w-96 flex-col gap-3 rounded-2xl border
        border-[#0000001A] bg-white p-5"
    >
      <User picture={picture} text={profile?.name ? profile.name : ''} />
      <div className="my-2 border-t border-t-[#D9D9D9]" />
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center">
          <FriendsIcon />
        </div>
        <div className="text-lg font-bold leading-6 text-[#767676]">
          我的好友
        </div>
      </div>
      {friends.map((friend) => (
        <User key={friend.id} picture={friend.picture} text={friend.name} />
      ))}
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
