import PhotoGallery from '@/components/PhotoGallery';
import { hideModal, showModal } from '@/store/modalSlice';
import { Message } from '@/styles';

import { useUserPhotos } from './useUserPhotos';

const UserPhotos = () => {
  const { photos, hasMore, selectedPhotoId, loadMorePhotos, dispatch, isOpen } =
    useUserPhotos();

  if (photos.length === 0) {
    return <Message>No photos available.</Message>;
  }

  return (
    <PhotoGallery
      photos={photos}
      fetchMore={loadMorePhotos}
      isOpen={isOpen}
      hasMore={hasMore}
      openModal={(photoId) => dispatch(showModal(photoId))}
      closeModal={() => dispatch(hideModal())}
      selectedPhotoId={selectedPhotoId}
    />
  );
};

export default UserPhotos;
