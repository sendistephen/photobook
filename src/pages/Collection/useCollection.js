import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useModalManagement } from '@/pages/Photos/useModalManagement';
import { clearUserCollection, fetchCollection } from '@/store/collectionSlice';
import { usePagination } from '@/usePagination';

const useFetchCollection = () => {
  const { collectionId } = useParams();
  const dispatch = useDispatch();
  const { userPhotoCollection, collection, isLoading, hasMore } = useSelector(
    (state) => state.collections,
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (collectionId) {
      dispatch(fetchCollection({ collectionId, page }));
    }
  }, [collectionId, page, dispatch]);

  useEffect(() => {
    dispatch(clearUserCollection());
  }, [collectionId, dispatch]);

  return {
    userPhotoCollection,
    collection,
    isLoading,
    hasMore,
    page,
    setPage,
  };
};

export const useCollection = () => {
  const modal = useModalManagement();
  const collectionProps = useFetchCollection();
  const fetchMore = usePagination(collectionProps.setPage);

  return {
    userPhotoCollection: collectionProps.userPhotoCollection,
    collection: collectionProps.collection,
    isOpen: modal.isOpen,
    isLoading: collectionProps.isLoading,
    hasMore: collectionProps.hasMore,
    fetchMore,
    openModal: modal.openModal,
    closeModal: modal.closeModal,
    selectedPhotoId: modal.selectedPhotoId,
  };
};
