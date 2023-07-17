import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

import Navbar from '@/components/navbar';
import PostCreator from '@/components/postCreator';
import Footer from '@/components/footer';
import Profilebar from '@/components/profilebar';
import ProfileEditor from '@/components/profileEditor';
import Post from '@/components/post';
import LoadingIcon from '@/components/icons/LoadingIcon';
import { PostType } from '@/types';
import useProfile from '@/hooks/useProfile';

function Demo({ apiDomain }: { apiDomain: string }) {
  const profile = useProfile(apiDomain);
  const [posts, setPosts] = useState<PostType[]>();
  const router = useRouter();

  useEffect(() => {
    if (getCookie('access_token') === undefined) {
      router.push('/login');
    }

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
      <Navbar apiDomain={apiDomain} />
      <Profilebar profile={profile} apiDomain={apiDomain} />
      <div className="flex justify-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <ProfileEditor user={profile} apiDomain={apiDomain} />
          <Footer />
        </div>
        <div className="flex flex-col items-center gap-5 pb-5">
          <PostCreator apiDomain={apiDomain} />
          {posts &&
            posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                detail={false}
                edit
                apiDomain={apiDomain}
              />
            ))}
          <LoadingIcon />
        </div>
      </div>
    </>
  );
}

export default Demo;

export async function getServerSideProps() {
  return {
    props: {
      apiDomain: process.env.API_DOMAIN || '',
    },
  };
}
