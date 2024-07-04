import { AppDispatch } from '@/store';
import { showModal } from '@/store/modalSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Photo, PhotoCard, PhotoGrid } from './user.styles';
import useUserCollections from './useUserCollections';

const UserCollections = () => {
  const { username } = useParams<{ username: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, hasNextPage, fetchNextPage, error } =
    useUserCollections({
      username: username!,
      page: 1,
    });

  const handleOpen = (photo: Photo) => {
    navigate(`/photos/${photo.slug}`, { replace: true });
    dispatch(showModal(photo.id));
  };

  if (isLoading) return <div>Loading...</div>;
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
              onClick={() => handleOpen(photo)}
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
