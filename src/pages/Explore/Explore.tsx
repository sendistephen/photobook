import Gallery from '@/components/Gallery/Gallery';
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
    />
  );
};

export default Explore;
