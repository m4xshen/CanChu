import { useEffect, useState } from 'react';

export default function useInfiniteScroll(
  callback: () => any,
  distance: number,
) {
  const [isNearToBottom, setIsBottom] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + Math.round(window.scrollY) >=
        document.body.offsetHeight - distance
      ) {
        setIsBottom(true);
      }
    }

    window.addEventListener('scroll', handleScroll);

    if (isNearToBottom) {
      (async () => {
        await callback();
        setIsBottom(false);
      })();
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isNearToBottom]);
}
