import useOpenModal from '@/components/PhotoModal/useOpenModal';
import { getImageSrc } from '@/utils/helper';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';

import Skeletons from '../Skeletons';
import { Photo, PhotoCard, PhotoGrid } from './user.styles';
import useUserCollections from './useUserCollections';

const UserCollections = () => {
  const { username } = useParams<{ username: string }>();
  const openModal = useOpenModal();
  const { data, isLoading, hasNextPage, fetchNextPage, error } =
    useUserCollections({
      username: username!,
    });

  if (isLoading) return <Skeletons count={12} />;
  if (error) return <div>Error: {error.message}</div>;

  // Flatten the nested array of collections
  const allCollections = data?.pages
    ? data?.pages.reduce((acc, page) => [...acc, ...page], [])
    : [];

  return (
    <InfiniteScroll
      dataLength={allCollections.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={isLoading ? <Skeletons count={3} /> : null}
      endMessage={<p>No more photos</p>}
    >
      <PhotoGrid>
        {allCollections!.map((collection, index) => (
          <PhotoCard key={collection.id + index}>
            <Photo
              onClick={() => openModal(collection, allCollections)}
              src={getImageSrc(collection!.cover_photo.urls)}
              alt={collection.cover_photo.alt_description}
            />
          </PhotoCard>
        ))}
      </PhotoGrid>
    </InfiniteScroll>
  );
};

export default UserCollections;
