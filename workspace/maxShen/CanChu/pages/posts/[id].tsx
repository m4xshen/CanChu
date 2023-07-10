import Navbar from '@/components/navbar';
import Post from '@/components/post';

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

const posts = [
  {
    "user_id": 1,
    "name": "大原所長",
    "picture": "https://i.imgur.com/rVRCiZC.png",
    "id": 55,
    "context": "兩津！你這個大笨蛋！！！",
    "created_at": "2023-06-17 12:44:21",
    "like_count": 0,
    "comment_count": 0,
    "is_like": 0
  },
  {
    "user_id": 14,
    "name": "Joseph Joestar",
    "picture": "https://i.imgur.com/JSZhpVj.jpg",
    "id": 66,
    "context": "Oh my god!",
    "created_at": "2023-06-13 16:32:40",
    "like_count": 1,
    "comment_count": 1,
    "is_like": 1
  },
  {
    "user_id": 14,
    "name": "Makima",
    "picture": "https://i.imgur.com/mnlDuoX.png",
    "id": 64,
    "context": "你現在是我的寵物\n你只能說「是」或是「汪」",
    "created_at": "2023-05-24 17:30:25",
    "like_count": 0,
    "comment_count": 1,
    "is_like": 0
  },
];


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
