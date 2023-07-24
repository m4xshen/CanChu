import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import useProfile from '@/hooks/useProfile';
import { ProfileType, Relation } from '@/types';
import useUpdateProfile from '@/hooks/useUpdateProfile';
import useFriendRequest from '@/hooks/useFriendRequest';
import useDeleteFriendship from '@/hooks/useDeleteFriendship';

interface Props {
  user: ProfileType | undefined;
  relation: Relation;
}

function ProfileEditor({ user, relation }: Props) {
  const [edit, setEdit] = useState(false);
  const introductionRef = useRef<HTMLTextAreaElement>(null);
  const tagsRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const profile = useProfile(user?.id);

  const updateProfile = useUpdateProfile();
  const [makeFriendRequest, removeFriendRequest] = useFriendRequest();
  const deleteFriendship = useDeleteFriendship();

  const [text, setText] = useState('');
  useEffect(() => {
    if (relation === Relation.Self) {
      setText('編輯個人檔案');
    } else if (relation === Relation.Null) {
      setText('邀請成為好友');
    } else if (relation === Relation.Requested) {
      setText('刪除好友邀請');
    } else if (relation === Relation.Friend) {
      setText('刪除好友');
    }
  }, [relation]);

  async function handleSubmit() {
    if (
      !profile?.name ||
      !introductionRef?.current ||
      !tagsRef.current?.value
    ) {
      return;
    }

    updateProfile(
      profile?.name,
      introductionRef?.current?.value,
      tagsRef?.current?.value,
    );

    setEdit(false);
    router.reload();
  }

  function handleClick() {
    if (relation === Relation.Self) {
      setEdit(true);
    } else if (relation === Relation.Null) {
      (async () => {
        if (!user) {
          return;
        }
        await makeFriendRequest(user.id);
        router.reload();
      })();
    } else if (relation === Relation.Requested) {
      (async () => {
        if (!user?.friendship?.id) {
          return;
        }
        await removeFriendRequest(user.friendship.id);
        router.reload();
      })();
    } else if (relation === Relation.Friend) {
      (async () => {
        if (!user?.friendship?.id) {
          return;
        }
        await deleteFriendship(user.friendship.id);
        router.reload();
      })();
    }
  }

  return (
    <div className="w-96 rounded-2xl border border-[#0000001A] bg-white px-4 py-6">
      <button
        type="button"
        className={`h-10 w-full rounded-md text-white ${
          edit ? 'bg-[#D3D3D3]' : 'bg-[#5458F7]'
        }`}
        onClick={handleClick}
      >
        {text}
      </button>
      <div className="my-4 flex flex-col gap-4 px-3">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold">自我介紹</div>
          {edit ? (
            <textarea
              ref={introductionRef}
              className="resize-none rounded-lg border border-[#BFBFBF] bg-[#F0F2F5] p-3"
              defaultValue={user?.introduction ? user.introduction : ''}
            />
          ) : (
            <p>{user?.introduction ? user.introduction : ''}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold">興趣</div>

          {edit ? (
            <textarea
              ref={tagsRef}
              className="resize-none rounded-lg border border-[#BFBFBF] bg-[#F0F2F5] p-3"
              defaultValue={user?.tags ? user.tags : ''}
            />
          ) : (
            <div className="flex flex-wrap gap-1">
              {user?.tags !== '' &&
                user?.tags?.split(',').map((tag) => (
                  <div
                    key={tag}
                    className="rounded-xl border border-black px-3"
                  >
                    {tag}
                  </div>
                ))}
            </div>
          )}
        </div>
        {edit && (
          <div className="mt-6 flex justify-center gap-4">
            <button
              type="submit"
              className="rounded-md bg-[#5458F7] px-7 py-2 font-bold text-white"
              onClick={handleSubmit}
            >
              確認
            </button>
            <button
              type="button"
              className="rounded-md bg-[#D3D3D3] px-7 py-2 font-bold text-white"
              onClick={() => {
                setEdit(false);
              }}
            >
              取消
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileEditor;
