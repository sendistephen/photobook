import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'components/Modal';
import { breakpointColumns } from 'utils/helper';
import {
  GalleryImage,
  GalleryItem,
  LoadingSpinner,
  Message,
  StyledMasonry,
} from 'styles';
import { fetchUserPhotos, openModal } from 'store/userSlice';
import { useParams } from 'react-router-dom';
import LoaderComponent from 'components/LoaderComponent';

const UserPhotos = () => {
  const { username } = useParams();

  const dispatch = useDispatch();
  const { photos, hasMore, isLoading, index } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchUserPhotos(username));
  }, [username, dispatch]);

  if (photos.length === 0) {
    return <Message>No photos available.</Message>;
  }

  if (isLoading) {
    return (
      <LoadingSpinner>
        <LoaderComponent />
      </LoadingSpinner>
    );
  }
  return (
    <div>
      {photos.length > 0 && (
        <InfiniteScroll
          dataLength={photos.length}
          next={() => dispatch(fetchUserPhotos(username))}
          hasMore={hasMore}
          loader={
            <LoadingSpinner>
              <LoaderComponent />
            </LoadingSpinner>
          }
          endMessage={
            <Message>
              <b>There are no more photos</b>
            </Message>
          }
        >
          <StyledMasonry
            breakpointCols={breakpointColumns}
            columnClassName='masonry-grid_column'
          >
            {photos.map((photo) => (
              <GalleryItem
                key={photo.id}
                onClick={() => dispatch(openModal(photo.id))}
              >
                <GalleryImage src={photo.urls.small} alt={photo.description} />
              </GalleryItem>
            ))}
          </StyledMasonry>
          {index > -1 && (
            <Modal
              photos={photos}
              index={index}
              hideModal={() => dispatch(openModal(-1))}
            />
          )}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default UserPhotos;
