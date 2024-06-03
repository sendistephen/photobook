import { throttle } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchPhotos,
  selectHasMore,
  selectIsLoading,
  selectPhotos,
} from '@/store/photosSlice';

export const useFetchPhotos = () => {
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const hasMore = useSelector(selectHasMore);
  const isLoading = useSelector(selectIsLoading);
  const isbottomloader = true;

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  const fetchMorePhotos = useCallback(
    throttle(() => {
      dispatch(fetchPhotos());
    }, 3000),
    [dispatch],
  );

  return { photos, hasMore, isLoading, fetchMorePhotos, isbottomloader };
};
