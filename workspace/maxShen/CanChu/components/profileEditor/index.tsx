import { useSWRConfig } from 'swr';
import { useRef, useState } from 'react';

import { ProfileType, Relation } from '@/types';
import useUpdateProfile from '@/hooks/useUpdateProfile';
import MainButton from './MainButton';

interface Props {
  profile: ProfileType | undefined;
  relation: Relation;
}

function ProfileEditor({ profile, relation }: Props) {
  const [edit, setEdit] = useState(false);
  const introductionRef = useRef<HTMLTextAreaElement>(null);
  const tagsRef = useRef<HTMLTextAreaElement>(null);
  const { mutate } = useSWRConfig();

  const updateProfile = useUpdateProfile();

  async function handleSubmit() {
    if (
      !profile?.id ||
      !profile?.name ||
      !introductionRef?.current ||
      !tagsRef.current
    ) {
      return;
    }

    updateProfile(
      profile?.name,
      introductionRef?.current?.value,
      tagsRef?.current?.value,
    );

    setEdit(false);
    mutate(`${process.env.NEXT_PUBLIC_API_DOMAIN}/users/${profile.id}/profile`);
  }

  return (
    <div className="w-96 rounded-2xl border border-[#0000001A] bg-white px-4 py-6">
      <MainButton
        edit={edit}
        setEdit={setEdit}
        relation={relation}
        user={profile}
      />
      <div className="my-4 flex flex-col gap-4 px-3">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold">自我介紹</div>
          {edit ? (
            <textarea
              ref={introductionRef}
              className="resize-none rounded-lg border border-[#BFBFBF] bg-[#F0F2F5] p-3"
              defaultValue={profile?.introduction ? profile.introduction : ''}
            />
          ) : (
            <p>{profile?.introduction ? profile.introduction : ''}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold">興趣</div>

          {edit ? (
            <textarea
              ref={tagsRef}
              className="resize-none rounded-lg border border-[#BFBFBF] bg-[#F0F2F5] p-3"
              defaultValue={profile?.tags ? profile.tags : ''}
            />
          ) : (
            <div className="flex flex-wrap gap-1">
              {profile?.tags !== '' &&
                profile?.tags?.split(',').map((tag) => (
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
