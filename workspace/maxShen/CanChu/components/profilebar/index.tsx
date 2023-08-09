import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import useGetPicture from '@/hooks/useGetPicture';
import { ProfileType } from '@/types';
import Modal from './Modal';
import LargeVerifiedIcon from '../icons/LargeVerifiedIcon';

interface Props {
  profile: ProfileType | undefined;
  edit: boolean;
}

function Profilebar({ profile, edit }: Props) {
  const router = useRouter();
  const picture = useGetPicture(profile);
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();

  // toggle modal
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
        <Modal
          userId={profile?.id}
          file={file}
          setFile={setFile}
          router={router}
        />
      )}
      <div className="mb-6 flex h-[23rem] flex-col bg-white px-3 lg:px-20 xl:px-32">
        <div className="flex h-72 items-center gap-11 border-b border-[#C8C8C8]">
          <form
            onSubmit={(ev) => {
              ev.preventDefault();

              if (!edit) {
                return;
              }

              // trigger the file browser
              inputRef.current?.click();
              if (inputRef.current?.value) {
                inputRef.current.value = '';
              }
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                const { files } = target;

                if (files === null || files.length === 0) {
                  return;
                }

                setFile(files[0]);
              }}
            />
            <button type="submit" className={`group ${!edit && 'cursor-auto'}`}>
              <div className="relative ml-7 h-32 w-32 shrink-0 overflow-hidden rounded-full sm:h-44 sm:w-44">
                <Image
                  src={picture}
                  fill
                  sizes="11rem"
                  alt="user avatar"
                  className={`object-cover ${
                    edit && 'hover:brightness-50 group-hover:brightness-50'
                  }`}
                />
                <div
                  className={`absolute left-1/2 top-1/2 hidden
                    -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-lg text-white
                    underline ${edit && 'hover:block group-hover:block'}`}
                >
                  編輯大頭貼
                </div>
              </div>
            </button>
          </form>
          <div className="flex flex-col justify-around">
            <div>
              <div className="text-4xl font-bold">
                {profile?.name ? (
                  <div className="flex items-center">
                    {profile.name}
                    {profile.name === 'Max Shen' && <LargeVerifiedIcon />}
                  </div>
                ) : (
                  <Skeleton duration={0.8} />
                )}
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
            className="h-full w-28 border-b-4 border-[#5458F7]
              text-xl font-bold text-[#5458F7]"
          >
            貼文
          </button>
        </div>
      </div>
    </>
  );
}

export default Profilebar;
