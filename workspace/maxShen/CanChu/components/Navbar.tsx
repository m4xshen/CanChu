import Link from 'next/link';
import Image from 'next/image';
import { Pattaya } from 'next/font/google';

const pattaya = Pattaya({
  weight: '400',
  subsets: ['cyrillic']
});

const Navbar = () => {
  return (
    <div className="h-[100px] bg-white flex items-center border-b border-[#d9d9d9] mb-[56px]">
      <Link href="/">
        <h1 className={`text-[#7763FB] text-[37px] ml-[147px] ${pattaya.className}`}>
          CanChu
        </h1>
      </Link>
      <div
        className="w-[330px] h-[48px] ml-[23px] px-[18px] flex items-center
        bg-[#f0f2f5] rounded-[10px] border border-[#d9d9d9]"
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
          className="ml-[7px] w-full bg-[#f0f2f5] text-[#566470] outline-0"
        />
      </div>
      <Link href="/" className="ml-auto mr-[141px]">
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
