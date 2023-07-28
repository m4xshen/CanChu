import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { PostType } from '@/types';

export default function useLike(
  post: PostType,
): [isLiked: boolean, likeCount: number, toggleLike: () => void] {
  const [isLiked, setIsLiked] = useState(post.is_liked ?? false);
  const [likeCount, setLikeCount] = useState(post.like_count ?? 0);

  useEffect(() => {
    setIsLiked(post.is_liked ?? false);
    setLikeCount(post.like_count ?? 0);
  }, [post]);

  function toggleLike() {
    const method = isLiked ? 'DELETE' : 'POST';
    const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
    fetch(`${apiDomain}/posts/${post.id}/like`, {
      method,
      headers: {
        Authorization: `Bearer ${getCookie('access_token')}`,
      },
    });

    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  }

  return [isLiked, likeCount, toggleLike];
}
