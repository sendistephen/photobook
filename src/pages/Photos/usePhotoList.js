import { useCommonPhotoData } from '@/components/Common/useCommonPhotoData';

import { useFetchPhotos } from './useFetchPhotos';
import { useModalManagement } from './useModalManagement';

export const usePhotoList = () => {
  const { photos, hasMore, isLoading, fetchMorePhotos, isbottomloader } =
    useFetchPhotos();
  const { isOpen, selectedPhotoId, openModal, closeModal } =
    useModalManagement();

  return useCommonPhotoData({
    photos,
    hasMore,
    isLoading,
    fetchMorePhotos,
    isbottomloader,
    openModal,
    closeModal,
    isOpen,
    selectedPhotoId,
  });
};
