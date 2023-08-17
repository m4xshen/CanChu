export default async function useLogIn(
  email: string,
  password: string,
): Promise<{ error: Error | undefined; data: any }> {
  try {
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
      throw new Error('電子郵件或密碼錯誤');
    }

    if (res.status === 500) {
      throw new Error('伺服器錯誤，請稍後再試');
    }

    return { error: new Error(res.status.toString()), data: null };
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;
    else message = String(error);

    return { error: new Error(message), data: null };
  }
}
