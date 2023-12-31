import Image from 'next/image';
import { useRef } from 'react';
import { useSWRConfig } from 'swr';

import useGetPicture from '@/hooks/useGetPicture';
import useProfile from '@/hooks/useProfile';
import useCreateComment from '@/hooks/useCreateComment';
import SendIcon from '../../icons/SendIcon';

interface Props {
  postId: number;
  userId: number;
  detail: boolean;
}

export default function CommentBar({ postId, userId, detail }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const profile = useProfile(userId);
  const picture = useGetPicture(profile);
  const { mutate } = useSWRConfig();

  const createComment = useCreateComment();

  function handleClick() {
    if (
      !inputRef?.current?.value ||
      !profile?.id ||
      !profile?.name ||
      !profile?.picture
    ) {
      return;
    }

    (async () => {
      if (!inputRef?.current?.value) {
        return;
      }

      await createComment(postId, inputRef.current.value);

      if (inputRef?.current?.value) {
        inputRef.current.value = '';
      }

      const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
      mutate(`${apiDomain}/posts/${postId}`);
    })();
  }

  return (
    <div className="mb-5 mt-3 flex items-center gap-4 px-5 sm:px-10">
      <div
        className="relative h-[50px] w-[50px]
        shrink-0 overflow-hidden rounded-full"
      >
        <Image
          src={picture}
          fill
          sizes="50px"
          alt="user avatar"
          className="object-cover"
        />
      </div>
      <div
        className="flex h-12 w-full items-center justify-between
          rounded-lg border border-[#d9d9d9] bg-[#f0f2f5] pl-6
          pr-3 text-xl font-normal leading-10 text-[#777777]"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="留個言吧"
          className="pointer-events-auto h-6 w-full bg-[#f0f2f5]
            pr-2 text-xl text-[#777777] outline-none"
        />
        {detail && (
          <button
            type="button"
            className="pointer-events-auto"
            onClick={handleClick}
          >
            <SendIcon />
          </button>
        )}
      </div>
    </div>
  );
}
