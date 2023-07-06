import styles from './styles.module.scss';

const Post = () => {
  return (
    <div className={styles.feed}>
      <div className={styles.content}>
        <div className={styles["feed-top"]}>
          <div className={`${styles.avatar} ${styles.gray}`}></div>
          <div className={styles.info}>
            <div className={styles.name}>你的朋友</div>
            <div className={styles.time}>一小時前</div>
          </div>
        </div>
        <article className={styles.text}>
          動態動態動態動態動態動態，動態動態動態動態。
        </article>
        <div className={styles.viewers}>
          <div className={`${styles.avatar} ${styles.viewer} ${styles.red}`}></div>
          <div className={`${styles.avatar} ${styles.viewer} ${styles.gray}`}></div>
        </div>
        <div className={styles["viewers-info"]}>
          <div className={styles["likes-count"]}>
            7 人喜歡這則貼文
          </div>
          <div className={styles["comments-count"]}>
            1 則留言
          </div>
        </div>
      </div>
      <div className={styles.comment}>
        <img className={styles["comment-avatar"]} src="avatar.png" />
        <button className={styles["comment-button"]}>
          留個言吧
        </button>
      </div>
    </div>
  );
};

export default Post;
