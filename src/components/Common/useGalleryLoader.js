import { useFavorites } from '@/pages/Favorites/useFavorites';
import { usePhotoList } from '@/pages/Photos/usePhotoList';

export const useGalleryLoader = (type) => {
  const data = type === 'favorites' ? useFavorites() : usePhotoList();

  return {
    photos: data.photos,
    isLoading: data.isLoading,
    fetchMorePhotos: data.fetchMorePhotos || data.fetchPhotos,
    hasMore: data.hasMore,
    isOpen: data.isOpen,
    openModal: data.openModal,
    closeModal: data.closeModal,
    selectedPhotoId: data.selectedPhotoId,
    isBottomLoader: data.isbottomloader,
  };
};
