import { setCookie } from 'cookies-next';
import { useRef, useState } from 'react';
import { NextRouter } from 'next/router';

async function signup(
  nameRef: React.RefObject<HTMLInputElement>,
  emailRef: React.RefObject<HTMLInputElement>,
  passwordRef: React.RefObject<HTMLInputElement>,
  setLoggingIn: React.Dispatch<React.SetStateAction<boolean>>,
  apiDomain: string,
) {
  const res = await fetch(`${apiDomain}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    }),
  });

  if (res.ok) {
    // go back to login page
    setLoggingIn(true);
    emailRef.current?.form?.reset();
  } else if (res.status === 403) {
    alert('email已經使用過');
  } else if (res.status === 400) {
    alert('client error');
  } else if (res.status === 500) {
    alert('server error');
  }
}

async function login(
  emailRef: React.RefObject<HTMLInputElement>,
  passwordRef: React.RefObject<HTMLInputElement>,
  router: NextRouter,
  apiDomain: string,
) {
  const res = await fetch(`${apiDomain}/users/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      provider: 'native',
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    setCookie('access_token', data.data.access_token);
    setCookie('user', data.data.user);
    router.reload();
  } else if (res.status === 403) {
    alert('電子郵件或密碼錯誤');
  } else if (res.status === 400) {
    alert('client error');
  } else if (res.status === 500) {
    alert('server error');
  }
}

export default function useEntry(
  router: NextRouter,
  apiDomain: string,
): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.RefObject<HTMLInputElement>,
  React.RefObject<HTMLInputElement>,
  React.RefObject<HTMLInputElement>,
  React.RefObject<HTMLInputElement>,
  () => {},
  () => {},
] {
  const [loggingIn, setLoggingIn] = useState(true);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);

  return [
    loggingIn,
    setLoggingIn,
    nameRef,
    emailRef,
    passwordRef,
    passwordCheckRef,
    () => login(emailRef, passwordRef, router, apiDomain),
    () => signup(nameRef, emailRef, passwordRef, setLoggingIn, apiDomain),
  ];
}
