import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from '@/components/Modal';
import { breakpointColumns } from '@/utils/helper';
import {
  GalleryImage,
  GalleryItem,
  LoadingSpinner,
  Message,
  StyledMasonry,
} from '@/styles';
import { fetchUserPhotos, hideModal, openModal } from '@/store/userSlice';
import { useParams } from 'react-router-dom';
import LoaderComponent from '@/components/LoaderComponent';

const UserPhotos = () => {
  const { username } = useParams();
  const [page, setPage] = useState(1);
  const isBottomLoader = true;
  const dispatch = useDispatch();

  const {
    photos,
    hasMore,
    index: selectedPhotoId,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (username) dispatch(fetchUserPhotos({ username, page }));
  }, [username, page, dispatch]);

  const loadMorePhotos = useCallback(
    throttle(() => {
      setPage((prevPage) => prevPage + 1);
    }, 3000),
    []
  );

  if (photos.length === 0) {
    return <Message>No photos available.</Message>;
  }

  return (
    <div>
      {photos.length > 0 && (
        <InfiniteScroll
          dataLength={photos.length}
          next={loadMorePhotos}
          hasMore={hasMore}
          loader={
            <LoadingSpinner
              className={isBottomLoader ? 'is-bottom-loader' : ''}
            >
              <LoaderComponent />
            </LoadingSpinner>
          }
          endMessage={
            <Message>
              <p>There are no more photos</p>
            </Message>
          }
        >
          <StyledMasonry
            breakpointCols={breakpointColumns}
            columnClassName="masonry-grid_column"
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
          {selectedPhotoId && (
            <Modal
              selectedPhotoId={selectedPhotoId}
              photos={photos}
              hideModal={() => dispatch(hideModal())}
            />
          )}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default UserPhotos;
