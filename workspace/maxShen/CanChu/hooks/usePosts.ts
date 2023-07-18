import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { PostType } from '@/types';

export default function usePosts(userId: number | null) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  useEffect(() => {
    (async () => {
      if (getCookie('access_token') === undefined) {
        return;
      }

      const url = userId
        ? `${apiDomain}/posts/search?user_id=${userId}`
        : `${apiDomain}/posts/search`;
      const res = await fetch(url, {
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
