import { fetchPhoto } from '@/api';
import { useQuery } from 'react-query';

const usePhoto = (photoId: string) => {
  const { isLoading, isError, data } = useQuery<Photo, Error>({
    queryKey: ['photo', photoId],
    queryFn: () => fetchPhoto(photoId),
    enabled: !!photoId,
  });
  return {
    isLoading,
    isError,
    photo: data,
  };
};

export default usePhoto;
