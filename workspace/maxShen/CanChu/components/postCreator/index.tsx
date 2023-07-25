import Image from 'next/image';
import { getCookie } from 'cookies-next';
import { useRef } from 'react';

import { KeyedMutator } from 'swr';
import useGetPicture from '@/hooks/useGetPicture';
import useCreatePost from '@/hooks/useCreatePost';

interface Props {
  mutate: KeyedMutator<any>;
}

function PostCreator({ mutate }: Props) {
  const textRef = useRef<HTMLTextAreaElement>(null);

  const userCookie = getCookie('user')?.toString();
  const user = JSON.parse(userCookie || '{}');
  const picture = useGetPicture(user.id);
  const createPost = useCreatePost();

  return (
    <div
      className="flex w-[48rem] gap-6 rounded-2xl
        border border-[#0000001A] bg-white p-5"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
        <Image src={picture} fill alt="user avatar" className="object-cover" />
      </div>
      <div className="flex w-full flex-col gap-3">
        <textarea
          ref={textRef}
          placeholder="說點什麼嗎？"
          className="h-24 resize-none rounded-lg border border-[#D9D9D9]
            bg-[#F0F2F5] p-3 pr-2 text-xl text-[#767676] outline-0"
        />
        <button
          type="submit"
          className="flex h-10 w-36 items-center justify-center self-end
            rounded-md bg-[#5458F7] text-white"
          onClick={async () => {
            if (!textRef.current?.value) {
              return;
            }

            await createPost(textRef.current.value);

            if (textRef.current) {
              textRef.current.value = '';
            }
            mutate();
          }}
        >
          發佈貼文
        </button>
      </div>
    </div>
  );
}

export default PostCreator;
