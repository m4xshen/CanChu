import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import PostCreator from '@/components/postCreator';
import Post from '@/components/post';
import usePosts from '@/hooks/usePosts';
import useRelation from '@/hooks/useRelation';
import { ProfileType, Relation } from '@/types';
import LoadingIcon from '../icons/LoadingIcon';

interface Props {
  profile: ProfileType | null;
}

function Feed({ profile }: Props) {
  const relation = useRelation(profile);
  const router = useRouter();

  const isHomePage = router.query.id === undefined;
  const posts = usePosts(isHomePage ? null : profile?.id);
  const noPosts = posts === null || posts.length === 0;

  const userId = parseInt(getCookie('user_id') as string, 10);

  return (
    <>
      {relation === Relation.Self && <PostCreator />}
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
            />
          ))}
          <LoadingIcon />
        </>
      )}
    </>
  );
}

export default Feed;
