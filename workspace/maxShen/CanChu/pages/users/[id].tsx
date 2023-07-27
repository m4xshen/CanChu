import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/router';

import Navbar from '@/components/navbar';
import Profilebar from '@/components/profilebar';
import ProfileEditor from '@/components/profileEditor';
import Footer from '@/components/footer';
import Feed from '@/components/feed';

import useRelation from '@/hooks/useRelation';
import useProfile from '@/hooks/useProfile';
import { Relation } from '@/types';

export default function ProfilePage({ id }: { id: string }) {
  const profile = useProfile(parseInt(id, 10));
  const relation = useRelation(profile);
  const router = useRouter();

  return (
    <SWRConfig
      value={{
        onError: () => {
          router.reload();
        },
      }}
    >
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
          <Feed profile={profile} editable={relation === Relation.Self} />
        </div>
      </div>
    </SWRConfig>
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
      id: ctx.params.id,
    },
  };
}
