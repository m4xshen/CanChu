import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

import Navbar from '@/components/navbar';
import Post from '@/components/post';
import profile from '@/data/profile';

const post = {
  user_id: 1,
  name: profile.name,
  picture: profile.picture,
  id: 55,
  context: '動態動態動態動態動態動態，動態動態動態動態。',
  created_at: '2023-06-17 12:44:21',
  like_count: 0,
  comment_count: 68,
  is_like: 0,
};

function DetailPage() {
  const router = useRouter();

  useEffect(() => {
    if (getCookie('access_token') === undefined) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-6" />
      <Post post={post} detail edit={false} />
    </>
  );
}

export default DetailPage;
