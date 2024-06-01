import { throttle } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchUserPhotos } from '@/store/userSlice';

const useUserPhotos = () => {
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

  const loadMorePhotos = useCallback(
    throttle(() => {
      setPage((prevPage) => prevPage + 1);
    }, 3000),
    [],
  );

  return {
    photos,
    hasMore,
    selectedPhotoId,
    loadMorePhotos,
    isBottomLoader: true,
    dispatch,
  };
};

export default useUserPhotos;
