import useOpenModal from '@/components/PhotoModal/useOpenModal';
import { getImageSrc } from '@/utils/helper';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import Skeletons from '../Skeletons';
import useUserLikes from './useUserLikes';
import { Photo, PhotoCard, PhotoGrid } from './user.styles';

interface UserLikesProps {
  photos: Photo[];
  openModal: (photo: Photo, photos: Photo[]) => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
}
const renderPhotoGrid = (props: UserLikesProps) => (
  <InfiniteScroll
    dataLength={props.photos.length}
    next={props.fetchNextPage}
    hasMore={!!props.hasNextPage}
    loader={props.isLoading ? <Skeletons count={3} /> : null}
    endMessage={<p>No more photos</p>}
  >
    <PhotoGrid>
      {props.photos.map((photo, index) => (
        <PhotoCard key={photo.id + index}>
          <Photo
            onClick={() => props.openModal(photo, props.photos)}
            src={getImageSrc(photo.urls)}
            alt={photo.alt_description}
          />
        </PhotoCard>
      ))}
    </PhotoGrid>
  </InfiniteScroll>
);

const UserLikes = () => {
  const { username } = useParams<{ username: string }>();
  const openModal = useOpenModal();
  const { data, isLoading, hasNextPage, fetchNextPage, error } = useUserLikes({
    username: username!,
    page: 1,
  });

  if (isLoading) return <Skeletons count={12} />;
  if (error) return <div>Error: {error.message}</div>;

  const allPhotos =
    data?.pages?.reduce((acc, page) => [...acc, ...page], []) || [];

  return renderPhotoGrid({
    photos: allPhotos,
    openModal,
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isLoading,
  });
};

export default UserLikes;
