import { useDispatch, useSelector } from 'react-redux';

import {
  handleOverlayClick,
  handleSaveFavoritePhoto,
} from '../../utils/helper';

import { useBodyScrollLock } from './useBodyScrollLock';

export const useModal = (photos, selectedPhotoId) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const favorites = useSelector((state) => state.favorites.photos);
  const initialSlideIndex = photos.findIndex(
    (photo) => photo.id === selectedPhotoId,
  );

  useBodyScrollLock();

  return {
    dispatch,
    user,
    favorites,
    initialSlideIndex,
    handleSaveFavoritePhoto: (photo) =>
      handleSaveFavoritePhoto(photo, user, favorites, dispatch),
    handleOverlayClick: (e) => handleOverlayClick(e, dispatch),
  };
};
