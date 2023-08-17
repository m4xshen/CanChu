import { useState } from 'react';

export default function useThrottle() {
  const [clickTime, setTime] = useState(0);

  return (callback: () => void) => {
    const currentTime = new Date().getSeconds();
    if (currentTime - clickTime < 1) {
      return;
    }
    setTime(new Date().getSeconds());

    callback();
  };
}
