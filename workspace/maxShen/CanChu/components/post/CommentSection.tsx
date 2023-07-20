import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { getCookie } from 'cookies-next';

import SendIcon from '../icons/SendIcon';
import Comment from './Comment';
import { CommentType } from '@/types';
import usePicture from '@/hooks/usePicture';
import useProfile from '@/hooks/useProfile';

interface Props {
  originComments: CommentType[];
  commentCount: number;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
  postId: number;
  detail: boolean;
  url: string;
}

function CommentSection({
  originComments,
  commentCount,
  setCommentCount,
  postId,
  detail,
  url,
}: Props) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const [comments, setComments] = useState(originComments);
  const inputRef = useRef<HTMLInputElement>(null);

  const picture = usePicture();

  const userCookie = getCookie('user')?.toString();
  const user = JSON.parse(userCookie || '{}');
  const profile = useProfile(user.id);

  const content = (
    <>
      {detail &&
        comments &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      <div className="mb-5 mt-3 flex items-center gap-4">
        <div className="relative ml-10 h-[50px] w-[50px] shrink-0 overflow-hidden rounded-full">
          <Image
            src={picture}
            fill
            alt="user avatar"
            className="object-cover"
          />
        </div>
        <div
          className="mr-12 flex h-12 w-full items-center justify-between
            rounded-lg border border-[#d9d9d9] bg-[#f0f2f5] pl-6
            pr-3 text-xl font-normal leading-10 text-[#777777]"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="留個言吧"
            className="pointer-events-auto h-6 w-full bg-[#f0f2f5] pr-2 text-xl text-[#777777] outline-0"
          />
          {detail && (
            <button
              type="button"
              className="pointer-events-auto"
              onClick={() => {
                if (
                  !inputRef?.current?.value ||
                  !profile?.id ||
                  !profile?.name ||
                  !profile?.picture
                ) {
                  return;
                }

                const comment = {
                  id: -1,
                  created_at: new Date().toString(),
                  content: inputRef.current.value,
                  user: {
                    id: profile.id,
                    name: profile.name,
                    picture: profile.picture,
                  },
                };
                const newComments = [...comments, comment];
                setComments(newComments);
                setCommentCount(commentCount + 1);

                (async () => {
                  if (!inputRef?.current?.value) {
                    return;
                  }

                  await fetch(`${apiDomain}/posts/${postId}/comment`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${getCookie('access_token')}`,
                    },
                    body: JSON.stringify({
                      content: inputRef.current.value,
                    }),
                  });

                  if (inputRef?.current?.value) {
                    inputRef.current.value = '';
                  }
                })();
              }}
            >
              <SendIcon />
            </button>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div>
      {detail ? (
        <div className="border-t border-t-[#b7b7b7]">{content}</div>
      ) : (
        <Link href={url}>
          <div className="border-t border-t-[#b7b7b7]">{content}</div>
        </Link>
      )}
    </div>
  );
}

export default CommentSection;
