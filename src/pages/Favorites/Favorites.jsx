import { GalleryLoaderContent } from '@/components/Common/GalleryLoaderContent';

import { useFavorites } from './useFavorites';

const Favorites = () => {
  const data = useFavorites();

  return (
    <GalleryLoaderContent
      isLoading={data.isLoading}
      isBottomLoader={data.isbottomloader}
      photos={data.photos}
      fetchPhotos={data.fetchPhotos}
      hasMore={data.hasMore}
      isOpen={data.isOpen}
      openModal={data.openModal}
      closeModal={data.closeModal}
      selectedPhotoId={data.selectedPhotoId}
    />
  );
};

export default Favorites;
