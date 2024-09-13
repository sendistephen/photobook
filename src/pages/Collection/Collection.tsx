import { Skeleton } from '@/components';
import useOpenModal from '@/components/PhotoModal/useOpenModal';
import Skeletons from '@/components/Skeletons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { CollectionContainer, CollectionTitle } from './Collection.styles';
import PhotoList from '@/components/Collection/PhotoList';
import useCollectionData from './useCollectionData';
 
const Collection = () => {
  const { collectionTitle } = useParams<{ collectionTitle: string }>();
  const openModal = useOpenModal();
  const { allPhotos, isLoading, error, hasNextPage, fetchNextPage } = useCollectionData();

  if (isLoading) return <Skeleton count={12} />;
  if (error) return <div> Error: {error.message} </div>;


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
        <PhotoList photos={allPhotos} openModal={openModal} />
      </InfiniteScroll>
    </CollectionContainer>
  );
};
export default Collection;
