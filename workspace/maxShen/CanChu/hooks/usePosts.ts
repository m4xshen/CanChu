import useSWR from 'swr';
import { PostType } from '@/types';
import { fetcher } from '@/utils';

export default function usePosts(
  userId: number | null | undefined,
): PostType[] {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const url = userId
    ? `${apiDomain}/posts/search?user_id=${userId}`
    : `${apiDomain}/posts/search`;

  const { data, error, isLoading } = useSWR(url, fetcher);

  if (isLoading || error) {
    return [];
  }

  return data?.data?.posts;
}
