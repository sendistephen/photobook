import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getFavorites } from '@/store/favoritesSlice';
import { hideModal, showModal } from '@/store/modalSlice';

export const useFavorites = () => {
  const { photos, isLoading, hasMore } = useSelector(
      (state) => state.favorites,
    ),
    { isOpen, selectedPhotoId } = useSelector((state) => state.modal),
    user = useSelector((state) => state.auth.user),
    dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getFavorites());
    } else {
      console.log('User not authenticated');
    }
  }, [dispatch, user]);

  const fetchPhotos = () => {
      const favoritePhotos = Object.values(photos);
      return favoritePhotos;
    },
    openModal = (photoId) => dispatch(showModal(photoId)),
    closeModal = () => dispatch(hideModal()),
    isBottomLoader = true;

  return {
    photos,
    hasMore,
    isLoading,
    fetchPhotos,
    openModal,
    closeModal,
    isOpen,
    selectedPhotoId,
    isBottomLoader,
  };
};
