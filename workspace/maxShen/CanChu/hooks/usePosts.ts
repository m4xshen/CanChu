import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { PostType } from '@/types';
import { fetcher } from '@/utils';

export default function usePosts(
  userId: number | null | undefined,
): PostType[] {
  const [nextCursor, setNextCursor] = useState();
  const [isBottom, setIsBottom] = useState(false);

  // handle scroll event
  useEffect(() => {
    function handleScroll() {
      const within100pxFromBottom =
        window.innerHeight + Math.round(window.scrollY) >=
        document.body.offsetHeight - 100;
      if (within100pxFromBottom) {
        setIsBottom(true);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isBottom) {
      console.log('get the posts!');
    }
  }, [isBottom]);

  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const url = userId
    ? `${apiDomain}/posts/search?user_id=${userId}`
    : `${apiDomain}/posts/search`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (isLoading || error) {
    return [];
  }

  if (data.data.next_cursor !== nextCursor) {
    setNextCursor(data.data.next_cursor);
    console.log(data.data.next_cursor);
  }

  return data?.data?.posts;
}
