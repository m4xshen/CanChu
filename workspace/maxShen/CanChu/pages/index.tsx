import { NextPageContext } from 'next';
import nookies from 'nookies';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/router';

import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import Feed from '@/components/feed';
import Footer from '@/components/footer';
import useProfile from '@/hooks/useProfile';
import usePosts from '@/hooks/usePosts';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useRelation from '@/hooks/useRelation';

interface Props {
  userId: number;
}

function Home({ userId }: Props) {
  const profile = useProfile(userId);
  const relation = useRelation(userId, profile);
  const router = useRouter();

  const { mutate, isLoading, isEnd, size, setSize, posts } = usePosts(null);
  useInfiniteScroll(async () => setSize(size + 1), 500);

  return (
    <SWRConfig
      value={{
        onError: () => {
          router.reload();
        },
      }}
    >
      <Navbar userId={userId} />
      <div className="mt-6 flex justify-center gap-8">
        <div className="hidden flex-col items-center gap-3 xl:flex">
          <Sidebar userId={userId} />
          <div className="w-64">
            <Footer />
          </div>
        </div>
        <Feed
          posts={posts}
          isLoading={isLoading}
          isEnd={isEnd}
          mutate={mutate}
          userId={userId}
          relation={relation}
        />
      </div>
    </SWRConfig>
  );
}

export default Home;

export async function getServerSideProps(ctx: NextPageContext) {
  if (nookies.get(ctx).access_token === undefined) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const userId = parseInt(nookies.get(ctx).user_id, 10);

  return {
    props: {
      userId,
    },
  };
}
