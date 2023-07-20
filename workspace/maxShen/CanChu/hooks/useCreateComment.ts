import { getCookie } from 'cookies-next';

async function createComment(postId: number, content: string) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  await fetch(`${apiDomain}/posts/${postId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('access_token')}`,
    },
    body: JSON.stringify({
      content,
    }),
  });
}

export default function useCreateComment() {
  return createComment;
}
