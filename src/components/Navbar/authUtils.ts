import { signInWithGoogle } from '../../firebase/firebaseAuth';
import { setUser } from '@/store/authSlice';
import { Dispatch } from 'redux';
import toast from 'react-hot-toast';

export const handleLogin = async (dispatch:Dispatch) => {
    try {
      const user = await signInWithGoogle();
      dispatch(
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }),
      );
    } catch (error) {
      toast.error('Firebase sign-in error');
      console.log('Firebase sign-in error', error);
    }
  };