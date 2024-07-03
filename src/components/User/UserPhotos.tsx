import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useUserPhotos from './useUserPhotos';

const UserPhotos = () => {
  const { username } = useParams<{ username: string }>();

  const { data, isLoading, hasNextPage, fetchNextPage, error } = useUserPhotos({
    username: username!,
    page: 1,
  });

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
            <Photo src={photo.urls.regular} alt={photo.alt_description} />
          </PhotoCard>
        ))}
      </PhotoGrid>
    </InfiniteScroll>
  );
};

export default UserPhotos;

const PhotoGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;
const PhotoCard = styled.div`
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;
