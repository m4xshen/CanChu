import { ProfileType } from '@/types';

export default function useGetPicture(profile: ProfileType | undefined | null) {
  if (!profile?.picture) {
    return '/avatar.png';
  }

  return profile.picture;
}
