import { useDispatch } from 'react-redux';

import { GalleryLoaderContent } from '@/components/Common/GalleryLoaderContent';
import { hideModal, showModal } from '@/store/modalSlice';

import { useSearchPhotos } from './useSearchPhotos';

const SearchPhotos = () => {
  const data = useSearchPhotos();
  const dispatch = useDispatch();
  return (
    <GalleryLoaderContent
      photos={data.photos}
      isLoading={data.isLoading}
      fetchMorePhotos={data.fetchMore}
      hasMore={data.hasMore}
      isOpen={data.isOpen}
      openModal={(photoId) => dispatch(showModal(photoId))}
      closeModal={() => dispatch(hideModal())}
      selectedPhotoId={data.selectedPhotoId}
      isBottomLoader={data.isBottomLoader}
    />
  );
};

export default SearchPhotos;
