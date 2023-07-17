import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

import Navbar from '@/components/navbar';
import Post from '@/components/post';
import { PostType } from '@/types';

export default function DetailPage({ post }: { post: PostType }) {
  return (
    <>
      <Navbar apiDomain="" />
      <div className="mt-6" />
      <Post key={post.id} post={post} detail edit={false} apiDomain="" />
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const accessToken = nookies.get(ctx).access_token;
  if (accessToken === undefined) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const res = await fetch(`${process.env.API_DOMAIN}/posts/search`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
    }),
  });
  const data = await res.json();
  const post = data.data.posts.find(
    (p: PostType) => p.id.toString() === ctx?.params?.id,
  );

  return {
    props: {
      post,
    },
  };
}
