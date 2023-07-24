import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { UserSearchType } from '@/types';

export default function usePending() {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const [pendings, setPendings] = useState<UserSearchType[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${apiDomain}/friends/pending`, {
        method: 'GEt',
        headers: {
          Authorization: `Bearer ${getCookie('access_token')}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setPendings(data.data.users);
      }
    })();
  }, []);

  return pendings;
}
