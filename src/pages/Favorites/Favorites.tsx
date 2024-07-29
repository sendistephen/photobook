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

const Favorites = () => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useFavorites();

  const openModal = useOpenModal();

  if (isLoading) return <Skeleton count={10} />;
  if (error) return <div>Error:</div>;

  const allFavorites = data?.pages
    ? data.pages.reduce(
        (acc, page) => [...acc, ...page.favorites],
        [] as Photo[],
      )
    : [];

  if (allFavorites.length === 0) return <div>No favorites</div>;

  return (
    <FavoritesContainer>
      <Label>{allFavorites.length} images in your favorites</Label>
      <InfiniteScroll
        dataLength={allFavorites.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={isLoading ? <Skeletons count={3} /> : null}
        endMessage={<p>No more photos</p>}
      >
        <PhotoGrid>
          {allFavorites!.map((photo, index) => (
            <PhotoCard key={photo.id + index}>
              <Image
                onClick={() => openModal(photo, allFavorites)}
                src={getImageSrc(photo.urls)}
                alt={photo.alt_description}
              />
            </PhotoCard>
          ))}
        </PhotoGrid>
      </InfiniteScroll>
    </FavoritesContainer>
  );
};

export default Favorites;
