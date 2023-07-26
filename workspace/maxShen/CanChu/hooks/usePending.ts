import { getCookie } from 'cookies-next';
import useSWR from 'swr';

async function fetcher(url: string) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('access_token')}`,
    },
  });
  const data = await res.json();
  return data;
}

export default function usePending() {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const url = `${apiDomain}/friends/pending`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (isLoading || error) {
    return [];
  }

  return data.data.users;
}
