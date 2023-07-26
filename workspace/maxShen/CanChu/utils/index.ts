import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export default function getDisplayTime(date: string | null) {
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
  return '剛剛';
}

export async function fetcher(url: string) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('access_token')}`,
    },
  });

  if (res.status === 403) {
    throw new Error();
  }

  const data = await res.json();
  return data;
}
