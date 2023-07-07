import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Post from '@/components/post';
import Sidebar from '@/components/sidebar';

const Root = () => {
  return (
    <>
      <Navbar />
      <div className="mt-6 flex justify-center gap-8">
        <div className="flex flex-col gap-3 items-center">
          <Sidebar />
          <Footer />
        </div>
        <Post />
      </div>
    </>
  );
};

export default Root;
