import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

async function getPicture() {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  const userCookie = getCookie('user');
  if (userCookie?.toString() !== undefined) {
    const user = JSON.parse(userCookie.toString());
    const res = await fetch(`${apiDomain}/users/${user.id}/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getCookie('access_token')}`,
      },
    });
    const data = await res.json();
    const profile = data.data.user;

    if (profile.picture !== '') {
      const pictureRes = await fetch(profile.picture);
      if (pictureRes.ok) {
        return profile.picture;
      }
    }
  }
  return '/avatar.png';
}
export default function usePicture() {
  const [picture, setPicture] = useState('/avatar.png');
  useEffect(() => {
    (async () => {
      const pic = await getPicture();
      setPicture(pic);
    })();
  }, []);

  return picture;
}
