import { useRouter } from 'next/router';
import PostCreator from '@/components/postCreator';
import Post from '@/components/post';
import usePosts from '@/hooks/usePosts';
import useRelation from '@/hooks/useRelation';
import { ProfileType, Relation } from '@/types';
import LoadingIcon from '../icons/LoadingIcon';

interface Props {
  profile: ProfileType | null;
  edit: boolean;
}

function Feed({ profile, edit }: Props) {
  const relation = useRelation(profile);
  const router = useRouter();
  const isHomePage = router.query.id === undefined;
  const posts = usePosts(isHomePage ? null : profile?.id);
  const noPosts = posts === null || posts.length === 0;

  return (
    <>
      {relation === Relation.Self && <PostCreator />}
      {noPosts ? (
        <div className="w-[48rem] text-center">沒有新的貼文</div>
      ) : (
        <>
          {posts.map((post) => (
            <Post key={post.id} post={post} detail={false} editable={edit} />
          ))}
          <LoadingIcon />
        </>
      )}
    </>
  );
}

export default Feed;
