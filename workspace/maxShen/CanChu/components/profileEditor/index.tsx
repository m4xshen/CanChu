import { ProfileType } from '@/types';

function ProfileEditor({ user }: { user: ProfileType | undefined }) {
  return (
    <div className="w-96 rounded-2xl border border-[#0000001A] bg-white px-4 py-6">
      <button
        type="button"
        className="h-10 w-full rounded-md bg-[#5458F7] text-white"
      >
        編輯個人檔案
      </button>
      <div className="my-4 flex flex-col gap-4 px-3">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold">自我介紹</div>
          <p>{user?.introduction ? user.introduction : ''}</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold">興趣</div>
          <div className="flex gap-1">
            {
              user?.tags !== '' &&
              user?.tags?.split(',').map((tag) => (
                <div key={tag} className="rounded-xl border border-black px-3">
                  {tag}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditor;
