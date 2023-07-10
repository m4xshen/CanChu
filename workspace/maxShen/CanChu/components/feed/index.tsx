import Post from '@/components/post';
import LoadingIcon from '../icons/LoadingIcon';

const Feed = () => {
  return (
    <>
      <Post detail={false}/>
      <Post detail={false}/>
      <Post detail={false}/>
      <LoadingIcon />
    </>
  );
};

export default Feed;
