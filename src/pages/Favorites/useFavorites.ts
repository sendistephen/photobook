import { fetchFavorites } from '@/firebase/services/firebase-service';
import { useInfiniteQuery } from 'react-query';

const useFavorites = () => {
  return useInfiniteQuery(
    ['favorites'],
    ({ pageParam = null }) => fetchFavorites(0, 20, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage?.lastDoc || undefined,
    },
  );
};

export default useFavorites;
