import PhotoGallery from '@/components/PhotoGallery';
import { openModal } from '@/store/userSlice';
import { Message } from '@/styles';

import { useUserPhotos } from './useUserPhotos';

const UserPhotos = () => {
  const { photos, hasMore, selectedPhotoId, loadMorePhotos } = useUserPhotos();

  if (photos.length === 0) {
    return <Message>No photos available.</Message>;
  }

  return (
    <PhotoGallery
      photos={photos}
      fetchMore={loadMorePhotos}
      hasMore={hasMore}
      openModal={openModal}
      selectedPhotoId={selectedPhotoId}
    />
  );
};

export default UserPhotos;
