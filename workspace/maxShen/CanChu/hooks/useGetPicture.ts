import useProfile from './useProfile';

export default function useGetPicture(userId: number | undefined | null) {
  if (!userId) {
    return '/avatar.png';
  }

  const profile = useProfile(userId);
  if (!profile?.picture) {
    return '/avatar.png';
  }

  return profile.picture;
}
