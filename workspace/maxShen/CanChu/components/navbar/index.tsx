import Link from 'next/link';
import Image from 'next/image';
import { Pattaya } from 'next/font/google';
import { useState } from 'react';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const pattaya = Pattaya({
  weight: '400',
  subsets: ['cyrillic'],
});

function Navbar() {
  const [display, setDisplay] = useState(false);
  const router = useRouter();

  return (
    <div className="flex h-24 items-center border-b border-[#d9d9d9] bg-white">
      <Link href="/">
        <h1 className={`text-[#7763FB] text-4xl ml-36 ${pattaya.className}`}>
          CanChu
        </h1>
      </Link>
      <div
        className="ml-6 flex h-12 w-80 items-center rounded-lg
          border border-[#d9d9d9] bg-[#f0f2f5] px-4"
      >
        <Image src="/search.png" width={17} height={17} alt="search icon" />
        <input
          type="text"
          placeholder="搜尋"
          className="ml-2 w-full bg-[#f0f2f5] text-[#566470] outline-0"
        />
      </div>
      <div
        className="relative ml-auto mr-36"
        onMouseLeave={() => setDisplay(false)}
      >
        <Link href="/user/demo" onMouseEnter={() => setDisplay(true)}>
          <Image src="/avatar.png" width={36} height={36} alt="user avatar" />
        </Link>
        {display && (
          <div className="absolute right-0 top-9 z-10">
            <div className="h-10 bg-transparent" />
            <nav
              className="flex w-64 flex-col overflow-hidden
                  rounded-2xl border border-[#0000001A] bg-[#f6f6f6] drop-shadow-lg"
            >
              <div className="flex h-16 items-center bg-[#5458F7] text-white">
                <div
                  className="ml-4 flex h-9
                    w-9 items-center justify-center rounded-full bg-white"
                >
                  <Image
                    src="/purpleAvatar.png"
                    width={29}
                    height={24}
                    alt="purple avatar"
                  />
                </div>
                <div className="ml-4 text-xl font-bold">你的名字</div>
              </div>
              <Link
                href="/user/demo"
                className="flex h-16 items-center pl-6 text-xl"
              >
                查看個人檔案
              </Link>
              <div className="w-60 self-center border-t border-[#D1CACE]" />
              <button
                type="button"
                className="flex h-16 items-center pl-6 text-xl"
                onClick={(() => {
                  deleteCookie('access_token');
                  router.push('/login');
                })}
              >
                登出
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
