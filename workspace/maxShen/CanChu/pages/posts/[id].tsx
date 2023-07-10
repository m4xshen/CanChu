import Navbar from '@/components/navbar';
import Post from '@/components/post';
import posts from '@/data/post';

interface PostObject {
  user_id: number;
  name: string;
  picture: string;
  id: number;
  context: string;
  created_at: string;
  like_count: number;
  comment_count: number;
  is_like: number;
};

const DetailPage = ({ post }: { post: PostObject }) => {
  return (
    <>
      <Navbar />
      <Post
        key={post.id}
        post={post}
        detail={true}
      />
    </>
  );
};

export default DetailPage;

export const getStaticPaths = async () => {
  return {
    paths: posts.map(post => (
      {
        params: {
          id: post.id.toString()
        }
      }
    )),
    fallback: false
  };
};

interface Params {
  id: string;
};

export const getStaticProps = async ({ params }: { params: Params }) => {
  const post = posts.find(post => post.id.toString() === params.id);
  return {
    props: {
      post
    }
  };
};
