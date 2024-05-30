import { getAuth, signOut } from '@firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Login, Logout } from './Navbar.styles';

export const AuthControls = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    const auth = getAuth();

    await signOut(auth).catch((error) => {
      console.error('Firebase sign-out error:', error);
    });
  };

  return (
    <>
      {!user && (
        <Login onClick={() => dispatch(signInWithGoogle())}>Login</Login>
      )}
      {user && <Logout onClick={handleLogout}>Log out</Logout>}
    </>
  );
};
