import { useState } from 'react';
import { KeyedMutator } from 'swr';
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
  mutate: KeyedMutator<any>;
}

function Post({ post, detail, editable, mutate }: Props) {
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
          mutate={mutate}
        />
      </div>
    </div>
  );
}

export default Post;
