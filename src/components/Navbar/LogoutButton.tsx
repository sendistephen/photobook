import { store } from '@/store';
import { signOut } from '@/firebase/firebaseAuth';
import { clearUser } from '@/store/authSlice';
import { Button } from '@/styles/GlobalStyles';

export const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      signOut();
      store.dispatch(clearUser());
    } catch (error) {
      console.error('Firebase sign-out error:', error);
    }
  };

  return <Button onClick={handleLogout}>Log out</Button>;
};
