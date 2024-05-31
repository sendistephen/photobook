import { useCallback, useEffect } from 'react';
import Modal from '@/components/Modal';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  GalleryImage,
  GalleryItem,
  LoadingSpinner,
  Message,
  StyledMasonry,
  Container,
} from '@/styles';
import { breakpointColumns } from '@/utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPhotos,
  selectHasMore,
  selectIsLoading,
  selectPhotos,
} from '@/store/photosSlice';
import LoaderComponent from '@/components/LoaderComponent';
import { showModal, hideModal } from '@/store/modalSlice';
import { throttle } from 'lodash';

const PhotoList = () => {
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const hasMore = useSelector(selectHasMore);
  const isLoading = useSelector(selectIsLoading);
  const { isOpen, selectedPhotoId } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(hideModal());
    };
  }, [dispatch]);

  const fetchMorePhotos = useCallback(
    throttle(() => {
      dispatch(fetchPhotos());
    }, 3000),
    [dispatch],
  );

  const isBottomLoader = true;

  const openModal = (photoId) => dispatch(showModal(photoId));
  const closeModal = () => dispatch(hideModal());

  return (
    <Container>
      {photos.length === 0 && isLoading ? (
        <LoadingSpinner className={isBottomLoader ? 'is-bottom-loader' : ''}>
          <LoaderComponent />
        </LoadingSpinner>
      ) : (
        <>
          {photos.length > 0 && (
            <InfiniteScroll
              dataLength={photos.length}
              next={fetchMorePhotos}
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
                columnClassName="masonry-grid_column"
              >
                {photos.map((photo, index) => (
                  <GalleryItem
                    key={`${photo.id}-${index}`}
                    onClick={() => openModal(photo.id)}
                  >
                    <GalleryImage
                      src={photo.urls.small}
                      alt={photo.description}
                    />
                  </GalleryItem>
                ))}
              </StyledMasonry>

              {isOpen && (
                <Modal
                  photos={photos}
                  selectedPhotoId={selectedPhotoId}
                  hideModal={closeModal}
                />
              )}
            </InfiniteScroll>
          )}
        </>
      )}
    </Container>
  );
};

export default PhotoList;
