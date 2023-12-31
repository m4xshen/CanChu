import Image from 'next/image';
import Link from 'next/link';
import { UserSearchType } from '@/types';
import SmallVerifiedIcon from '../icons/SmallVerifiedIcon';

interface Props {
  user: UserSearchType;
  isLast: boolean;
}

export default function SearchedUser({ user, isLast }: Props) {
  const { id } = user;

  return (
    <Link
      href={`/users/${id}`}
      className={`flex py-2 items-center ${
        isLast && 'border-b border-[#00000019]'
      }`}
    >
      <Image
        className="ml-3 shrink-0 rounded-full sm:ml-8"
        src={user.picture ? user.picture : '/avatar.png'}
        alt="user profile"
        width={39}
        height={39}
      />
      <div className="ml-4 flex items-center text-[#566470]">
        {user.name}
        {user.name === 'Max Shen' && <SmallVerifiedIcon />}
      </div>
    </Link>
  );
}
