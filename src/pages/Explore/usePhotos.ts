import { fetchPhotos } from '@/api';
import { useInfiniteQuery } from 'react-query';

const usePhotos = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery(
    ['photos'],
    ({ pageParam = 1 }) => fetchPhotos(pageParam),
    {
      getNextPageParam: (lastePage, pages) =>
        lastePage.length ? pages.length + 1 : undefined,
    },
  );
  const photos = data ? data.pages.flat() : [];

  return {
    photos,
    fetchNextPage,
    hasMore: !!hasNextPage,
    isLoading: isFetching || isFetchingNextPage,
    isInitialLoading: isLoading,
    isError,
    error: error ? (error as Error) : null,
  };
};

export default usePhotos;
