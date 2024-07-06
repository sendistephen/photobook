import { fetchUserData } from '@/api';
import { useInfiniteQuery } from 'react-query';

interface Props {
  username: string;
}
const useUserCollections = ({ username }: Props) => {
  return useInfiniteQuery<Collection[], Error>(
    ['userCollections', username],
    ({ pageParam = 1 }) => fetchUserData(username, 'collections', pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage || lastPage.length === 0) return undefined;
        return pages.length + 1;
      },
    },
  );
};

export default useUserCollections;
