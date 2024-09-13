import useOpenModal from '@/components/PhotoModal/useOpenModal';
import { useLocation } from 'react-router-dom';
import Spinner from '../Spinner';
import useSearch from './useSearch';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Photo, PhotoCard, PhotoGrid } from '@/components/User/user.styles';
import Skeletons from '../Skeletons';

interface PhotoGridProps {
  photos: any[];
  fetchNextPage: () => void;
  hasMore: boolean;
  openModal: (photo: any, photos: any[]) => void;
}

const useQueryParam = (param: string) => {
  const location = useLocation();
  return new URLSearchParams(location.search).get(param) ?? '';
};

const PhotoGridComponent = (props: PhotoGridProps) => (
  <InfiniteScroll
    dataLength={props.photos.length}
    next={props.fetchNextPage}
    hasMore={props.hasMore}
    loader={<Skeletons count={3} />}
    endMessage={<p>No more photos</p>}
  >
    <PhotoGrid>
      {props.photos.map((photo: any) => (
        <PhotoCard key={photo.id}>
          <Photo
            onClick={() => props.openModal(photo, props.photos)}
            src={photo.urls.regular}
            alt={photo.alt_description}
          />
        </PhotoCard>
      ))}
    </PhotoGrid>
  </InfiniteScroll>
);

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
    <PhotoGridComponent
      photos={photos}
      fetchNextPage={fetchNextPage}
      hasMore={!!hasNextPage}
      openModal={openModal}
    />
  );
};

export default SearchPhotos;
