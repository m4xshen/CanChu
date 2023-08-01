import { isValidEmail } from '@/utils';

export default async function useLogIn(
  email: string | undefined,
  password: string | undefined,
): Promise<{ error: Error | undefined; data: any }> {
  if (!email || !password) {
    return { error: new Error('請填入所有欄位'), data: null };
  }

  if (!isValidEmail(email)) {
    return {
      error: new Error('Email格式錯誤'),
      data: null,
    };
  }

  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const res = await fetch(`${apiDomain}/users/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      provider: 'native',
      email,
      password,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    return { error: undefined, data };
  }

  if (res.status === 403) {
    return { error: new Error('電子郵件或密碼錯誤'), data: null };
  }

  if (res.status === 500) {
    return { error: new Error('伺服器錯誤，請稍後再試'), data: null };
  }

  return { error: new Error(res.status.toString()), data: null };
}
