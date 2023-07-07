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

const Post = () => {
  return (
    <div className="flex justify-center mb-14">
      <div className="w-[770px] border border-[#0000001A] rounded-2xl bg-white">
        <Content
          name={data.name}
          url={data.picture}
          created_at={data.created_at}
          context={data.context}
          is_liked={data.is_liked}
          like_count={data.like_count}
          comment_count={data.comment_count}
        />
        <CommentSection comments={data.comments} />
      </div>
    </div>
  );
};

export default Post;
