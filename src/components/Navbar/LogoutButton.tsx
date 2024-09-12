import { Logout } from './Navbar.styles';
import { getAuth, signOut } from '@firebase/auth';

export const LogoutButton = () => {
  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth).catch((error) => {
      console.error('Firebase sign-out error:', error);
    });
  };

  return <Logout onClick={handleLogout}>Log out</Logout>;
};
