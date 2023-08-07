import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import { useState } from 'react';
import { Field, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import useLogIn from '@/hooks/useLogIn';

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(values: FormikValues) {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    const { error, data } = await useLogIn(
      values.email.trim(),
      values.password.trim(),
    );
    const success = !error && data;
    if (success) {
      setCookie('access_token', data.data.access_token, { maxAge: 3600 });
      setCookie('user_id', data.data.user.id, { maxAge: 3600 });
      router.push('/');
    } else {
      alert(error?.message);
      setIsLoading(false);
    }
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Email格式錯誤').required('必填'),
        password: Yup.string().required('必填'),
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
            電子郵件
            <Field
              name="email"
              type="text"
              placeholder="例: shirney@appworks.tw"
              className="h-10 w-full rounded-md border border-[#5458F7] px-3 outline-none"
            />
            <div className="text-sm text-red-500">
              {formik.touched.email && formik.errors.email}
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
              {formik.touched.password && formik.errors.password}
            </div>
          </label>
          <button
            type="submit"
            className={`mt-6 h-10 w-36 rounded-md bg-[#7763FB] text-white ${
              isLoading && 'cursor-wait brightness-75'
            }`}
          >
            {isLoading ? '登入中...' : '登入'}
          </button>
        </form>
      )}
    </Formik>
  );
}
