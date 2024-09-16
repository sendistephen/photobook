import useOpenModal from '@/components/PhotoModal/useOpenModal';
import Skeletons from '../Skeletons';
import { PhotoGrid } from '../Common/PhotoGrid';
import { useParams } from 'react-router-dom';
import { imageExtractor } from '@/utils/helper';
import { useUserData } from './useUserData';

const UserLikes = () => {
  const { username } = useParams<{ username: string }>();
  const openModal = useOpenModal();
  const { data, isLoading, hasNextPage, fetchNextPage, error } = useUserData({
    username: username!,
    endpoint: 'likes'
  });

  if (isLoading) return <Skeletons count={12} />;
  if (error) return <div>Error: {error.message}</div>;

  // Flatten the data.pages into a single array of photos
  const allPhotos = (data?.pages?.flat() as Photo[]) || [];

  return (
    <PhotoGrid
      photos={allPhotos}
      fetchNextPage={fetchNextPage}
      hasMore={!!hasNextPage}
      openModal={openModal}
      imageExtractor={imageExtractor}
    />
  );
};

export default UserLikes;
