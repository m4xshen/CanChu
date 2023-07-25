import { useState } from 'react';
import Content from './Content';
import CommentSection from './CommentSection';
import TitleBar from './TitleBar';
import EditIcon from '../icons/EditIcon';
import { PostType } from '@/types';
import InfoBar from './InfoBar';

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
        <div className="px-10 pt-7">
          <TitleBar post={post} url={url} detail={detail} />
          <Content post={post} edit={edit} setEdit={setEdit} />
          <InfoBar
            post={post}
            commentCount={post.comment_count}
            url={url}
            detail={detail}
          />
        </div>
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
