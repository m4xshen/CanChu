import { KeyedMutator } from 'swr';
import useSWRInfinite from 'swr/infinite';
import { useState } from 'react';

import { PostType } from '@/types';
import { fetcher } from '@/utils';

export default function usePosts(
  userId: number | null | undefined,
): [KeyedMutator<any[]>, boolean, number, any, PostType[]] {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const [isEnd, setIsEnd] = useState(false);

  function getURL(pageIndex: number, previousPageData: any) {
    const nextCursor = previousPageData?.data?.next_cursor;

    const isFirstPage = pageIndex === 0;
    if (isFirstPage) {
      return userId
        ? `${apiDomain}/posts/search?user_id=${userId}`
        : `${apiDomain}/posts/search`;
    }

    const hasNextPage = previousPageData && nextCursor;
    if (hasNextPage) {
      return userId
        ? `${apiDomain}/posts/search?user_id=${userId}&cursor='${nextCursor}'`
        : `${apiDomain}/posts/search?cursor='${nextCursor}'`;
    }

    setIsEnd(true);
    return null;
  }

  const { mutate, data, error, isLoading, size, setSize } = useSWRInfinite(
    getURL,
    fetcher,
    {
      revalidateFirstPage: false,
    },
  );

  if (isLoading || error) {
    return [mutate, isEnd, size, setSize, []];
  }

  const posts = data?.map((d) => d.data.posts).flat();
  return [mutate, isEnd, size, setSize, posts ?? []];
}
