import useSWRInfinite from 'swr/infinite';

import { PostType } from '@/types';
import { fetcher } from '@/utils';

export default function usePosts(
  userId: number | null | undefined,
): [number, any, PostType[]] {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  function getKey(pageIndex: number, previousPageData: any) {
    const nextCursor = previousPageData?.data?.next_cursor;

    if (previousPageData && !nextCursor) {
      return null;
    }

    if (pageIndex === 0) {
      return userId
        ? `${apiDomain}/posts/search?user_id=${userId}`
        : `${apiDomain}/posts/search`;
    }
    if (previousPageData && nextCursor) {
      return userId
        ? `${apiDomain}/posts/search?user_id=${userId}&cursor='${nextCursor}'`
        : `${apiDomain}/posts/search?cursor='${nextCursor}'`;
    }

    return null;
  }

  const { data, error, isLoading, size, setSize } = useSWRInfinite(
    getKey,
    fetcher,
    {
      revalidateFirstPage: false,
    },
  );

  if (isLoading || error) {
    return [size, setSize, []];
  }
  const posts = data?.map((d) => d.data.posts).flat();

  return [size, setSize, posts ?? []];
}
