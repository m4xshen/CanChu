import Post from '@/components/post';
import LoadingIcon from '../icons/LoadingIcon';
import posts from '@/data/post';

function Feed() {
  return (
    <>
      {posts.length === 0 ? (
        <div>沒有新的貼文</div>
      ) : (
        posts.map((post) => <Post key={post.id} post={post} detail={false} />)
      )}
      <LoadingIcon />
    </>
  );
}

export default Feed;
