import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { PostType } from '@/types';

export default function usePosts(apiDomain: string) {
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

  return posts;
}
