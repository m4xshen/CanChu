import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

import Navbar from '@/components/navbar';
import Post from '@/components/post';
import profile from '@/data/profile';
import { PostType } from '@/types';

const post: PostType = {
  user_id: 1,
  name: profile.name,
  picture: profile.picture,
  id: 55,
  context: '動態動態動態動態動態動態，動態動態動態動態。',
  created_at: '2023-06-17 12:44:21',
  like_count: 0,
  comment_count: 68,
  is_liked: false,
  comments: [],
  summary: '',
};

function DetailPage({ apiDomain }: { apiDomain: string }) {
  const router = useRouter();

  useEffect(() => {
    if (getCookie('access_token') === undefined) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <Navbar apiDomain={apiDomain} />
      <div className="mt-6" />
      <Post post={post} detail edit={false} apiDomain={apiDomain} />
    </>
  );
}

export default DetailPage;

export async function getServerSideProps() {
  return {
    props: {
      apiDomain: process.env.API_DOMAIN || '',
    },
  };
}
