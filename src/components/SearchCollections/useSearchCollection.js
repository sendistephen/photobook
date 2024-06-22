import { throttle } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { clearCollections, fetchCollections } from '../../store/searchSlice';

const useFetchInitialCollections = (searchWord, dispatch) => {
  useEffect(() => {
    if (searchWord) {
      dispatch(fetchCollections({ query: searchWord, page: 1, perPage: 30 }));
    }
    return () => {
      dispatch(clearCollections());
    };
  }, [dispatch, searchWord]);
};

const useFetchMoreCollections = (searchWord, dispatch, page) => {
  return useCallback(
    throttle(() => {
      const nextPage = page + 1;
      dispatch(
        fetchCollections({ query: searchWord, page: nextPage, perPage: 30 }),
      );
    }, 3000),
    [dispatch, searchWord, page],
  );
};

export const useSearchCollection = () => {
  const { searchWord } = useParams();
  const dispatch = useDispatch();
  const isBottomLoader = true;
  const { collections, hasMore, page } = useSelector((state) => state.search);

  useFetchInitialCollections(searchWord, dispatch);
  const fetchMoreCollections = useFetchMoreCollections(
    searchWord,
    dispatch,
    page,
  );

  return {
    collections,
    hasMore,
    page,
    fetchMoreCollections,
    isBottomLoader,
  };
};
