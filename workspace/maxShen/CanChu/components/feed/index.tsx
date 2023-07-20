import Post from '@/components/post';
import LoadingIcon from '../icons/LoadingIcon';
import usePosts from '@/hooks/usePosts';

interface Props {
  userId: number | null;
  edit: boolean;
}

function Feed({ userId, edit }: Props) {
  const posts = usePosts(userId);

  return (
    <>
      {posts.length === 0 ? (
        <div>沒有新的貼文</div>
      ) : (
        posts.map((post) => (
          <Post key={post.id} post={post} detail={false} edit={edit} />
        ))
      )}
      <LoadingIcon />
    </>
  );
}

export default Feed;
