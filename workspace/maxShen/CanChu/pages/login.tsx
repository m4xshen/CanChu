import { Pattaya } from 'next/font/google';
import { useState } from 'react';

const pattaya = Pattaya({
  weight: '400',
  subsets: ['cyrillic'],
});

function Login() {
  const [login, setLogin] = useState(true);

  return (
    <div className="w-max h-screen mx-auto flex flex-col gap-3 items-center justify-center">
      <div className="w-[56rem] flex rounded-3xl border border-[#0000001A] bg-white overflow-hidden">
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
          <form className="flex flex-col items-center">
            {!login && (
              <label className="flex flex-col gap-2 mt-8">
                使用者名稱
                <input
                  className="w-80 h-10 px-3 border border-[#5458F7] rounded-md"
                  placeholder="例: Chou Chou Hu"
                  type="text"
                  name="username"
                  required
                />
              </label>
            )}
            <label className="flex flex-col gap-2 mt-8">
              電子郵件
              <input
                className="w-80 h-10 px-3 border border-[#5458F7] rounded-md"
                placeholder="例: shirney@appworks.tw"
                type="email"
                name="email"
                required
              />
            </label>
            <label className="flex flex-col gap-2 mt-8">
              密碼
              <input
                className="w-80 h-10 px-3 border border-[#5458F7] rounded-md"
                type="password"
                name="password"
                required
              />
            </label>
            {!login && (
              <label className="flex flex-col gap-2 mt-8">
                再次輸入密碼
                <input
                  className="w-80 h-10 px-3 border border-[#5458F7] rounded-md"
                  type="password"
                  name="password-check"
                  required
                />
              </label>
            )}
            <button
              type="submit"
              className="w-36 h-10 mt-6 bg-[#7763FB] text-white rounded-md"
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
        <div className="w-1/3 h-full bg-[#7763FB]" />
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