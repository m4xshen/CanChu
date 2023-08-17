import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/router';

import Head from 'next/head';
import Navbar from '@/components/navbar';
import Profilebar from '@/components/profilebar';
import ProfileEditor from '@/components/profileEditor';
import Feed from '@/components/feed';

import useRelation from '@/hooks/useRelation';
import useProfile from '@/hooks/useProfile';
import { Relation } from '@/types';
import usePosts from '@/hooks/usePosts';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

interface Props {
  id: string;
  userId: number;
}

export default function ProfilePage({ id, userId }: Props) {
  const profile = useProfile(parseInt(id, 10));
  const relation = useRelation(userId, profile);
  const router = useRouter();

  const isHomePage = router.query.id === undefined;
  const { mutate, isLoading, isEnd, size, setSize, posts } = usePosts(
    isHomePage ? null : profile?.id,
  );
  useInfiniteScroll(async () => setSize(size + 1), 500);

  return (
    <SWRConfig
      value={{
        onError: () => {
          router.reload();
        },
      }}
    >
      <Head>
        <title>{profile?.name ?? 'CanChu'}</title>
      </Head>
      <Navbar userId={userId} />
      <Profilebar
        mutate={mutate}
        profile={profile}
        edit={relation === Relation.Self}
      />
      <div className="flex justify-center gap-8">
        <div className="hidden w-96 flex-col items-center gap-3 xl:flex">
          <ProfileEditor profile={profile} relation={relation} />
        </div>
        <div className="mx-3 flex w-full max-w-[48rem] flex-col items-center gap-5">
          <div className="w-full xl:hidden">
            <ProfileEditor profile={profile} relation={relation} />
          </div>
          <Feed
            posts={posts}
            isLoading={isLoading}
            isEnd={isEnd}
            mutate={mutate}
            userId={userId}
            relation={relation}
          />
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

  const userId = parseInt(nookies.get(ctx).user_id, 10);
  return {
    props: {
      id: ctx.params.id,
      userId,
    },
  };
}
