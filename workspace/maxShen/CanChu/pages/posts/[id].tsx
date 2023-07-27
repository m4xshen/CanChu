import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { SWRConfig } from 'swr';

import Navbar from '@/components/navbar';
import Post from '@/components/post';
import usePost from '@/hooks/usePost';

export default function DetailPage({ id }: { id: number }) {
  const router = useRouter();
  const post = usePost(id);

  return (
    <SWRConfig
      value={{
        onError: () => {
          router.reload();
        },
      }}
    >
      <Navbar />
      <div className="my-6">
        {post && <Post key={post.id} post={post} detail editable={false} />}
      </div>
    </SWRConfig>
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

  if (!ctx?.params?.id) {
    return {
      props: {},
    };
  }

  return {
    props: {
      id: ctx.params.id,
    },
  };
}
