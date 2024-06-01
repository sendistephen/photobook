import { getAuth } from '@firebase/auth';
import { addDoc, collection, getFirestore } from '@firebase/firestore';

import app from './firebase-config';

const db = getFirestore(app),
  auth = getAuth(app);

export const addFavoritePhoto = async (photo) => {
  const user = auth.currentUser;
  if (!user) {
    return;
  } // Making sure user is authenticated

  const photoObject = {
    id: photo.id,
    username: photo.user.username,
    slug: photo.slug,
    profileImage: photo.user.profile_image.medium,
    createdAt: photo.created_at,
    description: photo.description,
    imageUrl: photo.urls.small,
    likes: photo.likes,
    userId: user.uid, // Associated photo with user's ID
  };

  try {
    await addDoc(collection(db, 'favorites'), photoObject);
    console.log('Photo added to favorites');
  } catch (error) {
    console.error('Error adding favorite photo', error);
  }
};
