import useOpenModal from '@/components/PhotoModal/useOpenModal';
import { getImageSrc } from '@/utils/helper';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import Skeletons from '../Skeletons';
import { Photo, PhotoCard, PhotoGrid } from './user.styles';
import useUserPhotos from './useUserPhotos';

const UserPhotos = () => {
  const { username } = useParams<{ username: string }>();
  const openModal = useOpenModal();
  const { data, isLoading, hasNextPage, fetchNextPage, error } = useUserPhotos({
    username: username!,
    page: 1,
  });

  if (isLoading) return <Skeletons count={12} />;
  if (error) return <div>Error: {error.message}</div>;

  const allPhotos = data!.pages!.flat() as Photo[];

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
              src={getImageSrc(photo.urls)}
              alt={photo.alt_description}
            />
          </PhotoCard>
        ))}
      </PhotoGrid>
    </InfiniteScroll>
  );
};

export default UserPhotos;
