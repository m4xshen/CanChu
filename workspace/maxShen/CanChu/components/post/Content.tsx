import { useRef } from 'react';
import { useRouter } from 'next/router';

import { PostType } from '@/types';
import useUpdatePost from '@/hooks/useUpdatePost';

interface Props {
  post: PostType;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

function Content({ post, edit, setEdit }: Props) {
  const router = useRouter();
  const updatePost = useUpdatePost();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (edit) {
    return (
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
    );
  }

  return (
    <pre className="my-4 min-h-[83px] whitespace-pre-wrap text-lg leading-6">
      {post.context}
    </pre>
  );
}

export default Content;
