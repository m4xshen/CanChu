async function signup(name: string, email: string, password: string) {
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

  return res;
}

export default function useSignup() {
  return signup;
}
