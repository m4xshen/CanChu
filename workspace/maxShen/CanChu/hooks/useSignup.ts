import { isValidEmail, isValidPassword } from '@/utils';

export default async function useSignup(
  name: string | undefined,
  email: string | undefined,
  password: string | undefined,
  passwordCheck: string | undefined,
): Promise<{ error: Error | undefined; data: any }> {
  try {
    if (!name || !email || !password || !passwordCheck) {
      throw new Error('請填入所有欄位');
    }

    if (!isValidEmail(email)) {
      throw new Error('Email格式錯誤');
    }

    if (!isValidPassword(password)) {
      throw new Error('密碼須包含大寫和小寫字母以及數字，且長度超過八個字符');
    }

    if (password !== passwordCheck) {
      throw new Error('密碼不一致');
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
      throw new Error('Email已經使用過');
    }

    if (res.status === 500) {
      throw new Error('伺服器錯誤，請稍後再試');
    }

    throw new Error(res.status.toString());
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;
    else message = String(error);

    return { error: new Error(message), data: null };
  }
}
