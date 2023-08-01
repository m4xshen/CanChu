import { isValidEmail, isValidPassword } from '@/utils';

export default async function useSignup(
  name: string | undefined,
  email: string | undefined,
  password: string | undefined,
  passwordCheck: string | undefined,
): Promise<{ error: Error | undefined; data: any }> {
  if (!name || !email || !password || !passwordCheck) {
    return { error: new Error('請填入所有欄位'), data: null };
  }

  if (!isValidEmail(email)) {
    return {
      error: new Error('Email格式錯誤'),
      data: null,
    };
  }

  if (!isValidPassword(password)) {
    return {
      error: new Error('密碼須包含大寫和小寫字母以及數字，且長度超過八個字符'),
      data: null,
    };
  }

  if (password !== passwordCheck) {
    return {
      error: new Error('密碼不一致'),
      data: null,
    };
  }

  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const res = await fetch(`${apiDomain}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    return { error: undefined, data };
  }

  if (res.status === 403) {
    return { error: new Error('Email已經使用過'), data: null };
  }

  if (res.status === 500) {
    return { error: new Error('伺服器錯誤，請稍後再試'), data: null };
  }

  return { error: new Error(res.status.toString()), data: null };
}
