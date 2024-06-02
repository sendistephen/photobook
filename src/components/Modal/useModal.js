// src/hooks/useModal.js
import { signInWithRedirect } from '@firebase/auth';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { auth, googleAuthProvider } from '@/firebase/firebase-config';
import {
  addFavoritePhoto,
  addFavoritePhotoOptimistic,
  getFavorites,
  removeFavoritePhoto,
  removeFavoritePhotoOptmistic,
} from '@/store/favoritesSlice';
import { hideModal } from '@/store/modalSlice';

export const useModal = (photos, selectedPhotoId) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const favorites = useSelector((state) => state.favorites.photos);
  const initialSlideIndex = photos.findIndex(
    (photo) => photo.id === selectedPhotoId,
  );

  useEffect(() => {
    if (user && favorites.length === 0) {
      dispatch(getFavorites());
    }
  }, [dispatch, user, favorites.length]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSaveFavoritePhoto = async (photo) => {
    if (!user) {
      await signInWithRedirect(auth, googleAuthProvider);
      return;
    }
    try {
      const isFavorited = favorites.some((fav) => fav.id === photo.id);

      if (isFavorited) {
        await dispatch(removeFavoritePhotoOptmistic(photo.id));
        await dispatch(removeFavoritePhoto(photo.id)).unwrap();
        toast.success('Removed from favorites', { appearance: 'info' });
      } else {
        dispatch(addFavoritePhotoOptimistic(photo));
        await dispatch(addFavoritePhoto(photo)).unwrap();
        toast.success('Added to favorites', { appearance: 'success' });
      }
    } catch (err) {
      toast.error('Failed to update favorites');
      console.log(err);
      dispatch(addFavoritePhotoOptimistic(photo));
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(hideModal());
    }
  };

  return {
    dispatch,
    user,
    favorites,
    initialSlideIndex,
    handleSaveFavoritePhoto,
    handleOverlayClick,
  };
};
