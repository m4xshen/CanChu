import { ProfileType } from '@/types';

interface Props {
  edit: boolean;
  introductionRef: React.RefObject<HTMLTextAreaElement>;
  profile: ProfileType | undefined;
}

export default function Introduction({
  edit,
  introductionRef,
  profile,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg font-bold">自我介紹</div>
      {edit ? (
        <textarea
          ref={introductionRef}
          className="resize-none rounded-lg border border-[#BFBFBF] bg-[#F0F2F5] p-3"
          defaultValue={profile?.introduction ? profile.introduction : ''}
        />
      ) : (
        <p>{profile?.introduction ? profile.introduction : ''}</p>
      )}
    </div>
  );
}