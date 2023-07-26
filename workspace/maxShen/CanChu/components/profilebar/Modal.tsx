import AvatarEditor from 'react-avatar-editor';
import { useRef } from 'react';

import { NextRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import CloseIcon from '../icons/CloseIcon';
import useUpdatePicture from '@/hooks/useUpdatePicture';

interface Props {
  userId: number | null | undefined;
  file: File;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  router: NextRouter;
}

export default function Modal({ userId, file, setFile, router }: Props) {
  const updatePicture = useUpdatePicture();
  const editor = useRef<AvatarEditor>(null);
  const { mutate } = useSWRConfig();

  return (
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

              const res = await updatePicture(blob);

              if (res.status === 413) {
                alert('檔案大小太大');
                setFile(undefined);
                return;
              }

              const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
              mutate(`${apiDomain}/users/${userId}/profile`);
              if (router.query.id) {
                mutate(`${apiDomain}/posts/search?user_id=${router.query.id}`);
              } else {
                mutate(`${apiDomain}/posts/search`);
              }
              setFile(undefined);
            });
          }}
        >
          上傳
        </button>
      </div>
    </>
  );
}
