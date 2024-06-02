import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchUserPhotos } from '@/store/userSlice';
import { useLoadMorePhotos } from '@/useLoadMorePhotos';

export const useUserPhotos = () => {
  const { username } = useParams();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const {
    photos,
    hasMore,
    index: selectedPhotoId,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (username) {
      dispatch(fetchUserPhotos({ username, page }));
    }
  }, [username, page, dispatch]);

  const loadMorePhotos = useLoadMorePhotos(setPage);

  return { photos, hasMore, selectedPhotoId, loadMorePhotos };
};
