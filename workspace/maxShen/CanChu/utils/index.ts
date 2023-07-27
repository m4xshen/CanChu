import { getCookie } from 'cookies-next';

export function getDisplayTime(date: string | null) {
  const invalidDate = date === null || Number.isNaN(new Date(date).getTime());
  if (invalidDate) {
    return '';
  }

  const currentTime = new Date().getTime();
  const postTime = new Date(date).getTime();
  const deltaTimeInSeconds = (currentTime - postTime) / 1000;

  if (deltaTimeInSeconds >= 24 * 5 * 3600) {
    return date;
  }
  if (deltaTimeInSeconds >= 24 * 3600) {
    return `${Math.trunc(deltaTimeInSeconds / (24 * 3600)).toString()} 天前`;
  }
  if (deltaTimeInSeconds >= 3600) {
    return `${Math.trunc(deltaTimeInSeconds / 3600).toString()} 小時前`;
  }
  if (deltaTimeInSeconds >= 60) {
    return `${Math.trunc(deltaTimeInSeconds / 60).toString()} 分鐘前`;
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
