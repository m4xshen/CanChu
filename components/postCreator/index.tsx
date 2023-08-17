import Skeleton from 'react-loading-skeleton';
import Image from 'next/image';
import { KeyedMutator } from 'swr';
import { useRef } from 'react';

import useGetPicture from '@/hooks/useGetPicture';
import useCreatePost from '@/hooks/useCreatePost';
import useProfile from '@/hooks/useProfile';
import { Relation } from '@/types';
import useUpdateHeight from '@/hooks/useUpdateHeight';

interface Props {
  mutate: KeyedMutator<any[]>;
  userId: number;
  relation: Relation | undefined;
}

function PostCreator({ mutate, userId, relation }: Props) {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const updateHeight = useUpdateHeight(textRef, true);

  const profile = useProfile(userId);
  const picture = useGetPicture(profile);
  const createPost = useCreatePost();

  if (relation === undefined || !profile) {
    return (
      <Skeleton height={188} borderRadius={16} containerClassName="w-full" />
    );
  }

  if (relation !== Relation.Self) {
    return null;
  }

  return (
    <div
      className="flex w-full gap-6 rounded-2xl
        border border-[#0000001A] bg-white p-5"
    >
      <div
        className="relative h-[6vw] max-h-[5rem] min-h-[3rem] w-[6vw]
          min-w-[3rem] max-w-[5rem] shrink-0 overflow-hidden rounded-full"
      >
        <Image src={picture} fill alt="user avatar" className="object-cover" />
      </div>
      <div className="flex w-full flex-col gap-3">
        <textarea
          ref={textRef}
          placeholder="說點什麼嗎？"
          className="h-24 resize-none overflow-hidden rounded-lg border border-[#D9D9D9]
            bg-[#F0F2F5] p-3 pr-2 text-[#767676] outline-none sm:text-xl"
          onInput={updateHeight}
        />
        <button
          type="submit"
          className="flex h-10 w-36 items-center justify-center
            self-end rounded-md bg-[#5458F7] text-white"
          onClick={async () => {
            if (!textRef.current?.value) {
              return;
            }

            await createPost(textRef.current.value);

            if (textRef.current) {
              textRef.current.value = '';
              updateHeight();
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
