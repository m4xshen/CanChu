/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function CanChu({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CanChu</title>
      </Head>
      <Component {...pageProps} />;
    </>
  );
}
