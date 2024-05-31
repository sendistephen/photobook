import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { clearUser, setUser } from '@/store/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useAuthState = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
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
