import { throttle } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideModal, showModal } from '@/store/modalSlice';
import {
  fetchPhotos,
  selectHasMore,
  selectIsLoading,
  selectPhotos,
} from '@/store/photosSlice';

export const usePhotoList = () => {
  const dispatch = useDispatch(),
    photos = useSelector(selectPhotos),
    hasMore = useSelector(selectHasMore),
    isLoading = useSelector(selectIsLoading),
    { isOpen, selectedPhotoId } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  useEffect(
    () => () => {
      dispatch(hideModal());
    },
    [dispatch],
  );

  const fetchMorePhotos = useCallback(
      throttle(() => {
        dispatch(fetchPhotos());
      }, 3000),
      [dispatch],
    ),
    isBottomLoader = true,
    openModal = (photoId) => dispatch(showModal(photoId)),
    closeModal = () => dispatch(hideModal());
  return {
    photos,
    hasMore,
    isLoading,
    fetchMorePhotos,
    isBottomLoader,
    openModal,
    closeModal,
    isOpen,
    selectedPhotoId,
  };
};
