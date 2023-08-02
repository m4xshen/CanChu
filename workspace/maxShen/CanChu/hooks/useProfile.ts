import useSWR from 'swr';
import { fetcher } from '@/utils';

export default function useProfile(userId: number | undefined | null) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const url = userId ? `${apiDomain}/users/${userId}/profile` : null;
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (isLoading || error) {
    return null;
  }

  return data?.data?.user;
}
