import Image from 'next/image';

function User({ picture, text }: { picture: string, text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full">
        <Image
          src={picture}
          fill
          alt="friend avatar"
          className="object-cover"
        />
      </div>
      <div className="text-lg font-bold leading-6">{text}</div>
    </div>
  );
}

export default User;
