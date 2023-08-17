import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { SWRConfig } from 'swr';
import Skeleton from 'react-loading-skeleton';

import Navbar from '@/components/navbar';
import Post from '@/components/post';
import usePost from '@/hooks/usePost';

interface Props {
  id: string;
  userId: number;
}

export default function DetailPage({ id, userId }: Props) {
  const router = useRouter();
  const { post, isLoading } = usePost(parseInt(id, 10));

  return (
    <SWRConfig
      value={{
        onError: () => {
          router.reload();
        },
      }}
    >
      <Navbar userId={userId} />
      <div className="mx-3 my-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-[48em]">
          {isLoading ? (
            <Skeleton
              duration={0.8}
              height={300}
              borderRadius={16}
              containerClassName="w-full"
            />
          ) : (
            <Post
              key={post.id}
              post={post}
              detail
              editable={post.user_id === userId}
              userId={userId}
            />
          )}
        </div>
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

  const userId = parseInt(nookies.get(ctx).user_id, 10);
  return {
    props: {
      id: ctx.params.id,
      userId,
    },
  };
}
