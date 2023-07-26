import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { ProfileType, Relation } from '@/types';

export default function useRelation(profile: ProfileType | null) {
  const [relation, setRelation] = useState<Relation>(Relation.Null);
  const userId = parseInt(getCookie('user_id') as string, 10);

  useEffect(() => {
    if (!profile) {
      return;
    }

    if (userId === profile.id) {
      setRelation(Relation.Self);
    } else if (profile.friendship?.status === undefined) {
      setRelation(Relation.Null);
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
