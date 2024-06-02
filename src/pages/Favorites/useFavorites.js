import { useDispatch, useSelector } from 'react-redux';

import { hideModal, showModal } from '@/store/modalSlice';

import { useFetchFavorites } from './useFetchFavorites';

export const useFavorites = () => {
  const { photos, isLoading, hasMore } = useSelector(
      (state) => state.favorites,
    ),
    { isOpen, selectedPhotoId } = useSelector((state) => state.modal),
    user = useSelector((state) => state.auth.user),
    dispatch = useDispatch();

  useFetchFavorites(user, dispatch);

  const fetchPhotos = () => Object.values(photos);
  const openModal = (photoId) => dispatch(showModal(photoId));
  const closeModal = () => dispatch(hideModal());
  const isBottomLoader = true;

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
