import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export const getDisplayTime = (date: string | null) => {
  // return an empty string if the date is invalid
  if (date === null || Number.isNaN(new Date(date).getTime())) {
    return '';
  }

  // get rounded delta time in seconds
  const delta = (new Date().getTime() - new Date(date).getTime()) / 1000;

  if (delta >= 24 * 5 * 3600) {
    return date;
  }
  if (delta >= 24 * 3600) {
    return `${Math.trunc(delta / (24 * 3600)).toString()} 天前`;
  }
  if (delta >= 3600) {
    return `${Math.trunc(delta / 3600).toString()} 小時前`;
  }
  if (delta >= 60) {
    return `${Math.trunc(delta / 60).toString()} 分鐘前`;
  }
  return `${Math.trunc(delta).toString()} 秒前`;
};

async function getPicture(apiDomain: string) {
  const userCookie = getCookie('user');
  if (userCookie?.toString() !== undefined) {
    const user = JSON.parse(userCookie.toString());
    let res = await fetch(`${apiDomain}/users/${user.id}/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getCookie('access_token')}`,
      },
    });
    const data = await res.json();
    const profile = data.data.user;

    res = await fetch(profile.picture);
    if (res.ok) {
      return profile.picture;
    }
  }
  return '/avatar.png';
}

export function usePicture(apiDomain: string) {
  const [picture, setPicture] = useState('/avatar.png');
  useEffect(() => {
    (async () => {
      const pic = await getPicture(apiDomain);
      setPicture(pic);
    })();
  }, []);

  return picture;
}
