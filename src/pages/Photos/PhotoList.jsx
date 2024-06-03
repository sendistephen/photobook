import { GalleryLoaderContent } from '@/components/Common/GalleryLoaderContent';

import { usePhotoList } from './usePhotoList';

const PhotoList = () => {
  const data = usePhotoList();

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
      isBottomLoader={data.isBottomLoader}
    />
  );
};

export default PhotoList;
