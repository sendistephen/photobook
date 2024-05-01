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
  hideModal,
  selectHasMore,
  selectIndex,
  selectIsLoading,
  selectPhotos,
  showModal,
} from '@/store/photosSlice';
import LoaderComponent from '@/components/LoaderComponent';
import { debounce } from 'lodash';

const PhotoList = () => {
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const hasMore = useSelector(selectHasMore);
  const isLoading = useSelector(selectIsLoading);
  const selectedPhotoId = useSelector(selectIndex);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  const fetchMorePhotos = () => {
    dispatch(fetchPhotos());
  };

  const isBottomLoader = true;

  const handleShowModal = useCallback(
    debounce((id) => {
      dispatch(showModal(id));
    }, 300),
    [dispatch]
  );

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
                columnClassName='masonry-grid_column'
              >
                {photos.map((photo, index) => (
                  <GalleryItem
                    key={index}
                    onClick={() => handleShowModal(photo.id)}
                  >
                    <GalleryImage
                      src={photo.urls.small}
                      alt={photo.description}
                    />
                  </GalleryItem>
                ))}
              </StyledMasonry>

              {selectedPhotoId && (
                <Modal
                  photos={photos}
                  selectedPhotoId={selectedPhotoId}
                  hideModal={() => dispatch(hideModal())}
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
