import Gallery from '@/components/Gallery/Gallery';
import useOpenModal from '@/components/Modal/useOpenModal';
import usePhotos from './usePhotos';

const Explore = () => {
  const {
    photos,
    fetchNextPage,
    hasMore,
    isLoading,
    isInitialLoading,
    isError,
  } = usePhotos();
  const openModal = useOpenModal();

  if (isError) {
    return <div>Error fetching photos</div>;
  }
  return (
    <Gallery
      photos={photos}
      fetchNextPage={fetchNextPage}
      hasMore={hasMore}
      isInitialLoading={isInitialLoading}
      isLoading={isLoading}
      handleOpenPhoto={openModal}
    />
  );
};

export default Explore;
