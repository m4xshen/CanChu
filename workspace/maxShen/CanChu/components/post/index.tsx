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
}

function Post({ post, detail, edit }: Props) {
  const url = `/posts/${post.id}`;

  return (
    <div className="flex justify-center relative group">
      {edit && (
        <button className="absolute top-4 right-4 hidden group-hover:block">
          <EditIcon />
        </button>
      )}
      <div className="w-[48rem] border border-[#0000001A] rounded-2xl bg-white">
        <Content post={post} url={url} detail={detail} />
        <CommentSection comments={comments} detail={detail} url={url} />
      </div>
    </div>
  );
}

export default Post;
