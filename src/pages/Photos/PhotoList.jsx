import { GalleryLoaderContent } from '@/components/Common/GalleryLoaderContent';
import { useGalleryLoader } from '@/components/Common/useGalleryLoader';

const PhotoList = () => {
  const data = useGalleryLoader('photos');

  return (
    <GalleryLoaderContent
      photos={data.photos}
      isLoading={data.isLoading}
      fetchMorePhotos={data.fetchMorePhotos}
      hasMore={data.hasMore}
      isOpen={data.isOpen}
      openModal={data.openModal}
      closeModal={data.closeModal}
      selectedPhotoId={data.selectedPhotoId}
      isBottomLoader={data.isbottomloader}
    />
  );
};

export default PhotoList;
