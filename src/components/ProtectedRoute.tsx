import { signInWithRedirect } from '@firebase/auth';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { auth, googleAuthProvider } from '../firebase/firebase-config';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!loading && !user) {
      signInWithRedirect(auth, googleAuthProvider);
    }
  }, []);

  return user ? <>{children}</> : null;
}

export default ProtectedRoute;
