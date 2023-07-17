'use client';

import { getCookie } from 'cookies-next';
import { Pattaya } from 'next/font/google';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useEntry from '@/hooks/useEntry';

const pattaya = Pattaya({
  weight: '400',
  subsets: ['cyrillic'],
});

interface Props {
  apiDomain: string;
}

function LoginSignupPage({ apiDomain }: Props) {
  const router = useRouter();
  const [
    loggingIn,
    setLoggingIn,
    nameRef,
    emailRef,
    passwordRef,
    passwordCheckRef,
    login,
    signup,
  ] = useEntry(router, apiDomain);

  useEffect(() => {
    if (getCookie('access_token')) {
      router.push('/');
    }
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loggingIn) {
      login();
    } else if (passwordRef.current?.value !== passwordCheckRef.current?.value) {
      alert('密碼不一致');
    } else {
      signup();
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

export async function getServerSideProps() {
  return {
    props: {
      apiDomain: process.env.API_DOMAIN || '',
    },
  };
}
