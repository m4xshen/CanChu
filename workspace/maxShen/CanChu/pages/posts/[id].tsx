import Navbar from '@/components/navbar';
import Post from '@/components/post';
import posts from '@/data/post';

import { PostType } from '@/types';

const DetailPage = ({ post }: { post: PostType }) => (
  <>
    <Navbar />
    <Post
      key={post.id}
      post={post}
      detail={true}
    />
  </>
);

export default DetailPage;

export const getStaticPaths = async () => (
  {
    paths: posts.map(post => (
      {
        params: {
          id: post.id.toString()
        }
      }
    )),
    fallback: false
  }
);

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const post = posts.find(post => post.id.toString() === params.id);
  return {
    props: {
      post
    }
  };
};
