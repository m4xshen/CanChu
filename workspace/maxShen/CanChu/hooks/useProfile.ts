import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { ProfileType } from '@/types';

export default function useProfile() {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const [profile, setProfile] = useState<ProfileType>();

  useEffect(() => {
    const userCookie = getCookie('user');
    if (userCookie?.toString() !== undefined && profile === undefined) {
      const user = JSON.parse(userCookie.toString());
      (async () => {
        const res = await fetch(`${apiDomain}/users/${user.id}/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getCookie('access_token')}`,
          },
        });
        const data = await res.json();
        setProfile(data.data.user);
      })();
    }
  }, []);

  return profile;
}
