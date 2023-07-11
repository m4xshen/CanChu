import Navbar from '@/components/navbar';
import Post from '@/components/post';
import posts from '@/data/post';

import { PostType } from '@/types';

function DetailPage({ post }: { post: PostType }) {
  return (
    <>
      <Navbar />
      <div className="mt-6" />
      <Post key={post.id} post={post} detail />
    </>
  );
}

export default DetailPage;

export const getStaticPaths = async () => ({
  paths: posts.map((post) => ({
    params: {
      id: post.id.toString(),
    },
  })),
  fallback: false,
});

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const post = posts.find((p) => p.id.toString() === params.id);
  return {
    props: {
      post,
    },
  };
};
