import { throttle } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchCollection } from '@/store/collectionSlice';
import { hideModal, showModal } from '@/store/modalSlice';

const useCollectionFetch = (collectionId, dispatch) => {
  useEffect(() => {
    if (collectionId) {
      dispatch(fetchCollection({ collectionId }));
    }
  }, [collectionId, dispatch]);

  const fetchMore = useCallback(
    throttle(() => {
      dispatch(fetchCollection({ collectionId }));
    }, 3000),
    [dispatch, collectionId],
  );

  return fetchMore;
};

export const useCollection = () => {
  const { collectionId } = useParams();
  const dispatch = useDispatch();
  const { userPhotoCollection, collection, isLoading, hasMore } = useSelector(
    (state) => state.collections,
  );

  const { isOpen, selectedPhotoId } = useSelector((state) => state.modal);

  const fetchMore = useCollectionFetch(collectionId, dispatch);

  const openModal = (photoId) => dispatch(showModal(photoId));
  const closeModal = () => dispatch(hideModal());

  return {
    userPhotoCollection,
    collection,
    isOpen,
    isLoading,
    hasMore,
    fetchMore,
    openModal,
    closeModal,
    selectedPhotoId,
  };
};
