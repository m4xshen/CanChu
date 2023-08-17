import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import useUpdateHeight from '@/hooks/useUpdateHeight';
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
  const updateHeight = useUpdateHeight(introductionRef, edit);

  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg font-bold">自我介紹</div>
      {edit ? (
        <textarea
          ref={introductionRef}
          className="resize-none overflow-hidden rounded-lg
            border border-[#BFBFBF] bg-[#F0F2F5] p-3 outline-none"
          onChange={updateHeight}
          defaultValue={profile?.introduction ? profile.introduction : ''}
        />
      ) : (
        <ReactMarkdown className="markdown-editor">
          {profile?.introduction ?? ''}
        </ReactMarkdown>
      )}
    </div>
  );
}
