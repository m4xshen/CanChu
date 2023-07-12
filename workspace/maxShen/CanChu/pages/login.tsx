'use client';

import { Pattaya } from 'next/font/google';
import { useRef, useState } from 'react';

const pattaya = Pattaya({
  weight: '400',
  subsets: ['cyrillic'],
});

interface Props {
  apiDomain: string;
}

function Login({ apiDomain }: Props) {
  const [login, setLogin] = useState(true);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mx-auto flex h-screen w-max flex-col items-center justify-center gap-3">
      <div className="flex w-[56rem] overflow-hidden rounded-3xl border border-[#0000001A] bg-white">
        <div
          className={`w-2/3 ${
            login ? 'pb-28' : 'pb-11'
          } flex flex-col items-center`}
        >
          <h1 className={`mt-20 text-[#7763FB] text-6xl ${pattaya.className}`}>
            CanChu
          </h1>
          <div className="mt-10 text-4xl font-extralight">
            {login ? '會員登入' : '會員註冊'}
          </div>
          <form
            className="flex flex-col items-center"
            onSubmit={(e) => {
              if (!login) {
                // sign up
                fetch(`${apiDomain}/users/signup`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name: nameRef.current?.value,
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value,
                  }),
                }).then(() => {
                  // go back to login page
                  setLogin(true);
                  if (emailRef.current) {
                    emailRef.current.value = '';
                  }
                  if (passwordRef.current) {
                    passwordRef.current.value = '';
                  }
                });
              }
              e.preventDefault();
            }}
          >
            {!login && (
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
            {!login && (
              <label className="mt-8 flex flex-col gap-2">
                再次輸入密碼
                <input
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
              {login ? '登入' : '註冊'}
            </button>
          </form>
          <div className="mt-2">
            {login ? '尚未成為會員？' : '已經是會員了? '}
            <button
              type="button"
              className="text-[#5458F7]"
              onClick={() => setLogin(!login)}
            >
              {login ? '會員註冊 ' : '會員登入'}
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

export default Login;

export async function getServerSideProps() {
  return {
    props: {
      apiDomain: process.env.API_DOMAIN || '',
    },
  };
}
