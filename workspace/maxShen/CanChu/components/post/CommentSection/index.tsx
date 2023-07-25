import Link from 'next/link';
import { KeyedMutator } from 'swr';
import Comment from './Comment';
import CommentBar from './CommentBar';
import { CommentType } from '@/types';

interface Props {
  comments: CommentType[];
  postId: number;
  detail: boolean;
  url: string;
  mutate: KeyedMutator<any>;
}

function CommentSection({ comments, postId, detail, url, mutate }: Props) {
  const content = (
    <>
      {detail &&
        comments &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      <CommentBar postId={postId} detail={detail} mutate={mutate} />
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
