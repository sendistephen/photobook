import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { clearUser, setUser } from '@/store/authSlice';

export const useAuthState = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth(),
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          dispatch(
            setUser({
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              email: currentUser.email,
              photoURL: currentUser.photoURL,
            }),
          );
        } else {
          dispatch(clearUser());
        }
      });

    return () => unsubscribe();
  }, [dispatch]);
};
