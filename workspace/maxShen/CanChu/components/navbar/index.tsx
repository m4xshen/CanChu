import Link from 'next/link';
import Image from 'next/image';
import { Pattaya } from 'next/font/google';

const pattaya = Pattaya({
  weight: '400',
  subsets: ['cyrillic']
});

const Navbar = () => {
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
      <Link href="/" className="ml-auto mr-36">
        <Image
          src="/avatar.png"
          width={36}
          height={36}
          alt="user avatar"
        />
      </Link>
    </div>
  );
};

export default Navbar;
