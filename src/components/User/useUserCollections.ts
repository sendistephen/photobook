import { fetchUserCollections } from '@/api';
import { useInfiniteQuery } from 'react-query';

interface Props {
  username: string;
  page: number;
}
const useUserCollections = ({ username, page }: Props) => {
  return useInfiniteQuery<Photo[], Error>(
    ['userLikes', username],
    ({ pageParam = 1 }) => fetchUserCollections(username, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return false;
        return pages.length + 1;
      },
    },
  );
};

export default useUserCollections;
