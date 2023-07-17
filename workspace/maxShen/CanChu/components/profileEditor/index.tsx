import { useRef, useState } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { ProfileType } from '@/types';
import useProfile from '@/hooks/useProfile';

interface Props {
  user: ProfileType | undefined;
  apiDomain: string;
}

function ProfileEditor({ user, apiDomain }: Props) {
  const [edit, setEdit] = useState(false);
  const introductionRef = useRef<HTMLTextAreaElement>(null);
  const tagsRef = useRef<HTMLTextAreaElement>(null);
  const profile = useProfile(apiDomain);
  const router = useRouter();

  function handleSubmit() {
    if (introductionRef?.current) {
      (async () => {
        await fetch(`${apiDomain}/users/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('access_token')}`,
          },
          body: JSON.stringify({
            name: profile?.name,
            introduction: introductionRef?.current?.value,
            tags: tagsRef?.current?.value,
          }),
        });
        setEdit(false);
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
        onClick={() => {
          setEdit(true);
        }}
      >
        編輯個人檔案
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
            <div className="flex gap-1">
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
