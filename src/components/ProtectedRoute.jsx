import { googleAuthProvider, auth } from '@/firebase/firebase-config';
import { signInWithRedirect } from '@firebase/auth';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!loading && !user) {
      signInWithRedirect(auth, googleAuthProvider);
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  return user ? <>{children}</> : null;
}

export default ProtectedRoute;
