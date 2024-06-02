import { CollectionHeader } from '@/components/collection/CollectionHeader';
import LoaderComponent from '@/components/LoaderComponent';
import PhotoGallery from '@/components/PhotoGallery';
import { Container, LoadingSpinner } from '@/styles';

import { useCollection } from './useCollection';

const CollectionContent = (props) => (
  <>
    {props.userPhotoCollection.length === 0 && props.isLoading ? (
      <LoadingSpinner>
        <LoaderComponent />
      </LoadingSpinner>
    ) : (
      <PhotoGallery
        photos={props.userPhotoCollection}
        fetchMore={props.fetchMore}
        hasMore={props.hasMore}
        isOpen={props.isOpen}
        openModal={props.openModal}
        closeModal={props.closeModal}
        selectedPhotoId={props.selectedPhotoId}
      />
    )}
  </>
);

const Collection = () => {
  const data = useCollection();
  return (
    <Container>
      <CollectionHeader collection={data.collection} />
      <CollectionContent
        userPhotoCollection={data.userPhotoCollection}
        isLoading={data.isLoading}
        hasMore={data.hasMore}
        fetchMore={data.fetchMore}
        isOpen={data.isOpen}
        selectedPhotoId={data.selectedPhotoId}
        openModal={data.openModal}
        closeModal={data.closeModal}
      />
    </Container>
  );
};
export default Collection;
