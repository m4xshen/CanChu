import { getCookie } from "cookies-next";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

async function makeFriendRequest(userId: number | null) {
  await fetch(`${apiDomain}/friends/${userId}/request`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getCookie('access_token')}`,
    }
  })
}

async function removeFriendRequest(frienshipId: number | null) {
  await fetch(`${apiDomain}/friends/${frienshipId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getCookie('access_token')}`,
    }
  })
}

export default function useFriendRequest() {
  return [makeFriendRequest, removeFriendRequest];
}
