import Image from 'next/image';
import Link from 'next/link';
import SendIcon from '../icons/SendIcon';
import Comment from './Comment';
import { CommentType } from '@/types';
import profile from '@/data/profile';

interface Props {
  comments: CommentType[];
  detail: boolean;
  url: string;
}

function CommentSection({ comments, detail, url }: Props) {
  const content = (
    <>
      {detail &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      <div className="mb-5 mt-3 flex items-center gap-4">
        <div className="relative ml-10 h-[50px] w-[50px] shrink-0 overflow-hidden rounded-full">
          <Image
            src={profile.picture}
            fill
            alt="user avatar"
            className="object-cover"
          />
        </div>
        <div
          className="mr-12 flex h-12 w-full items-center justify-between
          rounded-lg border border-[#d9d9d9] bg-[#f0f2f5] pl-6
          pr-3 text-xl font-normal leading-10 text-[#777777]"
        >
          <input
            type="text"
            placeholder="留個言吧"
            className="pointer-events-auto h-6 w-full bg-[#f0f2f5] pr-2 text-xl text-[#777777] outline-0"
          />
          {detail && (
            <button type="button" className="pointer-events-auto">
              <SendIcon />
            </button>
          )}
        </div>
      </div>
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
