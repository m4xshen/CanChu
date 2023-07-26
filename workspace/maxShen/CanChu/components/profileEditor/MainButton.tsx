import { useEffect, useState } from 'react';

import { useSWRConfig } from 'swr';
import { ProfileType, Relation } from '@/types';
import useFriendRequest from '@/hooks/useFriendRequest';
import useDeleteFriendship from '@/hooks/useDeleteFriendship';
import useAgreeFriendship from '@/hooks/useAgreeFriendship';

interface Props {
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  relation: Relation;
  user: ProfileType | undefined;
}

export default function MainButton({ edit, setEdit, relation, user }: Props) {
  const [text, setText] = useState('');
  const { mutate } = useSWRConfig();

  const [makeFriendRequest, removeFriendRequest] = useFriendRequest();
  const agreeFriendship = useAgreeFriendship();
  const deleteFriendship = useDeleteFriendship();

  useEffect(() => {
    if (relation === Relation.Self) {
      setText('編輯個人檔案');
    } else if (relation === Relation.Null) {
      setText('邀請成為好友');
    } else if (relation === Relation.Requested) {
      setText('刪除好友邀請');
    } else if (relation === Relation.Friend) {
      setText('刪除好友');
    } else if (relation === Relation.Pending) {
      setText('接受好友邀請');
    }
  }, [relation]);

  async function handleClick() {
    if (relation === Relation.Self) {
      setEdit(true);
      return;
    }

    if (!user?.id) {
      return;
    }

    const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
    if (relation === Relation.Null) {
      await makeFriendRequest(user.id);
      mutate(`${apiDomain}/users/${user.id}/profile`);
    }

    if (!user?.friendship?.id) {
      return;
    }

    if (relation === Relation.Requested) {
      await removeFriendRequest(user.friendship.id);
    } else if (relation === Relation.Friend) {
      await deleteFriendship(user.friendship.id);
    } else if (relation === Relation.Pending) {
      await agreeFriendship(user.friendship.id);
    }
    mutate(`${apiDomain}/users/${user.id}/profile`);
  }

  return (
    <button
      type="button"
      className={`h-10 w-full rounded-md text-white ${
        edit ? 'bg-[#D3D3D3]' : 'bg-[#5458F7]'
      }`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
