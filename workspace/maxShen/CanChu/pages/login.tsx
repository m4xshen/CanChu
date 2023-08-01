import { Pattaya } from 'next/font/google';
import { GetServerSidePropsContext } from 'next';
import { useRef, useState } from 'react';
import nookies from 'nookies';

import Footer from '@/components/footer';
import Form from '@/components/loginSignup/Form';
import { AccountState } from '@/types';
import Prompts from '@/components/loginSignup/Prompts';

const pattaya = Pattaya({
  weight: '400',
  subsets: ['cyrillic'],
});

export default function LoginSignupPage() {
  const [accountState, setAccountState] = useState(AccountState.LoggingIn);
  const emailRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="mx-auto flex h-screen w-[95%] max-w-3xl
        flex-col items-center justify-center lg:gap-3"
    >
      <div
        className="flex w-full overflow-hidden
          rounded-3xl border border-[#0000001A] bg-white"
      >
        <div
          className={`w-full lg:w-2/3 ${
            accountState === AccountState.LoggingIn ? 'pb-28' : 'pb-11'
          } flex flex-col items-center`}
        >
          <div
            className="mt-10 flex h-[20%] w-full flex-wrap items-center justify-center
              gap-3 px-3 lg:w-min"
          >
            <h1
              className={`text-[#7763FB] text-5xl sm:text-6xl text-center ${pattaya.className}`}
            >
              CanChu
            </h1>
            <div className="text-center text-3xl font-extralight sm:text-4xl">
              {accountState === AccountState.LoggingIn
                ? '會員登入'
                : '會員註冊'}
            </div>
          </div>
          <Form
            accountState={accountState}
            setAccountState={setAccountState}
            emailRef={emailRef}
          />
          <Prompts
            accountState={accountState}
            setAccountState={setAccountState}
            emailRef={emailRef}
          />
        </div>
        <div className="h-full w-0 bg-[#7763FB] lg:w-1/3" />
      </div>
      <div className="mx-2 self-end">
        <Footer />
      </div>
    </div>
  );
}

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
    props: {},
  };
}
