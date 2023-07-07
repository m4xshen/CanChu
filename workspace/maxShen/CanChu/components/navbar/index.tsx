import Link from 'next/link';
import Image from 'next/image';
import { Pattaya } from 'next/font/google';
import { useState } from 'react';

const pattaya = Pattaya({
  weight: '400',
  subsets: ['cyrillic']
});

const Navbar = () => {
  const [display, setDisplay] = useState(false);

  return (
    <div className="h-24 bg-white flex items-center border-b border-[#d9d9d9]">
      <Link href="/">
        <h1 className={`text-[#7763FB] text-4xl ml-36 ${pattaya.className}`}>
          CanChu
        </h1>
      </Link>
      <div
        className="w-80 h-12 ml-6 px-4 flex items-center
          bg-[#f0f2f5] rounded-lg border border-[#d9d9d9]"
      >
        <Image
          src="/search.png"
          width={17}
          height={17}
          alt="search icon"
        />
        <input
          type="text"
          placeholder="搜尋"
          className="ml-2 w-full bg-[#f0f2f5] text-[#566470] outline-0"
        />
      </div>
      <div
        className="ml-auto mr-36 relative"
        onMouseLeave={() => setDisplay(false)}
      >
        <Link
          href="/"
          onMouseEnter={() => setDisplay(true)}
        >
          <Image
            src="/avatar.png"
            width={36}
            height={36}
            alt="user avatar"
          />
        </Link>
        {
          display && 
            <div className="absolute right-0 top-9">
              <div className="h-10 bg-transparent" />
              <nav
                className="flex flex-col border border-[#0000001A]
                  w-64 rounded-2xl bg-[#f6f6f6] overflow-hidden drop-shadow-lg"
              >
                <div className="flex items-center h-16 bg-[#5458F7] text-white">
                  <div className="flex items-center justify-center
                    w-9 h-9 ml-4 bg-white rounded-full">
                    <Image
                      src="/purpleAvatar.png"
                      width={29}
                      height={24}
                      alt="purple avatar"
                    />
                  </div>
                  <div
                    className="text-xl ml-4 font-bold">
                    你的名字
                  </div>
                </div>
                <Link
                  href="/"
                  className="flex items-center h-16 pl-6 text-xl"
                >
                  查看個人檔案
                </Link>
                <div className="w-60 self-center border-t border-[#D1CACE]" />
                <button
                  className="flex items-center h-16 pl-6 text-xl"
                >
                  登出
                </button>
              </nav>
            </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
