import { useState } from 'react';
import { ErrorMessage, Field, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';

import useSignup from '@/hooks/useSignup';
import { AccountState } from '@/types';

interface Props {
  setAccountState: React.Dispatch<React.SetStateAction<AccountState>>;
  emailRef: React.RefObject<HTMLInputElement>;
}

export default function SignupForm({ setAccountState, emailRef }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(values: FormikValues) {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    const { data, error } = await useSignup(
      values.name.trim(),
      values.email.trim(),
      values.password,
    );

    const success = !error && data;
    if (success) {
      // go back to login page
      setAccountState(AccountState.LoggingIn);
      emailRef.current?.form?.reset();
    } else {
      alert(error?.message);
    }
    setIsLoading(false);
  }

  const buttonText = isLoading ? '註冊中...' : '註冊';

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        passwordCheck: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('必填'),
        email: Yup.string().email('Email格式錯誤').required('必填'),
        password: Yup.string()
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
            message: '密碼須包含大寫和小寫字母以及數字，且長度超過八個字符',
          })
          .required('必填'),
        passwordCheck: Yup.string()
          .oneOf([Yup.ref('password')], '密碼不一致')
          .required('必填'),
      })}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(formik) => (
        <form
          className="flex w-full flex-col items-center"
          onSubmit={formik.handleSubmit}
        >
          <label className="mt-8 flex w-4/5 max-w-xs flex-col gap-2">
            使用者名稱
            <Field
              name="name"
              type="text"
              placeholder="例: Chou Chou Hu"
              className="h-10 w-full rounded-md border border-[#5458F7] px-3 outline-none"
            />
            <div className="text-sm text-red-500">
              <ErrorMessage name="name" />
            </div>
          </label>
          <label className="mt-8 flex w-4/5 max-w-xs flex-col gap-2">
            電子郵件
            <Field
              name="email"
              type="text"
              placeholder="例: shirney@appworks.tw"
              className="h-10 w-full rounded-md border border-[#5458F7] px-3 outline-none"
            />
            <div className="text-sm text-red-500">
              <ErrorMessage name="email" />
            </div>
          </label>
          <label className="mt-8 flex w-4/5 max-w-xs flex-col gap-2">
            密碼
            <Field
              name="password"
              type="password"
              className="h-10 w-full rounded-md border border-[#5458F7] px-3 outline-none"
            />
            <div className="text-sm text-red-500">
              <ErrorMessage name="password" />
            </div>
          </label>
          <label className="mt-8 flex w-4/5 max-w-xs flex-col gap-2">
            再次輸入密碼
            <Field
              name="passwordCheck"
              type="password"
              className="h-10 w-full rounded-md border border-[#5458F7] px-3 outline-none"
            />
            <div className="text-sm text-red-500">
              <ErrorMessage name="passwordCheck" />
            </div>
          </label>
          <button
            type="submit"
            className={`mt-6 h-10 w-36 rounded-md bg-[#7763FB] text-white ${
              isLoading && 'cursor-wait brightness-75'
            }`}
          >
            {buttonText}
          </button>
        </form>
      )}
    </Formik>
  );
}
