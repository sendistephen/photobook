import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { clearPhotos, fetchPhotos } from '@/store/searchSlice';

export const useSearchPhotos = () => {
  const { searchWord } = useParams(),
    dispatch = useDispatch(),
    { photos, hasMore } = useSelector((state) => state.search),
    { isOpen, selectedPhotoId } = useSelector((state) => state.modal);

  useEffect(() => {
    if (searchWord) {
      dispatch(fetchPhotos({ query: searchWord }));
    }
    return () => {
      dispatch(clearPhotos());
    };
  }, [dispatch, searchWord]);

  const fetchMore = () => {
    dispatch(fetchPhotos(searchWord));
  };
  return { photos, hasMore, fetchMore, isOpen, selectedPhotoId, dispatch };
};
