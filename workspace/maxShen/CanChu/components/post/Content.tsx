import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useRouter } from 'next/router';
import CommentIcon from '../icons/CommentIcon';
import HeartIcon from '../icons/HeartIcon';
import { PostType } from '@/types';
import getDisplayTime from '@/utils';
import useProfile from '@/hooks/useProfile';
import useLike from '@/hooks/useLike';
import useUpdatePost from '@/hooks/useUpdatePost';

interface Props {
  post: PostType;
  commentCount: number | null;
  url: string;
  detail: boolean;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

function Content({ post, commentCount, url, detail, edit, setEdit }: Props) {
  const router = useRouter();
  const profile = useProfile(post.user_id);
  const [isLiked, likeCount, toggleLike] = useLike(post);
  const updatePost = useUpdatePost();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const heart = (
    <div>
      {isLiked ? (
        <Image src="/heart.png" width={28} height={28} alt="heart icon" />
      ) : (
        <HeartIcon />
      )}
    </div>
  );

  return (
    <div className="px-10 pt-7">
      <div className="flex w-full items-center gap-3">
        <Link href={profile?.id ? `/users/${profile.id}` : '/'}>
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
            <Image
              src={post.picture ? post.picture : '/avatar.png'}
              fill
              alt="user avatar"
              className="object-cover"
            />
          </div>
        </Link>
        <div>
          <div className="cursor-pointer text-lg font-bold">{post.name}</div>
          <Link
            href={url}
            className={`text-sm font-normal text-[#909090] ${
              detail && 'pointer-events-none'
            }`}
          >
            {getDisplayTime(post.created_at)}
          </Link>
        </div>
      </div>
      {edit ? (
        <>
          <textarea
            ref={textareaRef}
            className="mb-3 mt-4 w-full resize-none rounded-lg
              border border-[#BFBFBF] bg-[#F0F2F5] p-3"
            defaultValue={post.context || ''}
          />
          <div className="mb-4 flex gap-4">
            <button
              type="submit"
              className="rounded-md bg-[#5458F7] px-7 py-2 font-bold text-white"
              onClick={async () => {
                setEdit(false);
                if (!textareaRef?.current?.value) {
                  return;
                }
                await updatePost(textareaRef?.current?.value, post.id);
                router.reload();
              }}
            >
              確認
            </button>
            <button
              type="submit"
              className="rounded-md bg-[#D3D3D3] px-7 py-2 font-bold text-white"
              onClick={() => {
                setEdit(false);
              }}
            >
              取消
            </button>
          </div>
        </>
      ) : (
        <pre
          className={`whitespace-pre-wrap leading-6 text-lg
            my-4 min-h-[83px]`}
        >
          {post.context}
        </pre>
      )}
      <div
        className="flex h-14 items-center gap-2
          border-b border-t border-[#B7B7B7]"
      >
        {detail ? (
          <>
            <button type="button" className="ml-2" onClick={toggleLike}>
              {heart}
            </button>
            <button type="button">
              <CommentIcon />
            </button>
          </>
        ) : (
          <>
            <Link href={url} className="ml-2">
              {heart}
            </Link>
            <Link href={url}>
              <CommentIcon />
            </Link>
          </>
        )}
      </div>
      <div
        className="flex h-12 items-center justify-between
          text-base font-normal text-[#5c5c5c]"
      >
        <Link href={url} className={`${detail && 'pointer-events-none'}`}>
          {likeCount} 人喜歡這則貼文
        </Link>
        <Link href={url} className={`mr-2 ${detail && 'pointer-events-none'}`}>
          {commentCount ?? 0} 則留言
        </Link>
      </div>
    </div>
  );
}

export default Content;
