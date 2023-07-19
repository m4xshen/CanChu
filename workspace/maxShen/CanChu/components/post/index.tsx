import React, { useState } from 'react';
import Content from './Content';
import CommentSection from './CommentSection';

import { PostType } from '@/types';
import EditIcon from '../icons/EditIcon';

interface Props {
  post: PostType;
  detail: boolean;
  edit: boolean;
}

function Post({ post, detail, edit }: Props) {
  const [commentCount, setCommentCount] = useState(post.comment_count ?? 0);
  const url = `/posts/${post.id}`;

  return (
    <div className="group relative flex justify-center">
      {edit && (
        <button
          type="button"
          className="absolute right-4 top-4 hidden group-hover:block"
        >
          <EditIcon />
        </button>
      )}
      <div className="w-[48rem] rounded-2xl border border-[#0000001A] bg-white">
        <Content
          post={post}
          commentCount={commentCount}
          url={url}
          detail={detail}
        />
        <CommentSection
          originComments={post.comments}
          commentCount={commentCount}
          setCommentCount={setCommentCount}
          postId={post.id}
          detail={detail}
          url={url}
        />
      </div>
    </div>
  );
}

export default Post;
