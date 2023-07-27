import useSWR from 'swr';
import { UserSearchType } from '@/types';
import { fetcher } from '@/utils';

export default function useFriends(): UserSearchType[] {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const url = `${apiDomain}/friends`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (isLoading || error) {
    return [];
  }

  return data.data.users;
}
