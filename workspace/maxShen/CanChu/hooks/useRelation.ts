import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { ProfileType, Relation } from '@/types';

export default function useRelation(profile: ProfileType) {
  const [relation, setRelation] = useState<Relation>(Relation.Null);
  const userCookie = getCookie('user')?.toString();
  const user = JSON.parse(userCookie || '{}');

  useEffect(() => {
    if (user.id === profile.id) {
      setRelation(Relation.Self);
    } else if (profile.friendship?.status === 'pending') {
      setRelation(Relation.Pending);
    } else if (profile.friendship?.status === 'requested') {
      setRelation(Relation.Requested);
    } else if (profile.friendship?.status === 'friend') {
      setRelation(Relation.Friend);
    }
  }, [profile]);

  return relation;
}
