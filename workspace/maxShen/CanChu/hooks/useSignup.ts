async function signup(
  name: string,
  email: string,
  password: string,
  apiDomain: string,
) {
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

export default function useSignup(apiDomain: string) {
  const wrappedSignup = async (
    name: string,
    email: string,
    password: string,
  ) => {
    const res = await signup(name, email, password, apiDomain);
    return res;
  };

  return wrappedSignup;
}
