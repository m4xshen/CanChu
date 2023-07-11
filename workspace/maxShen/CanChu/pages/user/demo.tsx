import Navbar from '@/components/navbar';
import PostCreator from '@/components/postCreator';
import Footer from '@/components/footer';
import Profilebar from '@/components/profilebar';
import ProfileEditor from '@/components/profileEditor';
import profile from '@/data/profile';
import Post from '@/components/post';
import LoadingIcon from '@/components/icons/LoadingIcon';

const post = {
  user_id: 1,
  name: profile.name,
  picture: profile.picture,
  id: 55,
  context: '動態動態動態動態動態動態，動態動態動態動態。',
  created_at: '2023-06-17 12:44:21',
  like_count: 0,
  comment_count: 68,
  is_like: 0,
};

function Demo() {
  return (
    <>
      <Navbar />
      <Profilebar />
      <div className="flex justify-center gap-8">
        <div className="flex flex-col gap-3 items-center">
          <ProfileEditor />
          <Footer />
        </div>
        <div className="flex flex-col gap-5 items-center pb-5">
          <PostCreator />
          <Post post={post} detail={false} edit />
          <Post post={post} detail={false} edit />
          <Post post={post} detail={false} edit />
          <LoadingIcon />
        </div>
      </div>
    </>
  );
}

export default Demo;
