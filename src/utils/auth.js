import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';

const auth = getAuth();

export const signWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    throw new Error('Failed to sign in with Google.');
  }
};
