import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

import { getCookie } from 'cookies-next';
import Navbar from '@/components/navbar';
import { ProfileType } from '@/types';
import Profilebar from '@/components/profilebar';
import ProfileEditor from '@/components/profileEditor';
import Footer from '@/components/footer';
import PostCreator from '@/components/postCreator';
import Feed from '@/components/feed';

export default function ProfilePage({ profile }: { profile: ProfileType }) {
  const userCookie = getCookie('user')?.toString();
  const user = JSON.parse(userCookie || '{}');
  const isUser = user.id === profile.id;

  return (
    <>
      <Navbar />
      <Profilebar profile={profile} />
      <div className="flex justify-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <ProfileEditor user={profile} />
          <div className="w-64">
            <Footer />
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 pb-5">
          {isUser && <PostCreator />}
          <Feed userId={profile.id} edit={isUser} />
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
