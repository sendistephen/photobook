import LoaderComponent from '@/components/LoaderComponent';
import PhotoGallery from '@/components/PhotoGallery';
import { Container, LoadingSpinner } from '@/styles';

import { useFavorites } from './useFavorites';

const FavoritesContent = ({
  isLoading,
  isBottomLoader,
  photos,
  fetchPhotos,
  hasMore,
  isOpen,
  openModal,
  closeModal,
  selectedPhotoId,
}) => {
  if (isLoading) {
    return (
      <LoadingSpinner className={isBottomLoader ? 'is-bottom-loader' : ''}>
        <LoaderComponent />
      </LoadingSpinner>
    );
  }

  return (
    <PhotoGallery
      photos={photos}
      fetchMore={fetchPhotos}
      hasMore={hasMore}
      isOpen={isOpen}
      openModal={openModal}
      closeModal={closeModal}
      selectedPhotoId={selectedPhotoId}
    />
  );
};

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
      <FavoritesContent
        isLoading={isLoading}
        isBottomLoader={isBottomLoader}
        photos={photos}
        fetchPhotos={fetchPhotos}
        hasMore={hasMore}
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        selectedPhotoId={selectedPhotoId}
      />
    </Container>
  );
};

export default Favorites;
