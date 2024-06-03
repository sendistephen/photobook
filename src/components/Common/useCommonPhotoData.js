export const useCommonPhotoData = ({
  photos,
  hasMore,
  isLoading,
  fetchMorePhotos,
  loadMorePhotos,
  isbottomloader,
  openModal,
  closeModal,
  isOpen,
  selectedPhotoId,
}) => {
  return {
    photos,
    hasMore,
    isLoading,
    fetchMorePhotos,
    loadMorePhotos,
    isbottomloader,
    openModal,
    closeModal,
    isOpen,
    selectedPhotoId,
  };
};
