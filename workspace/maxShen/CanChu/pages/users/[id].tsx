import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

import Navbar from '@/components/navbar';
import { ProfileType, Relation } from '@/types';
import Profilebar from '@/components/profilebar';
import ProfileEditor from '@/components/profileEditor';
import Footer from '@/components/footer';
import Feed from '@/components/feed';
import useRelation from '@/hooks/useRelation';

export default function ProfilePage({ profile }: { profile: ProfileType }) {
  const relation = useRelation(profile);

  return (
    <>
      <Navbar />
      <Profilebar profile={profile} edit={relation === Relation.Self} />
      <div className="flex justify-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <ProfileEditor user={profile} relation={relation} />
          <div className="w-64">
            <Footer />
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 pb-5">
          <Feed userId={profile.id} edit={relation === Relation.Self} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const accessToken = nookies.get(ctx).access_token;
  if (accessToken === undefined) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (!ctx?.params?.id) {
    return {
      props: {},
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/users/${ctx.params.id}/profile`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  const data = await res.json();

  return {
    props: {
      profile: data.data.user,
    },
  };
}
