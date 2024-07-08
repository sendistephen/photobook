import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDocs,
  getFirestore,
  limit,
  query,
  startAfter,
} from '@firebase/firestore';

import { auth } from '../firebase-config';

interface FavouritesFetchResult {
  favorites: Photo[];
  lastDoc: DocumentSnapshot<DocumentData, DocumentData> | null;
}

/**
 * Fetches the user's favorites from firebase and returns the results
 * @param page The page number to fetch
 * @param  limitCount The number of photos to fetch
 * @param lastDoc The last document in the query
 * @returns The user's favorites and the last document in the query
 */
export const fetchFavorites = async (
  page = 0,
  limitCount = 20,
  lastDoc: DocumentSnapshot | null = null,
): Promise<FavouritesFetchResult> => {
  const user = auth.currentUser;

  if (!user) throw new Error('User not authenticated');

  const db = getFirestore();

  const favoritesRef = collection(db, `users/${user.uid}/favorites`);

  let q = query(favoritesRef, limit(limitCount));

  if (lastDoc) {
    q = query(favoritesRef, startAfter(lastDoc), limit(limitCount));
  }

  try {
    const snapshot = await getDocs(q);
    const favorites: Photo[] = [];

    let newLastDoc: DocumentSnapshot | null = null;
    snapshot.forEach((doc) => {
      const data = doc.data() as Photo;
      const { id, ...restOfData } = data;
      favorites.push({ id: doc.id, ...restOfData });
      newLastDoc = doc;
    });
    return {
      favorites,
      lastDoc: newLastDoc,
    };
  } catch (error) {
    throw new Error('Failded to fetch favorites' + (error as Error).message);
  }
};

/**
 * Adds a photo to the user's favorites in firebase database
 * @param photoId The id of the photo to add
 * @returns The updated user's favorites
 */
export const addFavorite = async (photo: Photo) => {
  if (!auth.currentUser) throw new Error('User not authenticated');

  const db = getFirestore();

  const favoriteRef = collection(db, `users/${auth.currentUser.uid}/favorites`);
  return addDoc(favoriteRef, photo);
};

/**
 * Removes a photo from the user's favorites from firebase database
 * @param photoId The id of the photo to remove
 * @returns The updated user's favorites
 */
export const removeFavorite = async (photoId: string) => {
  if (!auth.currentUser) throw new Error('User not authenticated');

  const db = getFirestore();
  const photoRef = doc(
    db,
    `users/${auth.currentUser.uid}/favorites/${photoId}`,
  );
  return deleteDoc(photoRef);
};
