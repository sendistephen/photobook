import { GalleryLoaderContent } from '@/components/Common/GalleryLoaderContent';
import { useGalleryLoader } from '@/components/Common/useGalleryLoader';

const Favorites = () => {
  const data = useGalleryLoader('favorites');

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
