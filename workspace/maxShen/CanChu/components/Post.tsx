import Navbar from './Navbar';
import Content from './Content';
import CommentSection from './CommentSection';

const Post = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-[769px] border border-[#d3d3d3] rounded-[20px] bg-white">
          <Content />
          <CommentSection />
        </div>
      </div>
    </>
  );
};

export default Post;
