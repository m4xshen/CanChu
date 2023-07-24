import { useState } from 'react';
import Content from './Content';
import CommentSection from './CommentSection';

import { PostType } from '@/types';
import EditIcon from '../icons/EditIcon';

interface Props {
  post: PostType;
  detail: boolean;
  editable: boolean;
}

function Post({ post, detail, editable }: Props) {
  const [edit, setEdit] = useState(false);
  const url = `/posts/${post.id}`;

  return (
    <div className="group relative flex justify-center">
      {editable && (
        <button
          type="button"
          className="absolute right-4 top-4 hidden group-hover:block"
          onClick={() => {
            setEdit(true);
          }}
        >
          <EditIcon />
        </button>
      )}
      <div className="w-[48rem] rounded-2xl border border-[#0000001A] bg-white">
        <Content
          post={post}
          commentCount={post.comment_count}
          url={url}
          detail={detail}
          edit={edit}
          setEdit={setEdit}
        />
        <CommentSection
          comments={post.comments}
          postId={post.id}
          detail={detail}
          url={url}
        />
      </div>
    </div>
  );
}

export default Post;
