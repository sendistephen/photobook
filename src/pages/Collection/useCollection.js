import { throttle } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { clearUserCollection, fetchCollection } from '@/store/collectionSlice';
import { hideModal, showModal } from '@/store/modalSlice';

export const useCollection = () => {
  const { collectionId } = useParams();
  const dispatch = useDispatch();
  const { userPhotoCollection, collection, isLoading, hasMore } = useSelector(
    (state) => state.collections,
  );
  const { isOpen, selectedPhotoId } = useSelector((state) => state.modal);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (collectionId) {
      dispatch(fetchCollection({ collectionId, page }));
    }
  }, [collectionId, page, dispatch]);

  useEffect(() => {
    dispatch(clearUserCollection());
  }, [collectionId, dispatch]);

  const fetchMore = useCallback(
    throttle(() => {
      setPage((prevPage) => prevPage + 1);
    }, 3000),
    [],
  );

  return {
    userPhotoCollection,
    collection,
    isOpen,
    isLoading,
    hasMore,
    fetchMore,
    openModal: (photoId) => dispatch(showModal(photoId)),
    closeModal: () => dispatch(hideModal()),
    selectedPhotoId,
  };
};
