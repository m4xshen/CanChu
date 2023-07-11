import * as React from 'react';

function User({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
        >
          <circle cx="21" cy="21" r="21" fill="#D9D9D9" />
        </svg>
      </div>
      <div className="text-lg font-bold leading-6">{text}</div>
    </div>
  );
}

export default User;
