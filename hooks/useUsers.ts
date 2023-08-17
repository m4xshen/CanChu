import { getCookie } from 'cookies-next';

async function getUsers(keyword: string) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const res = await fetch(`${apiDomain}/users/search?keyword=${keyword}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('access_token')}`,
    },
  });
  const data = await res.json();
  return data.data.users;
}

export default function useUsers() {
  return getUsers;
}
