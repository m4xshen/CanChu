import useSWR, { KeyedMutator } from 'swr';
import { getCookie } from 'cookies-next';
import { PostType } from '@/types';

async function fetcher(url: string) {
  const res = await fetch(url, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${getCookie('access_token')}`,
    }),
  });
  const data = await res.json();
  return data;
}

export default function usePosts(
  userId: number | null,
): [KeyedMutator<any>, PostType[]] {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  const url = userId
    ? `${apiDomain}/posts/search?user_id=${userId}`
    : `${apiDomain}/posts/search`;

  const { mutate, data, error, isLoading } = useSWR(url, fetcher);

  if (isLoading || error) {
    return [mutate, []];
  }

  return [mutate, data?.data?.posts];
}
