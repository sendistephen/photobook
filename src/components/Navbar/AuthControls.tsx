import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';

export const AuthControls = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      {!user && <LoginButton />}
      {user && <LogoutButton />}
    </>
  );
};
