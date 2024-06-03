import { throttle } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { hideModal, showModal } from '@/store/modalSlice';

export const useFetchData = (fetchAction, stateSelector, idKey) => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params[idKey];
  const { data, isLoading, hasMore } = useSelector(stateSelector);
  const { isOpen, selectedPhotoId } = useSelector((state) => state.modal);

  useEffect(() => {
    if (id) {
      dispatch(fetchAction({ [idKey]: id }));
    }
  }, [id, dispatch, fetchAction]);

  const fetchMore = useCallback(
    throttle(() => {
      dispatch(fetchAction({ [idKey]: id }));
    }, 3000),
    [dispatch, id, fetchAction],
  );

  const openModal = (photoId) => dispatch(showModal(photoId));
  const closeModal = () => dispatch(hideModal());

  return {
    data,
    isLoading,
    hasMore,
    fetchMore,
    openModal,
    closeModal,
    isOpen,
    selectedPhotoId,
  };
};
