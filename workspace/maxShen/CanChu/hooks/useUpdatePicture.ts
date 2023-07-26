import { getCookie } from 'cookies-next';

async function updatePicture(blob: Blob) {
  const formData = new FormData();
  formData.append('picture', blob);

  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const res = await fetch(`${apiDomain}/users/picture`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getCookie('access_token')}`,
    },
    body: formData,
  });
  return res;
}

export default function useUpdatePicture() {
  return updatePicture;
}
