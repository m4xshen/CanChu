import { getCookie } from 'cookies-next';

async function agreeFriendship(friendshipId: number | null) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  await fetch(`${apiDomain}/friends/${friendshipId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getCookie('access_token')}`,
    },
  });
}

export default function useAgreeFriendship() {
  return agreeFriendship;
}
