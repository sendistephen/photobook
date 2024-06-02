import LoaderComponent from '@/components/LoaderComponent';
import PhotoGallery from '@/components/PhotoGallery';
import { Container, LoadingSpinner } from '@/styles';

import { usePhotoList } from './usePhotoList';

const PhotoLoader = ({ isBottomLoader }) => (
  <LoadingSpinner className={isBottomLoader ? 'is-bottom-loader' : ''}>
    <LoaderComponent />
  </LoadingSpinner>
);

const PhotoContent = (props) => (
  <PhotoGallery
    photos={props.photos}
    fetchMore={props.fetchMorePhotos}
    hasMore={props.hasMore}
    isOpen={props.isOpen}
    openModal={props.openModal}
    closeModal={props.closeModal}
    selectedPhotoId={props.selectedPhotoId}
  />
);

const PhotoList = () => {
  const data = usePhotoList();

  return (
    <Container>
      {data.photos.length === 0 && data.isLoading ? (
        <PhotoLoader isBottomLoader={data.isBottomLoader} />
      ) : (
        <PhotoContent
          photos={data.photos}
          fetchMorePhotos={data.fetchMorePhotos}
          hasMore={data.hasMore}
          isOpen={data.isOpen}
          openModal={data.openModal}
          closeModal={data.closeModal}
          selectedPhotoId={data.selectedPhotoId}
        />
      )}
    </Container>
  );
};

export default PhotoList;
