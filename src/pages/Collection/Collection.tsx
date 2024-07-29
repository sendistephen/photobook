import { Skeleton } from '@/components';
import useOpenModal from '@/components/PhotoModal/useOpenModal';
import Skeletons from '@/components/Skeletons';
import { Photo, PhotoCard, PhotoGrid } from '@/components/User/user.styles';
import { getImageSrc } from '@/utils/helper';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { CollectionContainer, CollectionTitle } from './Collection.styles';
import useCollection from './useCollection';

const Collection = () => {
  const { collectionId, collectionTitle } = useParams<{
    collectionId: string;
    collectionTitle: string;
  }>();
  const openModal = useOpenModal();
  const { data, isLoading, error, hasNextPage, fetchNextPage } = useCollection(
    collectionId as string,
  );

  if (isLoading) return <Skeleton count={12} />;
  if (error) return <div> Error: {error.message} </div>;

  const allPhotos = data?.pages
    ? data.pages.reduce((acc, page) => [...acc, ...page], [])
    : [];

  return (
    <CollectionContainer>
      <CollectionTitle>{collectionTitle}</CollectionTitle>

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
                src={getImageSrc(photo.urls)}
                alt={photo.alt_description}
              />
            </PhotoCard>
          ))}
        </PhotoGrid>
      </InfiniteScroll>
    </CollectionContainer>
  );
};
export default Collection;
