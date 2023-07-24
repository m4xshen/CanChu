import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { UserSearchType } from '@/types';

export default function useFriends(userId: number | null) {
  const [friends, setFriends] = useState<UserSearchType[]>([]);
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  useEffect(() => {
    (async () => {
      const res = await fetch(`${apiDomain}/friends`, {
        method: 'GEt',
        headers: {
          Authorization: `Bearer ${getCookie('access_token')}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setFriends(data.data.users);
      }
    })();
  }, [userId]);

  return friends;
}
