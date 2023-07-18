async function login(email: string, password: string, apiDomain: string) {
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

export default function useLogin(apiDomain: string) {
  const wrappedLogin = async (email: string, password: string) => {
    const res = await login(email, password, apiDomain);
    return res;
  };

  return wrappedLogin;
}
