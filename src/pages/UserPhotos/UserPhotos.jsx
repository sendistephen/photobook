import { GalleryLoaderContent } from '../../components/Common/GalleryLoaderContent';
import { Message } from '../../styles';

import { useUserPhotos } from './useUserPhotos';

const UserPhotos = () => {
  const data = useUserPhotos();

  if (data.photos.length === 0) {
    return <Message>No photos available.</Message>;
  }

  return (
    <GalleryLoaderContent
      photos={data.photos}
      isLoading={data.isLoading}
      fetchMorePhotos={data.loadMorePhotos}
      hasMore={data.hasMore}
      isOpen={data.isOpen}
      openModal={data.openModal}
      closeModal={data.closeModal}
      selectedPhotoId={data.selectedPhotoId}
      isBottomLoader={data.isbottomloader}
    />
  );
};

export default UserPhotos;
