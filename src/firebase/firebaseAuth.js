import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import toast from 'react-toast-notifications';

const auth = getAuth(),
  provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).catch(() => {
    toast.error('Failed to sign in with Google.');
  });
};

export const signOut = () => {
  auth.signOut().catch(() => {
    toast.error('Failed to sign in with Google.');
  });
};
