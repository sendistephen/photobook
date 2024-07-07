import { fetchCollectionPhotos } from '@/api';
import { useInfiniteQuery } from 'react-query';

const useCollection = (collectionId: string) => {
  return useInfiniteQuery<Photo[], Error>(
    ['collectionPhotos', collectionId],
    ({ pageParam = 1 }) => fetchCollectionPhotos(collectionId, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage || lastPage.length === 0) return undefined;
        return allPages.length + 1;
      },
    },
  );
};
export default useCollection;
