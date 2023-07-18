import Post from '@/components/post';
import LoadingIcon from '../icons/LoadingIcon';
import usePosts from '@/hooks/usePosts';

interface Props {
  apiDomain: string;
  userId: number | null;
}

function Feed({ apiDomain, userId }: Props) {
  const posts = usePosts(apiDomain, userId);

  return (
    <>
      {posts.length === 0 ? (
        <div>沒有新的貼文</div>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            detail={false}
            edit={false}
            apiDomain={apiDomain}
          />
        ))
      )}
      <LoadingIcon />
    </>
  );
}

export default Feed;
