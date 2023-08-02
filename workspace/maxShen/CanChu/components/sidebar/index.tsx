import Image from 'next/image';
import Link from 'next/link';

import Skeleton from 'react-loading-skeleton';
import FriendsIcon from '../icons/FriendsIcon';
import User from './User';
import useProfile from '@/hooks/useProfile';
import useGetPicture from '@/hooks/useGetPicture';
import useFriends from '@/hooks/useFriends';
import usePending from '@/hooks/usePending';

interface Props {
  userId: number;
}

function Sidebar({ userId }: Props) {
  const profile = useProfile(userId);

  const picture = useGetPicture(profile);
  const { isLoading: friendsLoading, data: friends } = useFriends();
  const { isLoading: pendingLoading, data: pendings } = usePending();

  if (friendsLoading || pendingLoading) {
    return (
      <Skeleton
        duration={0.8}
        height={700}
        borderRadius={16}
        containerClassName="w-96"
      />
    );
  }

  return (
    <nav
      className="flex h-max w-96 flex-col gap-3 rounded-2xl border
        border-[#0000001A] bg-white p-5"
    >
      <User
        id={userId}
        picture={picture}
        text={profile?.name}
        request={false}
      />
      <div className="my-2 border-t border-t-[#D9D9D9]" />
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center">
          <FriendsIcon />
        </div>
        <div className="text-lg font-bold leading-6 text-[#767676]">
          我的好友
        </div>
      </div>
      {pendings.map((pending) => (
        <User
          key={pending.id}
          id={pending.id}
          picture={pending.picture}
          text={pending.name}
          request
          friendshipId={pending.friendship?.id}
        />
      ))}
      {friends.map((friend) => (
        <User
          key={friend.id}
          id={friend.id}
          picture={friend.picture}
          text={friend.name}
          request={false}
        />
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
