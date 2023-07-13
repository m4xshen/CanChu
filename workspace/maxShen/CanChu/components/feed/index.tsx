import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import Post from '@/components/post';
import LoadingIcon from '../icons/LoadingIcon';
import { PostType } from '@/types';

function Feed({
  apiDomain,
  postIds,
}: {
  apiDomain: string;
  postIds: number[];
}) {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const newPosts: PostType[] = [];

    postIds.forEach(async (id, index) => {
      const res = await fetch(`${apiDomain}/posts/${id}`, {
        method: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${getCookie('access_token')}`,
        }),
      });
      const data = await res.json();
      newPosts.unshift(data.data.post);

      if (index === postIds.length - 1) {
        setPosts(newPosts);
      }
    });
  }, [postIds]);

  return (
    <>
      {posts.length === 0 ? (
        <div>沒有新的貼文</div>
      ) : (
        posts.map((post) => (
          <Post key={post.id} post={post} detail={false} edit={false} />
        ))
      )}
      <LoadingIcon />
    </>
  );
}

export default Feed;
