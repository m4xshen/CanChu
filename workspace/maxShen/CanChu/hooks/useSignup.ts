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
  const wrappedSignup = async (
    name: string,
    email: string,
    password: string,
  ) => {
    const res = await signup(name, email, password);
    return res;
  };

  return wrappedSignup;
}
