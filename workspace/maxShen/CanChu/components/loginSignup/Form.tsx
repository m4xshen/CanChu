import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import { useRef } from 'react';

import useSignup from '@/hooks/useSignup';
import useLogIn from '@/hooks/useLogIn';
import { AccountState } from '@/types';
import Input from './Input';

interface Props {
  accountState: AccountState;
  setAccountState: React.Dispatch<React.SetStateAction<AccountState>>;
  emailRef: React.RefObject<HTMLInputElement>;
}

export default function Form({
  accountState,
  setAccountState,
  emailRef,
}: Props) {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);

  async function handleLogIn() {
    const { error, data } = await useLogIn(
      emailRef.current?.value.trim(),
      passwordRef.current?.value.trim(),
    );

    const success = !error && data;
    if (success) {
      setCookie('access_token', data.data.access_token, { maxAge: 3600 });
      setCookie('user_id', data.data.user.id, { maxAge: 3600 });
      router.push('/');
    } else {
      alert(error?.message);
    }
  }

  async function handleSignup() {
    const { data, error } = await useSignup(
      nameRef.current?.value.trim(),
      emailRef.current?.value.trim(),
      passwordRef.current?.value.trim(),
      passwordCheckRef.current?.value.trim(),
    );

    const success = !error && data;
    if (success) {
      // go back to login page
      setAccountState(AccountState.LoggingIn);
      emailRef.current?.form?.reset();
    } else {
      alert(error?.message);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (accountState === AccountState.LoggingIn) {
      handleLogIn();
    } else {
      handleSignup();
    }
  }

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={(e) => handleSubmit(e)}
    >
      {accountState === AccountState.SigningUp && (
        <Input
          ref={nameRef}
          label="使用者名稱"
          type="text"
          placeholder="例: Chou Chou Hu"
        />
      )}
      <Input
        ref={emailRef}
        label="電子郵件"
        type="text"
        placeholder="例: shirney@appworks.tw"
      />
      <Input ref={passwordRef} label="密碼" type="password" />
      {accountState === AccountState.SigningUp && (
        <Input ref={passwordCheckRef} label="再次輸入密碼" type="password" />
      )}
      <button
        type="submit"
        className="mt-6 h-10 w-36 rounded-md bg-[#7763FB] text-white"
      >
        {accountState === AccountState.LoggingIn ? '登入' : '註冊'}
      </button>
    </form>
  );
}
