async function logIn(email: string, password: string) {
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

  return res;
}

export default function useLogIn() {
  return logIn;
}
