import { useEffect, useState } from 'react';
import { ProfileType, Relation } from '@/types';

export default function useRelation(
  userId: number,
  profile: ProfileType | null,
) {
  const [relation, setRelation] = useState<Relation>(Relation.Null);

  useEffect(() => {
    if (!profile) {
      return;
    }

    if (userId === profile.id) {
      setRelation(Relation.Self);
    } else if (profile.friendship === null) {
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
