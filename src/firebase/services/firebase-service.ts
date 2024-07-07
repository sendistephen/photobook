import {
  collection,
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
