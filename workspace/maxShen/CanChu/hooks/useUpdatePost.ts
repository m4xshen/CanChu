import { getCookie } from 'cookies-next';

async function updatePost(context: string, id: number) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  await fetch(`${apiDomain}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('access_token')}`,
    },
    body: JSON.stringify({
      context,
    }),
  });
}

export default function useUpdatePost() {
  return updatePost;
}
