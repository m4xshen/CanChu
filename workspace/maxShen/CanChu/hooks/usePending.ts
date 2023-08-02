import useSWR from 'swr';
import { fetcher } from '@/utils';

export default function usePending() {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const url = `${apiDomain}/friends/pending`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (isLoading || error) {
    return { isLoading, data: [] };
  }

  return { isLoading, data: data.data.users };
}
