import Image from 'next/image';
import { getCookie } from 'cookies-next';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { ProfileType } from '@/types';
import usePicture from '@/hooks/usePicture';

interface Props {
  profile: ProfileType | undefined;
}

function Profilebar({ profile }: Props) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const picture = usePicture();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  return (
    <div className="mb-6 flex h-[23rem] flex-col bg-white px-32">
      <div className="flex h-72 items-center gap-11 border-b border-[#C8C8C8]">
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            inputRef?.current?.addEventListener('change', (e: Event) => {
              const target = e.target as HTMLInputElement;
              const { files } = target;

              (async () => {
                if (files === null || files.length === 0) {
                  return;
                }

                const formData = new FormData();
                formData.append('picture', files[0]);
                await fetch(`${apiDomain}/users/picture`, {
                  method: 'PUT',
                  headers: {
                    Authorization: `Bearer ${getCookie('access_token')}`,
                  },
                  body: formData,
                });
                router.reload();
              })();
            });

            // trigger the file browser
            inputRef.current?.click();
          }}
        >
          <input ref={inputRef} type="file" accept="image/png, image/jpeg, image/jpg" className="hidden" />
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
  );
}

export default Profilebar;
