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
import { PostType, ProfileType } from '@/types';

function Demo({ apiDomain }: { apiDomain: string }) {
  const [profile, setProfile] = useState<ProfileType>();
  const [posts, setPosts] = useState<PostType[]>();
  const router = useRouter();

  useEffect(() => {
    if (getCookie('access_token') === undefined) {
      router.push('/login');
    }

    const userCookie = getCookie('user');
    if (userCookie?.toString() !== undefined && profile === undefined) {
      const user = JSON.parse(userCookie.toString());
      (async () => {
        let res = await fetch(`${apiDomain}/users/${user.id}/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getCookie('access_token')}`,
          },
        });
        let data = await res.json();
        setProfile(data.data.user);

        res = await fetch(`${apiDomain}/posts/search?user_id=${user.id}`, {
          method: 'GET',
          headers: new Headers({
            Authorization: `Bearer ${getCookie('access_token')}`,
          }),
        });

        if (res.ok) {
          data = await res.json();
          setPosts(data.data.posts);
        }
      })();
    }
  }, []);

  return (
    <>
      <Navbar apiDomain={apiDomain}/>
      <Profilebar profile={profile} apiDomain={apiDomain} />
      <div className="flex justify-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <ProfileEditor user={profile} />
          <Footer />
        </div>
        <div className="flex flex-col items-center gap-5 pb-5">
          <PostCreator apiDomain={apiDomain} />
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

export async function getServerSideProps() {
  return {
    props: {
      apiDomain: process.env.API_DOMAIN || '',
    },
  };
}
