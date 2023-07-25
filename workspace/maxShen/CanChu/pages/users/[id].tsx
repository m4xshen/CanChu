import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

import Navbar from '@/components/navbar';
import { Relation } from '@/types';
import Profilebar from '@/components/profilebar';
import ProfileEditor from '@/components/profileEditor';
import Footer from '@/components/footer';
import Feed from '@/components/feed';
import useRelation from '@/hooks/useRelation';
import useProfile from '@/hooks/useProfile';

export default function ProfilePage({ id }: { id: number }) {
  const profile = useProfile(id);
  const relation = useRelation(profile);

  return (
    <>
      <Navbar />
      <Profilebar profile={profile} edit={relation === Relation.Self} />
      <div className="flex justify-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <ProfileEditor profile={profile} relation={relation} />
          <div className="w-64">
            <Footer />
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 pb-5">
          <Feed profile={profile} edit={relation === Relation.Self} />
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

  return {
    props: {
      id: ctx.params.id
    },
  };
}
