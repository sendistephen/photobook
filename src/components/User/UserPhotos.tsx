import useOpenModal from '@/components/PhotoModal/useOpenModal';
import { imageExtractor } from '@/utils/helper';
import { useParams } from 'react-router-dom';
import Skeletons from '../Skeletons';
import useUserPhotos from './useUserPhotos';
import { PhotoGrid } from '../Common/PhotoGrid';

const UserPhotos = () => {
  const { username } = useParams<{ username: string }>();
  const openModal = useOpenModal();
  const { data, isLoading, hasNextPage, fetchNextPage, error } = useUserPhotos({
    username: username!,
    page: 1,
  });

  if (isLoading) return <Skeletons count={12} />;
  if (error) return <div>Error: {error.message}</div>;

  const allPhotos = (data?.pages?.flat() as Photo[]) || [];

  <PhotoGrid
    photos={allPhotos}
    fetchNextPage={fetchNextPage}
    hasMore={!!hasNextPage}
    openModal={openModal}
    imageExtractor={imageExtractor}
  />;
};

export default UserPhotos;
