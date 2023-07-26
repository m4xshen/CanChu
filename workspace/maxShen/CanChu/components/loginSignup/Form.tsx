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

  const logIn = useLogIn();
  const signup = useSignup();

  async function handleLogIn() {
    if (!emailRef?.current?.value || !passwordRef?.current?.value) {
      return;
    }

    const res = await logIn(emailRef.current.value, passwordRef.current.value);

    if (res.ok) {
      const data = await res.json();
      setCookie('access_token', data.data.access_token, { maxAge: 3600 });
      setCookie('user_id', data.data.user.id, { maxAge: 3600 });
      router.push('/');
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
      setAccountState(AccountState.LoggingIn);
      emailRef.current?.form?.reset();
    } else if (res.status === 403) {
      alert('email已經使用過');
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (accountState === AccountState.LoggingIn) {
      handleLogIn();
    } else if (passwordRef.current?.value !== passwordCheckRef.current?.value) {
      alert('密碼不一致');
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
        type="email"
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
