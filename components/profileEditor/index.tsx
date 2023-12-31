import { useSWRConfig } from 'swr';
import { useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';

import { ProfileType, Relation } from '@/types';
import useUpdateProfile from '@/hooks/useUpdateProfile';
import MainButton from './MainButton';
import Introduction from './Introduction';
import Interests from './Interests';
import Footer from '../footer';

interface Props {
  profile: ProfileType | undefined;
  relation: Relation | undefined;
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

    await updateProfile(
      profile?.name,
      introductionRef?.current?.value,
      tagsRef?.current?.value,
    );

    const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
    mutate(`${apiDomain}/users/${profile.id}/profile`);
    setEdit(false);
  }

  if (
    relation === undefined ||
    profile?.introduction === undefined ||
    profile?.tags === undefined
  ) {
    return (
      <Skeleton height={350} borderRadius={16} containerClassName="w-full" />
    );
  }

  return (
    <>
      <div className="w-full rounded-2xl border border-[#0000001A] bg-white px-4 py-6">
        <MainButton
          edit={edit}
          setEdit={setEdit}
          relation={relation}
          user={profile}
        />
        <div className="my-4 flex flex-col gap-4 px-3">
          <Introduction
            edit={edit}
            introductionRef={introductionRef}
            profile={profile}
          />
          <Interests edit={edit} tagsRef={tagsRef} profile={profile} />
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
                onClick={async () => {
                  const result = await Swal.fire({
                    title: '確認',
                    text: '確定取消編輯嗎？',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: '確認',
                    cancelButtonText: '取消',
                    confirmButtonColor: '#5458F7',
                    cancelButtonColor: '#D3D3D3',
                  });
                  if (result.isConfirmed) {
                    setEdit(false);
                  }
                }}
              >
                取消
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="hidden w-64 xl:block">
        <Footer />
      </div>
    </>
  );
}

export default ProfileEditor;
