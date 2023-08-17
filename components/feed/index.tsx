import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { KeyedMutator } from 'swr';
import PostCreator from '@/components/postCreator';
import Post from '@/components/post';
import { PostType, Relation } from '@/types';

interface Props {
  posts: PostType[];
  isLoading: boolean;
  isEnd: boolean;
  mutate: KeyedMutator<any[]>;
  userId: number;
  relation: Relation | undefined;
}

function Feed({ posts, isLoading, isEnd, mutate, userId, relation }: Props) {
  const noPosts = posts === null || posts.length === 0;

  let content;
  if (isLoading) {
    content = (
      <>
        <Skeleton
          duration={0.8}
          height={400}
          borderRadius={16}
          containerClassName="w-full"
        />
        <Skeleton
          duration={0.8}
          height={400}
          borderRadius={16}
          containerClassName="w-full"
        />
        <Skeleton
          duration={0.8}
          height={400}
          borderRadius={16}
          containerClassName="w-full"
        />
      </>
    );
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
        {!isEnd && (
          <Skeleton
            duration={0.8}
            height={400}
            borderRadius={16}
            containerClassName="w-full"
          />
        )}
      </>
    );
  }

  return (
    <div className="mx-3 flex w-full max-w-[48rem] flex-col items-center gap-5 pb-5">
      <PostCreator mutate={mutate} userId={userId} relation={relation} />
      {content}
    </div>
  );
}

export default Feed;
