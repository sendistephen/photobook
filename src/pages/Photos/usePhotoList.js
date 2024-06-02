import { useFetchPhotos } from './useFetchPhotos';
import { useModalManagement } from './useModalManagement';

export const usePhotoList = () => {
  const { photos, hasMore, isLoading, fetchMorePhotos, isBottomLoader } =
    useFetchPhotos();
  const { isOpen, selectedPhotoId, openModal, closeModal } =
    useModalManagement();

  return {
    photos,
    hasMore,
    isLoading,
    fetchMorePhotos,
    isBottomLoader,
    openModal,
    closeModal,
    isOpen,
    selectedPhotoId,
  };
};
