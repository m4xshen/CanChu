import { ProfileType } from '@/types';
import useUpdateHeight from '@/hooks/useUpdateHeight';

interface Props {
  edit: boolean;
  tagsRef: React.RefObject<HTMLTextAreaElement>;
  profile: ProfileType | undefined;
}

export default function Interests({ edit, tagsRef, profile }: Props) {
  const updateHeight = useUpdateHeight(tagsRef, edit);

  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg font-bold">興趣</div>
      {edit ? (
        <textarea
          ref={tagsRef}
          className="resize-none rounded-lg overflow-hidden
            border border-[#BFBFBF] bg-[#F0F2F5] p-3 outline-none"
          onChange={updateHeight}
          defaultValue={profile?.tags ? profile.tags : ''}
        />
      ) : (
        <div className="flex flex-wrap gap-1">
          {profile?.tags !== '' &&
            profile?.tags?.split(',').map((tag) => (
              <div key={tag} className="rounded-xl border border-black px-3">
                {tag}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
