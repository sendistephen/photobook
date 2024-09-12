import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import toast from 'react-hot-toast';

const auth = getAuth(),
  provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch(err) {
    toast.error('Failed to sign in with Google.');
    throw err;
  }
};

export const signOut = () => {
  auth.signOut().catch(() => {
    toast.error('Failed to sign in with Google.');
  });
};
