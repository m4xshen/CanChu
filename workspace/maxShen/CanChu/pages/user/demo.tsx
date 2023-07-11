import Feed from '@/components/feed';
import Navbar from '@/components/navbar';
import PostCreator from '@/components/postCreator';
import Footer from '@/components/footer';
import Profilebar from '@/components/profilebar';

function Demo() {
  return (
    <>
      <Navbar />
      <Profilebar />
      <div className="flex justify-center gap-8">
        <div className="flex flex-col gap-3 items-center">
          <Footer />
        </div>
        <div className="flex flex-col gap-5 items-center pb-5">
          <PostCreator />
          <Feed />
        </div>
      </div>
    </>
  );
}

export default Demo;
