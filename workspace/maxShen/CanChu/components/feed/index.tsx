import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

import PostCreator from '@/components/postCreator';
import Post from '@/components/post';
import usePosts from '@/hooks/usePosts';
import useRelation from '@/hooks/useRelation';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { ProfileType, Relation } from '@/types';
import LoadingIcon from '../icons/LoadingIcon';

interface Props {
  profile: ProfileType | null;
}

function Feed({ profile }: Props) {
  const relation = useRelation(profile);
  const router = useRouter();

  const isHomePage = router.query.id === undefined;
  const [mutate, isEnd, size, setSize, posts] = usePosts(
    isHomePage ? null : profile?.id,
  );
  useInfiniteScroll(async () => setSize(size + 1), 100);

  const noPosts = posts === null || posts.length === 0;
  const userId = parseInt(getCookie('user_id') as string, 10);

  return (
    <>
      {relation === Relation.Self && <PostCreator mutate={mutate} />}
      {noPosts ? (
        <div className="w-[48rem] text-center">沒有新的貼文</div>
      ) : (
        <>
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              detail={false}
              editable={post.user_id === userId}
              mutate={mutate}
            />
          ))}
          {!isEnd && <LoadingIcon />}
        </>
      )}
    </>
  );
}

export default Feed;
