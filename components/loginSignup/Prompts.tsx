import { AccountState } from '@/types';

interface Props {
  accountState: AccountState;
  setAccountState: React.Dispatch<React.SetStateAction<AccountState>>;
  emailRef: React.RefObject<HTMLInputElement>;
}

export default function Prompts({
  accountState,
  setAccountState,
  emailRef,
}: Props) {
  return (
    <div className="mt-2">
      {accountState === AccountState.LoggingIn
        ? '尚未成為會員？'
        : '已經是會員了? '}
      <button
        type="button"
        className="text-[#5458F7]"
        onClick={() => {
          if (accountState === AccountState.SigningUp) {
            setAccountState(AccountState.LoggingIn);
          } else {
            setAccountState(AccountState.SigningUp);
          }
          emailRef.current?.form?.reset();
        }}
      >
        {accountState === AccountState.LoggingIn ? '會員註冊 ' : '會員登入'}
      </button>
    </div>
  );
}
