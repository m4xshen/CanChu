import { getCookie } from 'cookies-next';

async function deleteFriendship(friendshipId: number | null) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  await fetch(`${apiDomain}/friends/${friendshipId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getCookie('access_token')}`,
    },
  });
}

export default function useDeleteFriendship() {
  return deleteFriendship;
}
