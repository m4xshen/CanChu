import { UserSearchType } from '@/types';
import SearchedUser from './SearchedUser';

interface Props {
  users: UserSearchType[];
}

export default function SearchedUserList({ users }: Props) {
  return (
    <div
      className="absolute left-0 top-12 z-10 max-h-[14rem] w-full
        overflow-y-scroll rounded-2xl border border-[#00000019] bg-white"
    >
      {users.map((u, idx) => (
        <SearchedUser key={u.id} user={u} isLast={idx !== users.length - 1} />
      ))}
    </div>
  );
}
