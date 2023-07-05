const Post = () => {
  return (
    <div className="feed">
      <div className="content">
        <div className="feed-top">
          <div className="avatar"></div>
          <div className="info">
            <div className="name">你的朋友</div>
            <div className="time">一小時前</div>
          </div>
        </div>
        <p className="text">
          動態動態動態動態動態動態，動態動態動態動態。
        </p>
        <div className="viewers">
          <div className="avatar viewer red"></div>
          <div className="avatar viewer"></div>
        </div>
        <div className="viewers-info">
          <div className="likes-count">
            7 人喜歡這則貼文
          </div>
          <div className="comments-count">
            1 則留言
          </div>
        </div>
      </div>
      <div className="comment">
        <img src="avatar.png" />
        <button className="comment-button">
          留個言吧
        </button>
      </div>
    </div>
  );
};

export default Post;
