import { throttle } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { clearCollections, fetchCollections } from '@/store/searchSlice';

export const useSearchCollection = () => {
  const { searchWord } = useParams(),
    dispatch = useDispatch(),
    isBottomLoader = true,
    { collections, hasMore, page } = useSelector((state) => state.search);

  useEffect(() => {
    if (searchWord) {
      dispatch(fetchCollections({ query: searchWord, page: 1, perPage: 30 }));
    }
    return () => {
      dispatch(clearCollections());
    };
  }, [dispatch, searchWord]);

  const fetchMoreCollections = useCallback(
    throttle(() => {
      const nextPage = page + 1;
      dispatch(
        fetchCollections({ query: searchWord, page: nextPage, perPage: 30 }),
      );
    }, 3000),
    [dispatch, searchWord, page],
  );

  return {
    collections,
    hasMore,
    page,
    fetchMoreCollections,
    isBottomLoader,
  };
};
