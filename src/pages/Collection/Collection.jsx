import { CollectionHeader } from '@/components/collection/CollectionHeader';
import LoaderComponent from '@/components/LoaderComponent';
import PhotoGallery from '@/components/PhotoGallery';
import { Container, LoadingSpinner } from '@/styles';

import { useCollection } from './useCollection';

const CollectionContent = ({
  userPhotoCollection,
  isLoading,
  hasMore,
  fetchMore,
  isOpen,
  selectedPhotoId,
  openModal,
  closeModal,
}) => (
  <>
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
  </>
);

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
      <Container>
        <CollectionHeader collection={collection} />
        <CollectionContent
          userPhotoCollection={userPhotoCollection}
          isLoading={isLoading}
          hasMore={hasMore}
          fetchMore={fetchMore}
          isOpen={isOpen}
          selectedPhotoId={selectedPhotoId}
          openModal={openModal}
          closeModal={closeModal}
        />
      </Container>
    </Container>
  );
};

export default Collection;
