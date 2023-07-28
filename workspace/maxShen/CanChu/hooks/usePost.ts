import useSWR from 'swr';
import { PostType } from '@/types';
import { fetcher } from '@/utils';

export default function usePost(id: number): PostType | null {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const url = `${apiDomain}/posts/${id}`;
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnMount: true,
  });

  if (isLoading || error) {
    return null;
  }

  return data?.data?.post;
}
