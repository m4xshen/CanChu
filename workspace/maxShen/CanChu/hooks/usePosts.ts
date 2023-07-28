import { useState } from 'react';
import useSWR from 'swr';

import { PostType } from '@/types';
import { fetcher } from '@/utils';

export default function usePosts(
  userId: number | null | undefined,
): PostType[] {
  const [nextCursor, setNextCursor] = useState();
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
