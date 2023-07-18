import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

import Navbar from '@/components/navbar';
import { ProfileType } from '@/types';
import Profilebar from '@/components/profilebar';
import ProfileEditor from '@/components/profileEditor';
import Footer from '@/components/footer';
import PostCreator from '@/components/postCreator';
import Feed from '@/components/feed';

export default function ProfilePage({
  profile,
  apiDomain,
}: {
  profile: ProfileType;
  apiDomain: string;
}) {
  return (
    <>
      <Navbar apiDomain={apiDomain} />
      <Profilebar profile={profile} apiDomain={apiDomain} />
      <div className="flex justify-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <ProfileEditor user={profile} apiDomain={apiDomain} />
          <Footer />
        </div>
        <div className="flex flex-col items-center gap-5 pb-5">
          <PostCreator apiDomain={apiDomain} />
          <Feed apiDomain={apiDomain} userId={profile.id} />
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

  const res = await fetch(
    `${process.env.API_DOMAIN}/users/${ctx?.params?.id}/profile`,
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
      apiDomain: process.env.API_DOMAIN,
    },
  };
}
