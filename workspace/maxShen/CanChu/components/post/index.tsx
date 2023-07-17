import React from 'react';
import Content from './Content';
import CommentSection from './CommentSection';
import comments from '@/data/comments';

import { PostType } from '@/types';
import EditIcon from '../icons/EditIcon';

interface Props {
  post: PostType;
  detail: boolean;
  edit: boolean;
  apiDomain: string;
}

function Post({ post, detail, edit, apiDomain }: Props) {
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
        <Content post={post} url={url} detail={detail} />
        <CommentSection
          comments={comments}
          detail={detail}
          url={url}
          apiDomain={apiDomain}
        />
      </div>
    </div>
  );
}

export default Post;
