import { fetchUserData } from '@/api';
import { useInfiniteQuery } from 'react-query';

interface Props {
  username: string;
  page: number;
}
const useUserLikes = ({ username, page }: Props) => {
  return useInfiniteQuery<Photo[], Error>(
    ['userLikes', username],
    ({ pageParam = 1 }) => fetchUserData(username, 'likes', pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return false;
        return pages.length + 1;
      },
    },
  );
};

export default useUserLikes;
