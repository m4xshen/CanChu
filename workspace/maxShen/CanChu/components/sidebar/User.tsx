import Image from 'next/image';
import Link from 'next/link';
import { useSWRConfig } from 'swr';
import Skeleton from 'react-loading-skeleton';

import useAgreeFriendship from '@/hooks/useAgreeFriendship';
import useDeleteFriendship from '@/hooks/useDeleteFriendship';

interface Props {
  id?: number;
  picture: string;
  text: string | undefined;
  request: boolean;
  friendshipId?: number;
}

function User({ id, picture, text, request, friendshipId }: Props) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const agreeFriendship = useAgreeFriendship();
  const deleteFriendship = useDeleteFriendship();
  const { mutate } = useSWRConfig();

  return (
    <div className="flex items-center gap-3">
      <Link href={`/users/${id}`} className="flex items-center gap-3">
        <div
          className="relative flex h-11 w-11 items-center justify-center shrink-0
            overflow-hidden rounded-full"
        >
          <Image
            src={picture === '' ? '/avatar.png' : picture}
            fill
            sizes="2.75rem"
            alt="friend avatar"
            className="object-cover"
          />
        </div>
        {text ? (
          <div className="text-lg font-bold leading-6">{text}</div>
        ) : (
          <Skeleton duration={0.8} containerClassName="w-20" />
        )}
      </Link>
      {request && (
        <div className="ml-auto shrink-0">
          <button
            type="button"
            className="h-10 w-16 rounded-md bg-[#5458F7] text-white"
            onClick={async () => {
              if (!friendshipId) {
                return;
              }
              await agreeFriendship(friendshipId);
              mutate(`${apiDomain}/friends`);
              mutate(`${apiDomain}/friends/pending`);
            }}
          >
            確認
          </button>
          <button
            type="button"
            className="ml-2 h-10 w-16 rounded-md bg-[#BFBFBF] text-white"
            onClick={async () => {
              if (!friendshipId) {
                return;
              }
              await deleteFriendship(friendshipId);
              mutate(`${apiDomain}/friends`);
              mutate(`${apiDomain}/friends/pending`);
            }}
          >
            取消
          </button>
        </div>
      )}
    </div>
  );
}

User.defaultProps = {
  id: 0,
  friendshipId: 0,
};

export default User;
