import Link from 'next/link';

import Comment from './Comment';
import { CommentType } from '@/types';
import CommentBar from './CommentBar';

interface Props {
  comments: CommentType[];
  postId: number;
  detail: boolean;
  url: string;
}

function CommentSection({ comments, postId, detail, url }: Props) {
  const content = (
    <>
      {detail &&
        comments &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      <CommentBar postId={postId} detail={detail} />
    </>
  );

  return (
    <div>
      {detail ? (
        <div className="border-t border-t-[#b7b7b7]">{content}</div>
      ) : (
        <Link href={url}>
          <div className="border-t border-t-[#b7b7b7]">{content}</div>
        </Link>
      )}
    </div>
  );
}

export default CommentSection;
