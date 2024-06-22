import Gallery from '@/components/Gallery/Gallery';
import usePhotos from './usePhotos';

const Explore = () => {
  const { photos, fetchNextPage, hasMore, isLoading, isInitialLoading, error } =
    usePhotos();

  if (error) return <div>Error, {error.message}</div>;

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
