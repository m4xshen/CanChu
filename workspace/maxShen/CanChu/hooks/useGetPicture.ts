import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

async function getPicture(userId: number | undefined | null) {
  if (!userId) {
    return '/avatar.png';
  }

  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const res = await fetch(`${apiDomain}/users/${userId}/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('access_token')}`,
    },
  });
  const data = await res.json();
  const profile = data.data.user;

  // check whether the image is available
  const pictureRes = await fetch(profile.picture);
  if (pictureRes.ok) {
    return profile.picture;
  }

  return '/avatar.png';
}

export default function useGetPicture(userId: number | undefined | null) {
  const [picture, setPicture] = useState('/avatar.png');
  useEffect(() => {
    (async () => {
      const pic = await getPicture(userId);
      setPicture(pic);
    })();
  }, [userId]);

  return picture;
}
