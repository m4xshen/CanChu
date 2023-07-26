import { getCookie } from 'cookies-next';
import useSWR from 'swr';

const fetcher = async (url: string) => {
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
};

export default function useProfile(userId: number | undefined | null) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const url = userId ? `${apiDomain}/users/${userId}/profile` : null;
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (isLoading || error) {
    return null;
  }

  return data?.data?.user;
}
