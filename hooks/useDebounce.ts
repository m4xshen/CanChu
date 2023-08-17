export default function useDebounce() {
  let timeout: NodeJS.Timeout;
  return (callback: (...prarms: any) => void) => {
    clearTimeout(timeout);
    timeout = setTimeout((...params) => callback(...params), 500);
  };
}
