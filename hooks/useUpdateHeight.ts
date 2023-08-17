import { useEffect } from 'react';

export default function useUpdateHeight(
  ref: React.RefObject<HTMLTextAreaElement>,
  edit: boolean,
) {
  function updateHeight() {
    if (ref.current) {
      ref.current.style.height = '';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }

  useEffect(() => {
    updateHeight();
  }, [edit]);

  return updateHeight;
}
