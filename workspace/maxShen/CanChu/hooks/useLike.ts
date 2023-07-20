import { useState } from 'react';
import { getCookie } from 'cookies-next';
import { PostType } from '@/types';

export default function useLike(
  post: PostType,
): [isLiked: boolean, likeCount: number, toggleLike: () => void] {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const [isLiked, setIsLiked] = useState(post.is_liked ?? false);
  const [likeCount, setLikeCount] = useState(post.like_count ?? 0);
  const [time, setTime] = useState(0);

  function toggleLike() {
    // throttling
    if (new Date().getSeconds() - time < 1) {
      return;
    }
    setTime(new Date().getSeconds());

    const method = isLiked ? 'DELETE' : 'POST';
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
