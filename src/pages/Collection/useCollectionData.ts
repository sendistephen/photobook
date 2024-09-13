import { useParams } from 'react-router-dom';
import useCollection from '@/pages/Collection/useCollection';

const useCollectionData = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
  } = useCollection(collectionId as string);

  const allPhotos = data?.pages
    ? data.pages.reduce((acc, page) => [...acc, ...page], [])
    : [];

  return { allPhotos, isLoading, error, hasNextPage, fetchNextPage };
};

export default useCollectionData;