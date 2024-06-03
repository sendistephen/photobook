import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getFavorites } from '@/store/favoritesSlice';
import { hideModal, showModal } from '@/store/modalSlice';

const useFetchFavorites = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { photos, isLoading, hasMore } = useSelector(
    (state) => state.favorites,
  );

  useEffect(() => {
    if (user) {
      dispatch(getFavorites());
    } else {
      console.log('User not authenticated');
    }
  }, [dispatch, user]);

  return { photos, isLoading, hasMore };
};

export const useFavorites = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const selectedPhotoId = useSelector((state) => state.modal.selectedPhotoId);
  const { photos, isLoading, hasMore } = useFetchFavorites();

  const fetchPhotos = () => Object.values(photos);
  const openModal = (photoId) => dispatch(showModal(photoId));
  const closeModal = () => dispatch(hideModal());
  const isbottomloader = true;

  return {
    photos,
    hasMore,
    isLoading,
    fetchPhotos,
    openModal,
    closeModal,
    isOpen,
    selectedPhotoId,
    isbottomloader,
  };
};
