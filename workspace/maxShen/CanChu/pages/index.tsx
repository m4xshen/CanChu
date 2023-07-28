import { NextPageContext } from 'next';
import nookies from 'nookies';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/router';

import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import Feed from '@/components/feed';
import Footer from '@/components/footer';
import useProfile from '@/hooks/useProfile';

interface Props {
  userId: number;
}

function Home({ userId }: Props) {
  const profile = useProfile(userId);
  const router = useRouter();

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
        <div className="flex flex-col items-center gap-3">
          <Sidebar userId={userId} />
          <div className="w-64">
            <Footer />
          </div>
        </div>
        <Feed profile={profile} userId={userId} />
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
