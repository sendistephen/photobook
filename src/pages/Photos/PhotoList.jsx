import { throttle } from 'lodash';
import { useCallback, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';

import LoaderComponent from '@/components/LoaderComponent';
import Modal from '@/components/Modal';
import { hideModal, showModal } from '@/store/modalSlice';
import {
  fetchPhotos,
  selectHasMore,
  selectIsLoading,
  selectPhotos,
} from '@/store/photosSlice';
import {
  Container,
  GalleryImage,
  GalleryItem,
  LoadingSpinner,
  Message,
  StyledMasonry,
} from '@/styles';
import { breakpointColumns } from '@/utils/helper';

const PhotoList = () => {
  const dispatch = useDispatch(),
    photos = useSelector(selectPhotos),
    hasMore = useSelector(selectHasMore),
    isLoading = useSelector(selectIsLoading),
    { isOpen, selectedPhotoId } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  useEffect(
    () => () => {
      dispatch(hideModal());
    },
    [dispatch],
  );

  const fetchMorePhotos = useCallback(
      throttle(() => {
        dispatch(fetchPhotos());
      }, 3000),
      [dispatch],
    ),
    isBottomLoader = true,
    openModal = (photoId) => dispatch(showModal(photoId)),
    closeModal = () => dispatch(hideModal());

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
