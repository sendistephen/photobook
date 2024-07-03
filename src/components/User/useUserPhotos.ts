import { fetchUserPhotos } from '@/api';
import { useInfiniteQuery } from 'react-query';

interface Props {
  username: string;
  page: number;
}
const useUserPhotos = ({ username, page }: Props) => {
  return useInfiniteQuery<Photo[], Error>(
    ['userPhotos', username],
    ({ pageParam = 1 }) => fetchUserPhotos(username, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return false;
        return pages.length + 1;
      },
    },
  );
};

export default useUserPhotos;
