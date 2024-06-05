import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useModalManagement } from '@/pages/Photos/useModalManagement';
import { clearPhotos, fetchPhotos } from '@/store/searchSlice';

const useFetchSearchPhotos = () => {
  const { searchWord } = useParams();
  const dispatch = useDispatch();
  const { photos, hasMore, page, isLoading } = useSelector(
    (state) => state.search,
  );

  useEffect(() => {
    if (searchWord) {
      dispatch(fetchPhotos({ query: searchWord, page: 1 }));
    }
    return () => {
      dispatch(clearPhotos());
    };
  }, [dispatch, searchWord]);

  return { photos, hasMore, page, isLoading, dispatch, searchWord };
};

export const useSearchPhotos = () => {
  const { photos, hasMore, page, isLoading, dispatch, searchWord } =
    useFetchSearchPhotos();

  const { openModal, closeModal, isOpen, selectedPhotoId } =
    useModalManagement();
  const isbottomloader = true;

  const fetchMore = () => {
    dispatch(fetchPhotos({ query: searchWord, page }));
  };

  return {
    photos,
    hasMore,
    fetchMore,
    isOpen,
    openModal,
    closeModal,
    selectedPhotoId,
    dispatch,
    isLoading,
    isbottomloader,
  };
};
