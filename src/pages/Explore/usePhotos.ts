import { fetchPhotos } from '@/api';
import { useInfiniteQuery } from 'react-query';

const usePhotos = () => {
  const query= useInfiniteQuery(
    ['photos'],
    ({ pageParam = 1 }) => fetchPhotos(pageParam),
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.length ? pages.length + 1 : undefined,
    },
  );

  return {
    photos:query.data ? query.data.pages.flat() : [],
    fetchNextPage:query.fetchNextPage,
    hasMore: !!query.hasNextPage,
    isLoading: query.isFetching || query.isFetchingNextPage,
    isInitialLoading: query.isLoading,
    isError: query.isError,
    error: query.error ? (query.error as Error) : null,
  };
};

export default usePhotos;