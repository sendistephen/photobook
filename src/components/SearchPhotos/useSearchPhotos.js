import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { clearPhotos, fetchPhotos } from '@/store/searchSlice';

export const useSearchPhotos = () => {
  const { searchWord } = useParams();
  const dispatch = useDispatch();
  const { photos, hasMore, page, isLoading } = useSelector(
    (state) => state.search,
  );
  const { isOpen, selectedPhotoId } = useSelector((state) => state.modal);
  const isbottomloader = true;

  useEffect(() => {
    if (searchWord) {
      dispatch(fetchPhotos({ query: searchWord, page: 1 }));
    }
    return () => {
      dispatch(clearPhotos());
    };
  }, [dispatch, searchWord]);

  const fetchMore = () => {
    dispatch(fetchPhotos({ query: searchWord, page }));
  };

  return {
    photos,
    hasMore,
    fetchMore,
    isOpen,
    selectedPhotoId,
    dispatch,
    isLoading,
    isbottomloader,
  };
};
