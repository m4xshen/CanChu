'use client';

import { Pattaya } from 'next/font/google';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { useRef, useState } from 'react';
import { setCookie } from 'cookies-next';
import nookies from 'nookies';

import useSignup from '@/hooks/useSignup';
import useLogin from '@/hooks/useLogin';

const pattaya = Pattaya({
  weight: '400',
  subsets: ['cyrillic'],
});

function LoginSignupPage({ apiDomain }: { apiDomain: string }) {
  const router = useRouter();

  const [loggingIn, setLoggingIn] = useState(true);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);

  const login = useLogin(apiDomain);
  const signup = useSignup(apiDomain);

  async function handleLogin() {
    if (!emailRef?.current?.value || !passwordRef?.current?.value) {
      return;
    }

    const res = await login(emailRef.current.value, passwordRef.current.value);

    if (res.ok) {
      const data = await res.json();
      setCookie('access_token', data.data.access_token);
      setCookie('user', data.data.user);
      router.reload();
    } else if (res.status === 403) {
      alert('電子郵件或密碼錯誤');
    }
  }

  async function handleSignup() {
    if (
      !nameRef?.current?.value ||
      !emailRef?.current?.value ||
      !passwordRef?.current?.value
    ) {
      return;
    }

    const res = await signup(
      nameRef?.current?.value,
      emailRef?.current?.value,
      passwordRef?.current?.value,
    );

    if (res.ok) {
      // go back to login page
      setLoggingIn(true);
      emailRef.current?.form?.reset();
    } else if (res.status === 403) {
      alert('email已經使用過');
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loggingIn) {
      handleLogin();
    } else if (passwordRef.current?.value !== passwordCheckRef.current?.value) {
      alert('密碼不一致');
    } else {
      handleSignup();
    }
  }

  return (
    <div className="mx-auto flex h-screen w-max flex-col items-center justify-center gap-3">
      <div className="flex w-[56rem] overflow-hidden rounded-3xl border border-[#0000001A] bg-white">
        <div
          className={`w-2/3 ${
            loggingIn ? 'pb-28' : 'pb-11'
          } flex flex-col items-center`}
        >
          <h1 className={`mt-20 text-[#7763FB] text-6xl ${pattaya.className}`}>
            CanChu
          </h1>
          <div className="mt-10 text-4xl font-extralight">
            {loggingIn ? '會員登入' : '會員註冊'}
          </div>
          <form
            className="flex flex-col items-center"
            onSubmit={(e) => handleSubmit(e)}
          >
            {!loggingIn && (
              <label className="mt-8 flex flex-col gap-2">
                使用者名稱
                <input
                  ref={nameRef}
                  className="h-10 w-80 rounded-md border border-[#5458F7] px-3"
                  placeholder="例: Chou Chou Hu"
                  type="text"
                  name="name"
                  required
                />
              </label>
            )}
            <label className="mt-8 flex flex-col gap-2">
              電子郵件
              <input
                ref={emailRef}
                className="h-10 w-80 rounded-md border border-[#5458F7] px-3"
                placeholder="例: shirney@appworks.tw"
                type="email"
                name="email"
                required
              />
            </label>
            <label className="mt-8 flex flex-col gap-2">
              密碼
              <input
                ref={passwordRef}
                className="h-10 w-80 rounded-md border border-[#5458F7] px-3"
                type="password"
                name="password"
                required
              />
            </label>
            {!loggingIn && (
              <label className="mt-8 flex flex-col gap-2">
                再次輸入密碼
                <input
                  ref={passwordCheckRef}
                  className="h-10 w-80 rounded-md border border-[#5458F7] px-3"
                  type="password"
                  name="password-check"
                  required
                />
              </label>
            )}
            <button
              type="submit"
              className="mt-6 h-10 w-36 rounded-md bg-[#7763FB] text-white"
            >
              {loggingIn ? '登入' : '註冊'}
            </button>
          </form>
          <div className="mt-2">
            {loggingIn ? '尚未成為會員？' : '已經是會員了? '}
            <button
              type="button"
              className="text-[#5458F7]"
              onClick={() => {
                setLoggingIn(!loggingIn);
                emailRef.current?.form?.reset();
              }}
            >
              {loggingIn ? '會員註冊 ' : '會員登入'}
            </button>
          </div>
        </div>
        <div className="h-full w-1/3 bg-[#7763FB]" />
      </div>
      <div className="self-end">
        <footer className="text-[#525252]">
          關於我們 · 隱私權條款 · Cookie 條款 · © 2023 CanChu, Inc.
        </footer>
      </div>
    </div>
  );
}

export default LoginSignupPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  if (nookies.get(ctx).access_token !== undefined) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      apiDomain: process.env.API_DOMAIN || '',
    },
  };
}
