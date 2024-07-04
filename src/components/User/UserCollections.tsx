import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import useOpenModal from '../Modal/useOpenModal';
import Skeletons from '../Skeletons';
import { Photo, PhotoCard, PhotoGrid } from './user.styles';
import useUserCollections from './useUserCollections';

const UserCollections = () => {
  const { username } = useParams<{ username: string }>();
  const openModal = useOpenModal();
  const { data, isLoading, hasNextPage, fetchNextPage, error } =
    useUserCollections({
      username: username!,
      page: 1,
    });

  if (isLoading) return <Skeletons count={12} />;
  if (error) return <div>Error: {error.message}</div>;

  const allPhotos = data!.pages!.flat();
  return (
    <InfiniteScroll
      dataLength={allPhotos.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<div>Loading...</div>}
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

export default UserCollections;
