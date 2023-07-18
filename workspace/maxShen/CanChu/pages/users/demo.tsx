import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import nookies from 'nookies';

import { NextPageContext } from 'next';
import Navbar from '@/components/navbar';
import PostCreator from '@/components/postCreator';
import Footer from '@/components/footer';
import Profilebar from '@/components/profilebar';
import ProfileEditor from '@/components/profileEditor';
import Post from '@/components/post';
import LoadingIcon from '@/components/icons/LoadingIcon';
import { PostType } from '@/types';
import useProfile from '@/hooks/useProfile';

function Demo() {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const profile = useProfile();
  const [posts, setPosts] = useState<PostType[]>();

  useEffect(() => {
    const userCookie = getCookie('user');
    if (userCookie?.toString() !== undefined) {
      const user = JSON.parse(userCookie.toString());
      (async () => {
        const res = await fetch(
          `${apiDomain}/posts/search?user_id=${user.id}`,
          {
            method: 'GET',
            headers: new Headers({
              Authorization: `Bearer ${getCookie('access_token')}`,
            }),
          },
        );

        if (res.ok) {
          const data = await res.json();
          setPosts(data.data.posts);
        }
      })();
    }
  }, []);

  return (
    <>
      <Navbar />
      <Profilebar profile={profile} />
      <div className="flex justify-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <ProfileEditor user={profile} />
          <Footer />
        </div>
        <div className="flex flex-col items-center gap-5 pb-5">
          <PostCreator />
          {posts &&
            posts.map((post) => (
              <Post key={post.id} post={post} detail={false} edit />
            ))}
          <LoadingIcon />
        </div>
      </div>
    </>
  );
}

export default Demo;

export async function getServerSideProps(ctx: NextPageContext) {
  if (nookies.get(ctx).access_token === undefined) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
