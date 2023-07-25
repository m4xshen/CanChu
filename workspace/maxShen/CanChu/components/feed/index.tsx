import PostCreator from '@/components/postCreator';
import Post from '@/components/post';
import usePosts from '@/hooks/usePosts';
import useRelation from '@/hooks/useRelation';
import { Relation } from '@/types';
import useProfile from '@/hooks/useProfile';
import LoadingIcon from '../icons/LoadingIcon';

interface Props {
  userId: number | null;
  edit: boolean;
}

function Feed({ userId, edit }: Props) {
  const posts = usePosts(userId);

  const profile = useProfile(userId);
  const relation = useRelation(profile);

  return (
    <>
      {relation === Relation.Self && <PostCreator />}
      {posts === null || posts.length === 0 ? (
        <div className="w-[48rem] text-center">沒有新的貼文</div>
      ) : (
        posts.map((post) => (
          <Post key={post.id} post={post} detail={false} editable={edit} />
        ))
      )}
      <LoadingIcon />
    </>
  );
}

export default Feed;
