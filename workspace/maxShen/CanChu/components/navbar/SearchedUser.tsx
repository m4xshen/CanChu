import Image from 'next/image';
import Link from 'next/link';
import { UserSearchType } from '@/types';

interface Props {
  user: UserSearchType;
  isLast: boolean;
}

export default function SearchedUser({ user, isLast }: Props) {
  const { id } = user;

  return (
    <Link
      href={`/users/${id}`}
      className={`flex h-14 items-center ${
        isLast && 'border-b border-[#00000019]'
      }`}
    >
      <Image
        className="ml-8 rounded-full"
        src={user.picture ? user.picture : '/avatar.png'}
        alt="user profile"
        width={39}
        height={39}
      />
      <div className="ml-4 text-[#566470]">{user.name}</div>
    </Link>
  );
}
