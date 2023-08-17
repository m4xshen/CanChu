import { getCookie } from 'cookies-next';

async function createPost(context: string) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  await fetch(`${apiDomain}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('access_token')}`,
    },
    body: JSON.stringify({
      context,
    }),
  });
}

export default function useCreatePost() {
  return createPost;
}
