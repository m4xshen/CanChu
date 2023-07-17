import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import Post from '@/components/post';
import LoadingIcon from '../icons/LoadingIcon';
import { PostType } from '@/types';

interface Props {
  apiDomain: string;
}

function Feed({ apiDomain }: Props) {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    (async () => {
      if (getCookie('access_token') === undefined) {
        return;
      }

      const res = await fetch(`${apiDomain}/posts/search`, {
        method: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${getCookie('access_token')}`,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setPosts(data.data.posts);
      }
    })();
  }, []);

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
