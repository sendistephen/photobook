import { useEffect } from 'react';

import { getFavorites } from '@/store/favoritesSlice';

export const useFetchFavorites = (user, favorites, dispatch) => {
  useEffect(() => {
    if (user && favorites.length === 0) {
      dispatch(getFavorites());
    }
  }, [dispatch, user, favorites.length]);
};
