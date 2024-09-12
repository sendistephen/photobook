import { store } from '@/store';
import { Logout } from './Navbar.styles';
import { signOut } from '@/firebase/firebaseAuth';
import { clearUser } from '@/store/authSlice';

export const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      signOut();
      store.dispatch(clearUser());
    } catch (error) {
      console.error('Firebase sign-out error:', error);
    }
  };

  return <Logout onClick={handleLogout}>Log out</Logout>;
};
