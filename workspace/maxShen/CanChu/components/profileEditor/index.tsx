import profile from '@/data/profile';

function ProfileEditor() {
  return (
    <div className="w-96 px-4 py-6 rounded-2xl bg-white border border-[#0000001A]">
      <button
        type="button"
        className="w-full h-10 rounded-md bg-[#5458F7] text-white"
      >
        編輯個人檔案
      </button>
      <div className="flex flex-col gap-4 my-4 px-3">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold">自我介紹</div>
          <p>{profile.introduction}</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold">興趣</div>
          <div className="flex gap-1">
            {profile.tags.split(',').map((tag) => (
              <div className="border border-black rounded-xl px-3">{tag}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditor;