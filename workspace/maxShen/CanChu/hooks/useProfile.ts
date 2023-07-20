import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { ProfileType } from '@/types';

export default function useProfile(userId: number | undefined | null) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const [profile, setProfile] = useState<ProfileType>();

  useEffect(() => {
    if (!userId) {
      return;
    }

    (async () => {
      const res = await fetch(`${apiDomain}/users/${userId}/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getCookie('access_token')}`,
        },
      });

      if (!res.ok) {
        return;
      }

      const data = await res.json();
      setProfile(data.data.user);
    })();
  }, []);

  return profile;
}
