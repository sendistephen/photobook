import { Photo, PhotoCard, PhotoGrid } from '@/components/User/user.styles';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from 'react-router-dom';
import useOpenModal from '../Modal/useOpenModal';
import Skeletons from '../Skeletons';
import Spinner from '../Spinner';
import useSearch from './useSearch';

const SearchPhotos = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') ?? '';

  const openModal = useOpenModal();

  const { data, error, fetchNextPage, hasNextPage, isLoading } = useSearch(
    query,
    'photos',
  );

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading photos</div>;

  // Extract all photo results into a single flat array...
  const allPhotos = data!.pages.reduce<Photo[]>(
    (acc, page) => acc.concat(page.results as Photo[]),
    [],
  );

  return (
    <InfiniteScroll
      dataLength={allPhotos.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={isLoading ? <Skeletons count={3} /> : null}
      endMessage={<p>No more photos</p>}
    >
      <PhotoGrid>
        {allPhotos!.map((photo, index) => (
          <PhotoCard key={photo.id + index}>
            <Photo
              onClick={() => openModal(photo, allPhotos)}
              src={photo.urls.regular}
              alt={photo.alt_description}
            />
          </PhotoCard>
        ))}
      </PhotoGrid>
    </InfiniteScroll>
  );
};

export default SearchPhotos;
