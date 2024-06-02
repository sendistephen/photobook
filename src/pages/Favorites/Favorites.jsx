import LoaderComponent from '@/components/LoaderComponent';
import PhotoGallery from '@/components/PhotoGallery';
import { Container, LoadingSpinner } from '@/styles';

import { useFavorites } from './useFavorites';

const Favorites = () => {
  const {
    photos,
    hasMore,
    isLoading,
    fetchPhotos,
    openModal,
    closeModal,
    isOpen,
    selectedPhotoId,
    isBottomLoader,
  } = useFavorites();

  return (
    <Container>
      {isLoading ? (
        <LoadingSpinner className={isBottomLoader ? 'is-bottom-loader' : ''}>
          <LoaderComponent />
        </LoadingSpinner>
      ) : (
        <PhotoGallery
          photos={photos}
          fetchMore={fetchPhotos}
          hasMore={hasMore}
          isOpen={isOpen}
          openModal={openModal}
          closeModal={closeModal}
          selectedPhotoId={selectedPhotoId}
        />
      )}
    </Container>
  );
};

export default Favorites;
