import { getCookie } from 'cookies-next';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import AvatarEditor from 'react-avatar-editor';
import Image from 'next/image';
import { ProfileType } from '@/types';
import usePicture from '@/hooks/usePicture';
import CloseIcon from '../icons/CloseIcon';

interface Props {
  profile: ProfileType | undefined;
}

function Profilebar({ profile }: Props) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const picture = usePicture(profile?.id);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const editor = useRef<AvatarEditor>(null);

  useEffect(() => {
    if (file) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [file]);

  return (
    <>
      {file && (
        <>
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-black opacity-30" />
          <div
            className="absolute left-1/2 top-1/2 z-10 flex w-[30rem]
              -translate-x-1/2 -translate-y-1/2 transform flex-col items-center
              rounded-2xl border border-[#00000019] bg-white shadow-xl"
          >
            <button
              type="button"
              className="absolute right-6 top-6"
              onClick={() => {
                setFile(undefined);
              }}
            >
              <CloseIcon />
            </button>
            <div className="my-6 flex items-center justify-center text-2xl font-extralight ">
              編輯頭像
            </div>
            <AvatarEditor
              ref={editor}
              image={file}
              width={330}
              height={330}
              border={[75, 0]}
              borderRadius={9999}
              color={[0, 0, 0, 0.5]}
            />
            <button
              type="button"
              className="my-4 h-10 w-36 rounded-md bg-[#5458F7] text-white"
              onClick={() => {
                if (!editor?.current) {
                  return;
                }

                const canvas = editor.current.getImage();
                canvas.toBlob(async (blob: Blob | null) => {
                  if (!blob) {
                    return;
                  }

                  const formData = new FormData();
                  formData.append('picture', blob);

                  const res = await fetch(`${apiDomain}/users/picture`, {
                    method: 'PUT',
                    headers: {
                      Authorization: `Bearer ${getCookie('access_token')}`,
                    },
                    body: formData,
                  });

                  if (res.status === 413) {
                    alert('檔案大小太大');
                    setFile(undefined);
                    return;
                  }

                  router.reload();
                });
              }}
            >
              上傳
            </button>
          </div>
        </>
      )}
      <div className="mb-6 flex h-[23rem] flex-col bg-white px-32">
        <div className="flex h-72 items-center gap-11 border-b border-[#C8C8C8]">
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              inputRef?.current?.addEventListener('change', (e: Event) => {
                const target = e.target as HTMLInputElement;
                const { files } = target;

                if (files === null || files.length === 0) {
                  return;
                }

                setFile(files[0]);
              });

              // trigger the file browser
              inputRef.current?.click();
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
            />
            <button type="submit" className="group">
              <div className="relative ml-7 h-44 w-44 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={picture}
                  fill
                  alt="user avatar"
                  className="object-cover hover:brightness-50 group-hover:brightness-50"
                />
                <div
                  className="absolute left-1/2 top-1/2 hidden
                  -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-lg text-white
                  underline hover:block group-hover:block"
                >
                  編輯大頭貼
                </div>
              </div>
            </button>
          </form>
          <div className="flex flex-col justify-around">
            <div>
              <div className="text-4xl font-bold">
                {profile?.name ? profile.name : ''}
              </div>
              <div className="text-xl font-medium text-[#484848]">
                {profile?.friend_count ? profile.friend_count : 0}位朋友
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <button
            type="button"
            className="h-full w-28 border-b-4 border-[#5458F7] text-xl font-bold text-[#5458F7]"
          >
            貼文
          </button>
        </div>
      </div>
    </>
  );
}

export default Profilebar;
