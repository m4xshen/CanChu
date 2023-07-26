import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useAgreeFriendship from '@/hooks/useAgreeFriendship';
import useDeleteFriendship from '@/hooks/useDeleteFriendship';

interface Props {
  id?: number;
  picture: string;
  text: string;
  request: boolean;
  friendshipId?: number;
}

function User({ id, picture, text, request, friendshipId }: Props) {
  const router = useRouter();
  const agreeFriendship = useAgreeFriendship();
  const deleteFriendship = useDeleteFriendship();

  return (
    <div className="flex items-center gap-3">
      <div
        className="relative flex h-11 w-11 items-center justify-center
          overflow-hidden rounded-full"
      >
        <Link href={`/users/${id}`}>
          <Image
            src={picture}
            fill
            alt="friend avatar"
            className="object-cover"
          />
        </Link>
      </div>
      <div className="text-lg font-bold leading-6">{text}</div>
      {request && (
        <div className="ml-auto">
          <button
            type="button"
            className="h-10 w-16 rounded-md bg-[#5458F7] text-white"
            onClick={async () => {
              if (!friendshipId) {
                return;
              }
              await agreeFriendship(friendshipId);
              router.reload();
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
              router.reload();
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
