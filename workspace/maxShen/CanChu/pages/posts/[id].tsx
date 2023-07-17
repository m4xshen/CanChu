import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

import Navbar from '@/components/navbar';
import Post from '@/components/post';
import posts from '@/data/post';

import { PostType } from '@/types';

export default function DetailPage({ post }: { post: PostType }) {
  const router = useRouter();

  useEffect(() => {
    if (getCookie('access_token') === undefined) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <Navbar apiDomain="" />
      <div className="mt-6" />
      <Post key={post.id} post={post} detail edit={false} apiDomain="" />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: posts.map((post) => ({
      params: {
        id: post.id.toString(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const post = posts.find((p) => p.id.toString() === params.id);
  return {
    props: {
      post,
    },
  };
}
