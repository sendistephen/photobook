import { useEffect } from 'react';
import { fetchPhotos } from '@/api';
import { useInfiniteQuery } from 'react-query';
import { preloadImage, getImageSrc } from '@/utils/helper';

const usePhotos = () => {
  const query = useInfiniteQuery(
    ['photos'],
    ({ pageParam = 1 }) => fetchPhotos(pageParam),
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.length ? pages.length + 1 : undefined,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    },
  );

  const photos = query.data ? query.data.pages.flat() : [];

  // Preload next few images when current page loads
  useEffect(() => {
    if (photos.length > 0) {
      const nextPhotosToPreload = photos.slice(-3); // Preload last 3 images
      nextPhotosToPreload.forEach((photo) => {
        const imgSrc = getImageSrc(photo.urls);
        preloadImage(imgSrc).catch(() => {
          // Silently fail - preloading is an optimization, not critical
        });
      });
    }
  }, [photos.length]);

  return {
    photos,
    fetchNextPage: query.fetchNextPage,
    hasMore: !!query.hasNextPage,
    isLoading: query.isFetching || query.isFetchingNextPage,
    isInitialLoading: query.isLoading,
    isError: query.isError,
    error: query.error ? (query.error as Error) : null,
  };
};

export default usePhotos;