import { Skeleton } from '@/components';
import { Label } from '@/components/PhotoModal/PhotoModal.styles';
import useOpenModal from '@/components/PhotoModal/useOpenModal';
import Skeletons from '@/components/Skeletons';
import {
  Photo as Image,
  PhotoCard,
  PhotoGrid,
} from '@/components/User/user.styles';
import { getImageSrc } from '@/utils/helper';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FavoritesContainer } from './Favorites.styles';
import useFavorites from './useFavorites';

interface FavoritesProps {
  favorites: Photo[];
  openModal: (photo: Photo, favorites: Photo[]) => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
}
const renderFavorites = (props: FavoritesProps) => (
  <FavoritesContainer>
    <Label>{props.favorites.length} images in your favorites</Label>
    <InfiniteScroll
      dataLength={props.favorites.length}
      next={props.fetchNextPage}
      hasMore={!!props.hasNextPage}
      loader={props.isLoading ? <Skeletons count={3} /> : null}
      endMessage={<p>No more photos</p>}
    >
      <PhotoGrid>
        {props.favorites.map((photo, index) => (
          <PhotoCard key={photo.id + index}>
            <Image
              onClick={() => props.openModal(photo, props.favorites)}
              src={getImageSrc(photo.urls)}
              alt={photo.alt_description}
            />
          </PhotoCard>
        ))}
      </PhotoGrid>
    </InfiniteScroll>
  </FavoritesContainer>
);

const Favorites = () => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useFavorites();
  const openModal = useOpenModal();

  if (isLoading) return <Skeleton count={10} />;
  if (error) return <div>Error:</div>;

  const allFavorites =
    data?.pages?.reduce(
      (acc, page) => [...acc, ...page.favorites],
      [] as Photo[],
    ) || [];

  if (allFavorites.length === 0) return <div>No favorites</div>;

  return renderFavorites({
    favorites: allFavorites,
    openModal,
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isLoading,
  });
};

export default Favorites;
