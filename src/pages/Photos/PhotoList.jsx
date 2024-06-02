import LoaderComponent from '@/components/LoaderComponent';
import PhotoGallery from '@/components/PhotoGallery';
import { Container, LoadingSpinner } from '@/styles';

import { usePhotoList } from './usePhotoList';

const PhotoLoader = ({ isBottomLoader }) => (
  <LoadingSpinner className={isBottomLoader ? 'is-bottom-loader' : ''}>
    <LoaderComponent />
  </LoadingSpinner>
);

const PhotoContent = ({
  photos,
  fetchMorePhotos,
  hasMore,
  isOpen,
  openModal,
  closeModal,
  selectedPhotoId,
}) => (
  <PhotoGallery
    photos={photos}
    fetchMore={fetchMorePhotos}
    hasMore={hasMore}
    isOpen={isOpen}
    openModal={openModal}
    closeModal={closeModal}
    selectedPhotoId={selectedPhotoId}
  />
);

const PhotoList = () => {
  const {
    photos,
    hasMore,
    isLoading,
    fetchMorePhotos,
    isBottomLoader,
    openModal,
    closeModal,
    isOpen,
    selectedPhotoId,
  } = usePhotoList();

  return (
    <Container>
      {photos.length === 0 && isLoading ? (
        <PhotoLoader isBottomLoader={isBottomLoader} />
      ) : (
        <PhotoContent
          photos={photos}
          fetchMorePhotos={fetchMorePhotos}
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

export default PhotoList;
