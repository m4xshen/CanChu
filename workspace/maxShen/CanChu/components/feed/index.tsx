import { useRouter } from 'next/router';
import PostCreator from '@/components/postCreator';
import Post from '@/components/post';
import usePosts from '@/hooks/usePosts';
import useRelation from '@/hooks/useRelation';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { ProfileType, Relation } from '@/types';
import LoadingIcon from '../icons/LoadingIcon';

interface Props {
  profile: ProfileType | null;
  userId: number;
}

function Feed({ profile, userId }: Props) {
  const relation = useRelation(userId, profile);
  const router = useRouter();

  const isHomePage = router.query.id === undefined;
  const { mutate, isLoading, isEnd, size, setSize, posts } = usePosts(
    isHomePage ? null : profile?.id,
  );
  useInfiniteScroll(async () => setSize(size + 1), 100);

  const noPosts = posts === null || posts.length === 0;

  let content;
  if (isLoading) {
    content = <div className="w-full text-center">載入中 ...</div>;
  } else if (noPosts) {
    content = <div className="w-full text-center">沒有新的貼文</div>;
  } else {
    content = (
      <>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            detail={false}
            editable={post.user_id === userId}
            userId={userId}
            mutate={mutate}
          />
        ))}
        {!isEnd && <LoadingIcon />}
      </>
    );
  }

  return (
    <div className="mx-3 flex w-full max-w-[48em] flex-col items-center gap-5 pb-5">
      {relation === Relation.Self && (
        <PostCreator mutate={mutate} userId={userId} />
      )}
      {content}
    </div>
  );
}

export default Feed;
