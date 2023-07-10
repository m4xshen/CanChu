import { getDisplayTime } from '@/utils';
import CommentIcon from '../icons/CommentIcon';
import HeartIcon from '../icons/HeartIcon';
import Image from 'next/image';
import Link from 'next/link';

interface Post {
  user_id: number;
  name: string;
  picture: string;
  id: number;
  context: string;
  created_at: string | null;
  like_count: number;
  comment_count: number;
  is_like: number;
};

interface Props {
  post: Post;
  url: string;
  detail: boolean;
}

const Content: React.FC<Props> = ({ post, url, detail }) => {
  return (
    <div className="pt-7">
      <div className="w-full flex gap-3 items-center">
        <div className="rounded-full w-20 h-20 ml-7 overflow-hidden relative shrink-0">
          <Image
            src={post.picture}
            fill={true}
            alt="user avatar"
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-lg font-bold cursor-pointer">{post.name}</div>
          <Link
            href={url}
            className={`text-sm font-normal text-[#909090] ${detail && 'pointer-events-none'}`}
          >
            {getDisplayTime(post.created_at)}
          </Link>
        </div>
      </div>
      <pre
        className={`whitespace-pre-wrap leading-6 text-lg
          my-4 mx-7 min-h-[83px]`}
      >
        {post.context}
      </pre>
      <div
        className="flex items-center h-14 mx-9 gap-2
          border-t border-[#B7B7B7] border-b"
      >
        <Link href={url} className={`ml-2 ${detail && 'pointer-events-none'}`}>
          {post.is_like ?
            <Image
              src="/heart.png"
              width={28}
              height={28}
              alt="heart icon"
            /> :
            <HeartIcon />
          }
        </Link>
        <Link href={url} className={`${detail && 'pointer-events-none'}`}>
          <CommentIcon />
        </Link>
      </div>
      <div
        className="h-12 mx-9 flex items-center justify-between
          text-base font-normal text-[#5c5c5c]"
      >
        <Link href={url} className={`${detail && 'pointer-events-none'}`}>
          {post.like_count} 人喜歡這則貼文
        </Link>
        <Link href={url} className={`mr-2 ${detail && 'pointer-events-none'}`}>
          {post.comment_count} 則留言
        </Link>
      </div>
    </div>
  );
};

export default Content;
