import useSWR from 'swr';
import { fetcher } from '@/utils';

export default function usePost(id: number) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const url = `${apiDomain}/posts/${id}`;
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnMount: true,
  });

  if (isLoading || error) {
    return { post: null, isLoading };
  }

  return { post: data?.data?.post, isLoading };
}
