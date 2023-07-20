import { getCookie } from 'cookies-next';

async function updateProfile(name: string, introduction: string, tags: string) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  await fetch(`${apiDomain}/users/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('access_token')}`,
    },
    body: JSON.stringify({
      name,
      introduction,
      tags,
    }),
  });
}

export default function useUpdateProfile() {
  return updateProfile;
}
