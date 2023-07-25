import { getCookie } from 'cookies-next';
import useSWR, { KeyedMutator } from 'swr';
import { PostType } from '@/types';

async function fetcher(url: string) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('access_token')}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }

  const data = await res.json();
  return data;
}

export default function usePost(
  id: number,
): [KeyedMutator<any>, PostType | null] {
  const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/posts/${id}`;
  const { mutate, data, error, isLoading } = useSWR(url, fetcher);

  if (isLoading || error) {
    return [mutate, null];
  }

  return [mutate, data?.data?.post];
}
