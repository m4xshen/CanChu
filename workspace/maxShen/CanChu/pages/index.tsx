import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import PostCreator from '@/components/postCreator';
import Feed from '@/components/feed';
import Footer from '@/components/footer';

const Root = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center gap-8">
        <div className="flex flex-col gap-3 items-center">
          <Sidebar />
          <Footer />
        </div>
        <div className="flex flex-col gap-5 items-center pb-5">
          <PostCreator />
          <Feed />
        </div>
      </div>
    </>
  );
};

export default Root;
