import nookies from 'nookies';
import { NextPageContext } from 'next';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import Feed from '@/components/feed';
import Footer from '@/components/footer';

function Home() {
  return (
    <>
      <Navbar />
      <div className="mt-6 flex justify-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <Sidebar />
          <div className="w-64">
            <Footer />
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 pb-5">
          <Feed userId={null} edit={false} />
        </div>
      </div>
    </>
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

  return {
    props: {},
  };
}
