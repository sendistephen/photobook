import { fetchUserData } from '@/api';
import { useInfiniteQuery } from 'react-query';

interface Props {
  username: string;
  page: number;
}
const useUserCollections = ({ username, page }: Props) => {
  return useInfiniteQuery<Collection[], Error>(
    ['userLikes', username],
    ({ pageParam = 1 }) => fetchUserData(username, 'collections', pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return false;
        return pages.length + 1;
      },
    },
  );
};

export default useUserCollections;
