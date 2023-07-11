import Image from 'next/image';
import Link from 'next/link';
import SendIcon from '../icons/SendIcon';
import Comment from './Comment';
import { CommentType } from '@/types';

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
      <div className="flex gap-4 items-center mt-3 mb-5">
        <Image
          src="/avatar.png"
          width={50}
          height={50}
          alt="user avatar"
          className="ml-10"
        />
        <div
          className="w-full h-12 mr-12 pl-6 pr-3 rounded-lg
          flex justify-between items-center text-xl leading-10
          font-normal text-[#777777] bg-[#f0f2f5] border border-[#d9d9d9]"
        >
          <input
            type="text"
            placeholder="留個言吧"
            className="w-full h-6 pr-2 bg-[#f0f2f5] text-[#777777] text-xl outline-0 pointer-events-auto"
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
