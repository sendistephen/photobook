import useOpenModal from '@/components/PhotoModal/useOpenModal';
import { useLocation } from 'react-router-dom';
import Spinner from '../Spinner';
import useSearch from './useSearch';
import { PhotoGrid } from '../Common/PhotoGrid';
import { imageExtractor } from '@/utils/helper';

const useQueryParam = (param: string) => {
  const location = useLocation();
  return new URLSearchParams(location.search).get(param) ?? '';
};

const SearchPhotos = () => {
  const query = useQueryParam('query');
  const openModal = useOpenModal();
  const { data, error, fetchNextPage, hasNextPage, isLoading } = useSearch(
    query,
    'photos',
  );

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading photos</div>;

  // Filter out non-Photo items
  const photos =
    data?.pages.flatMap((page) =>
      page.results.filter(
        (item) => 'urls' in item && 'alt_description' in item,
      ),
    ) || [];

  return (
    <PhotoGrid
      photos={photos}
      fetchNextPage={fetchNextPage}
      hasMore={!!hasNextPage}
      openModal={openModal}
      imageExtractor={imageExtractor}
    />
  );
};

export default SearchPhotos;
