import useOpenModal from '@/components/PhotoModal/useOpenModal';
import { useParams } from 'react-router-dom';
import Skeletons from '../Skeletons';
import useUserCollections from './useUserCollections';
import { PhotoGrid } from '../Common/PhotoGrid';
import { imageExtractor } from '@/utils/helper';


const UserCollections = () => {
  const { username } = useParams<{ username: string }>();
  const openModal = useOpenModal();
  const query = useUserCollections({ username: username! });

  if (query.isLoading) return <Skeletons count={12} />;
  if (query.error) return <div>Error: {query.error.message}</div>;

  return (
    <PhotoGrid
      photos={query.data ? query.data.pages.flat() : []}
      fetchNextPage={query.fetchNextPage}
      hasMore={!!query.hasNextPage}
      openModal={openModal}
      imageExtractor={imageExtractor}
    />
  );
};

export default UserCollections;