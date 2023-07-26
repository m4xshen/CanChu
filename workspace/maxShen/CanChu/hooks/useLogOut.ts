import { deleteCookie } from 'cookies-next';
import { NextRouter } from 'next/router';

function logOut(router: NextRouter) {
  deleteCookie('access_token');
  deleteCookie('user_id');
  router.push('/');
}

export default function useLogOut(router: NextRouter) {
  return () => logOut(router);
}
