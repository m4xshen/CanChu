import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import PostCreator from '@/components/postCreator';
import Feed from '@/components/feed';
import Footer from '@/components/footer';

function Home({ apiDomain }: { apiDomain: string }) {
  const router = useRouter();
  const [postIds, setPostIds] = useState<number[]>([]);

  useEffect(() => {
    if (getCookie('access_token') === undefined) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-6 flex justify-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <Sidebar />
          <Footer />
        </div>
        <div className="flex flex-col items-center gap-5 pb-5">
          <PostCreator
            apiDomain={apiDomain}
            postIds={postIds}
            setPostIds={setPostIds}
          />
          <Feed
            apiDomain={apiDomain}
            postIds={postIds}
          />
        </div>
      </div>
    </>
  );
}

export default Home;

export async function getServerSideProps() {
  return {
    props: {
      apiDomain: process.env.API_DOMAIN || '',
    },
  };
}
