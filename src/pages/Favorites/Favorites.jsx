import LoaderComponent from '@/components/LoaderComponent';
import PhotoGallery from '@/components/PhotoGallery';
import { Container, LoadingSpinner } from '@/styles';

import { useFavorites } from './useFavorites';

const FavoritesContent = (props) => {
  if (props.isLoading) {
    return (
      <LoadingSpinner
        className={props.isBottomLoader ? 'is-bottom-loader' : ''}
      >
        <LoaderComponent />
      </LoadingSpinner>
    );
  }

  return (
    <PhotoGallery
      photos={props.photos}
      fetchMore={props.fetchPhotos}
      hasMore={props.hasMore}
      isOpen={props.isOpen}
      openModal={props.openModal}
      closeModal={props.closeModal}
      selectedPhotoId={props.selectedPhotoId}
    />
  );
};

const Favorites = () => {
  const data = useFavorites();

  return (
    <Container>
      <FavoritesContent
        isLoading={data.isLoading}
        isBottomLoader={data.isBottomLoader}
        photos={data.photos}
        fetchPhotos={data.fetchPhotos}
        hasMore={data.hasMore}
        isOpen={data.isOpen}
        openModal={data.openModal}
        closeModal={data.closeModal}
        selectedPhotoId={data.selectedPhotoId}
      />
    </Container>
  );
};

export default Favorites;
