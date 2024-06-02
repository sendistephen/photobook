import PhotoGallery from '@/components/PhotoGallery';
import { hideModal, showModal } from '@/store/modalSlice';
import { Container } from '@/styles';

import { useSearchPhotos } from './useSearchPhotos';

const SearchPhotos = () => {
  const { photos, hasMore, isOpen, fetchMore, dispatch, selectedPhotoId } =
    useSearchPhotos();

  return (
    <Container>
      <PhotoGallery
        photos={photos}
        fetchMore={fetchMore}
        hasMore={hasMore}
        isOpen={isOpen}
        openModal={(photoId) => dispatch(showModal(photoId))}
        closeModal={() => dispatch(hideModal())}
        selectedPhotoId={selectedPhotoId}
      />
    </Container>
  );
};

export default SearchPhotos;
