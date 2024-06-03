import { CollectionHeader } from '@/components/collection/CollectionHeader';
import { GalleryLoaderContent } from '@/components/Common/GalleryLoaderContent';
import { Container } from '@/styles';

import { useCollection } from './useCollection';

const Collection = () => {
  const data = useCollection();
  return (
    <Container>
      <CollectionHeader collection={data.collection} />
      <GalleryLoaderContent
        photos={data.userPhotoCollection}
        isLoading={data.isLoading}
        fetchMorePhotos={data.fetchMore}
        hasMore={data.hasMore}
        isOpen={data.isOpen}
        openModal={data.openModal}
        closeModal={data.closeModal}
        selectedPhotoId={data.selectedPhotoId}
        isBottomLoader={data.isBottomLoader}
      />
    </Container>
  );
};
export default Collection;
