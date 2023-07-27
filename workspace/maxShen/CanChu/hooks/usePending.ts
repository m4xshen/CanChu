import useSWR from 'swr';
import { UserSearchType } from '@/types';
import { fetcher } from '@/utils';

export default function usePending(): UserSearchType[] {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const url = `${apiDomain}/friends/pending`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (isLoading || error) {
    return [];
  }

  return data.data.users;
}
