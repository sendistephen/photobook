import { CollectionHeader } from '@/components/collection/CollectionHeader';
import LoaderComponent from '@/components/LoaderComponent';
import PhotoGallery from '@/components/PhotoGallery';
import { Container, LoadingSpinner } from '@/styles';

import { useCollection } from './useCollection';

const Collection = () => {
  const {
    userPhotoCollection,
    collection,
    isLoading,
    hasMore,
    fetchMore,
    isOpen,
    selectedPhotoId,
    openModal,
    closeModal,
  } = useCollection();

  return (
    <Container>
      <CollectionHeader collection={collection} />
      {userPhotoCollection.length === 0 && isLoading ? (
        <LoadingSpinner>
          <LoaderComponent />
        </LoadingSpinner>
      ) : (
        <PhotoGallery
          photos={userPhotoCollection}
          fetchMore={fetchMore}
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

export default Collection;
