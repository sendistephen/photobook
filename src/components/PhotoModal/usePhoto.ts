import { fetchPhoto } from '@/api';
import { useQuery, useQueryClient } from 'react-query';
import { useEffect } from 'react';

const usePhoto = (photoId: string) => {
  const queryClient = useQueryClient();
  
  const { isLoading, isError, data } = useQuery<Photo, Error>({
    queryKey: ['photo', photoId],
    queryFn: () => fetchPhoto(photoId),
    enabled: !!photoId,
    staleTime: 1000 * 60 * 10, // 10 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Preload related photos when modal opens
  useEffect(() => {
    if (data) {
      // Preload previous and next photos if available
      const currentPhotos = queryClient.getQueryData<Photo[]>(['photos']);
      if (currentPhotos) {
        const currentIndex = currentPhotos.findIndex(p => p.id === photoId);
        const preloadIds = [
          currentPhotos[currentIndex - 1]?.id,
          currentPhotos[currentIndex + 1]?.id
        ].filter(Boolean);

        preloadIds.forEach(id => {
          queryClient.prefetchQuery({
            queryKey: ['photo', id],
            queryFn: () => fetchPhoto(id),
            staleTime: 1000 * 60 * 10,
          });
        });
      }
    }
  }, [data, photoId, queryClient]);

  return {
    isLoading,
    isError,
    photo: data,
  };
};

export default usePhoto;
