import useOpenModal from '@/components/PhotoModal/useOpenModal';
import { imageExtractor } from '@/utils/helper';
import { useParams } from 'react-router-dom';
import Skeletons from '../Skeletons';
import { PhotoGrid } from '../Common/PhotoGrid';
import { useUserData } from './useUserData';

const UserPhotos = () => {
  const { username } = useParams<{ username: string }>();
  const openModal = useOpenModal();
  const { data, isLoading, hasNextPage, fetchNextPage, error } = useUserData({
    username: username!,
    endpoint: 'photos'
  });

  if (isLoading) return <Skeletons count={12} />;
  if (error) return <div>Error: {error.message}</div>;

  const allPhotos = (data?.pages?.flat() as Photo[]) || [];

  return <PhotoGrid
    photos={allPhotos}
    fetchNextPage={fetchNextPage}
    hasMore={!!hasNextPage}
    openModal={openModal}
    imageExtractor={imageExtractor}
  />;
};

export default UserPhotos;
