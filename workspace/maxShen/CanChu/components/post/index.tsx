import Content from './Content';
import CommentSection from './CommentSection';

const data = {
  "id": 1,
  "user_id": 1,
  "context": "欸，你們好\n我一個人住，我的房子還滿大的，歡迎你們來我家玩\n玩累了就直接睡覺，沒問題的。",
  "created_at": "2023-07-02 23:59:00",
  "name": "傑哥",
  "picture": "https://i.imgur.com/5NAGJfl.png",
  "is_liked": false,
  "like_count": 0,
  "comments": [
    {
      "id": 1,
      "content": "但是我拒絕。",
      "created_at": "2023-07-03 18:00:00",
      "user": {
        "id": 2,
        "name": "岸邊露伴",
        "picture": "https://i.imgur.com/Tma98BO.jpg"
      }
    },
    {
      "id": 2,
      "content": "要去是可以去，不要叫我坐下就是了。",
      "created_at": "2023-07-03 18:00:01",
      "user": {
        "id": 3,
        "name": "萊納",
        "picture": "https://i.imgur.com/DKLeJZN.jpg"
      }
    }
  ],
  "comment_count": 2
};

interface Post {
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

interface Props {
  post: Post;
  detail: boolean;
};

const Post: React.FC<Props> = ({ post, detail }) => {
  const url = `/posts/${post.id}`;

  return (
    <div className="flex justify-center">
      <div className="w-[48rem] border border-[#0000001A] rounded-2xl bg-white">
        <Content
          post={post}
          url={url}
        />
        <CommentSection
          comments={data.comments}
          detail={detail}
          url={url}
        />
      </div>
    </div>
  );
};

export default Post;
