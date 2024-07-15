import { fetchFavorites } from '@/firebase/services/firebase-service';
import { useInfiniteQuery } from 'react-query';

const useFavorites = () => {
  const queryResult = useInfiniteQuery(
    ['favorites'],
    ({ pageParam = null }) => fetchFavorites(0, 20, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage?.lastDoc || undefined,
    },
  );
  const favorites = queryResult.data?.pages
    ? queryResult.data.pages.reduce(
        (acc, page) => [...acc, ...page.favorites],
        [] as Photo[],
      )
    : [];
  return { ...queryResult, favorites };
};

export default useFavorites;
