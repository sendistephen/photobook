import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';

const auth = getAuth();
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).catch((error) => {
    console.log(error);
  });
};

export const signOut = () => {
  auth.signOut().catch((error) => {
    console.log(error);
  });
};
