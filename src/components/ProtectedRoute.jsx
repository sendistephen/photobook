import { signInWithRedirect } from '@firebase/auth';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { auth, googleAuthProvider } from '@/firebase/firebase-config';

function ProtectedRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!loading && !user) {
      signInWithRedirect(auth, googleAuthProvider);
    }
  }, []);

  return user ? <>{children}</> : null;
}

export default ProtectedRoute;
