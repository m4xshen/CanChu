import Content from './Content';
import CommentSection from './CommentSection';
import comments from '@/data/comments';

interface PostType {
  user_id: number;
  name: string;
  picture: string;
  id: number;
  context: string;
  created_at: string | null;
  like_count: number;
  comment_count: number;
  is_like: number;
};

interface Props {
  post: PostType;
  detail: boolean;
};

const Post: React.FC<Props> = ({ post, detail }) => {
  const url = `/posts/${post.id}`;

  return (
    <div className="flex justify-center">
      <div className="w-[48rem] border border-[#0000001A] rounded-2xl bg-white">
        <Content
          post={post}
          url={url}
          detail={detail}
        />
        <CommentSection
          comments={comments}
          detail={detail}
          url={url}
        />
      </div>
    </div>
  );
};

export default Post;
