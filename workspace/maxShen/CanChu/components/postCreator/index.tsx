'use client';

import { useRef } from 'react';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import profile from '@/data/profile';

interface Props {
  apiDomain: string;
  postIds: number[];
  setPostIds: React.Dispatch<React.SetStateAction<number[]>>;
}

function PostCreator({ apiDomain, postIds, setPostIds }: Props) {
  const textRef = useRef<HTMLTextAreaElement>(null);

  async function createPost() {
    const res = await fetch(`${apiDomain}/posts`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('access_token')}`,
      }),
      body: JSON.stringify({
        context: textRef.current?.value,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setPostIds([...postIds, data.data.post.id]);
      console.log(data.data.post.id);
    }
  }

  return (
    <div className="flex w-[48rem] gap-6 rounded-2xl border border-[#0000001A] bg-white p-5">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
        <Image
          src={profile.picture}
          fill
          alt="user avatar"
          className="object-cover"
        />
      </div>
      <div className="flex w-full flex-col gap-3">
        <textarea
          ref={textRef}
          placeholder="說點什麼嗎？"
          className="h-24 resize-none rounded-lg border border-[#D9D9D9] bg-[#F0F2F5] p-3
            pr-2 text-xl text-[#767676] outline-0"
        />
        <button
          type="submit"
          className="flex h-10 w-36 items-center justify-center self-end rounded-md
            bg-[#5458F7] text-white"
          onClick={() => {
            createPost();
            if (textRef.current) {
              textRef.current.value = '';
            }
          }}
        >
          發佈貼文
        </button>
      </div>
    </div>
  );
}

export default PostCreator;
