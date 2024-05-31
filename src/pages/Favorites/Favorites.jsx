import { useEffect } from 'react';
import { Modal } from '@/components';
import LoaderComponent from '@/components/LoaderComponent';
import { Gallery } from '@/components/SearchCollections/SearchCollections.styles';
import {
  Container,
  GalleryImage,
  GalleryItem,
  LoadingSpinner,
  Message,
  MessageBox,
} from '@/styles';
import { breakpointColumns } from '@/utils/helper';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { getFavorites } from '@/store/favoritesSlice';
import { showModal, hideModal } from '@/store/modalSlice';

const Favorites = () => {
  const { photos, isLoading, hasMore } = useSelector(
    (state) => state.favorites,
  );
  const { isOpen, selectedPhotoId } = useSelector((state) => state.modal);

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getFavorites());
    } else {
      console.log('User not authenticated');
    }
  }, [dispatch, user]);

  const fetchPhotos = () => {
    const favoritePhotos = Object.values(photos);
    return favoritePhotos;
  };

  const openModal = (photoId) => dispatch(showModal(photoId));
  const closeModal = () => dispatch(hideModal());

  const isBottomLoader = true;

  return (
    <Container>
      {isLoading ? (
        <LoadingSpinner className={isBottomLoader ? 'is-bottom-loader' : ''}>
          <LoaderComponent />
        </LoadingSpinner>
      ) : (
        <>
          {photos.length > 0 ? (
            <InfiniteScroll
              dataLength={Object.entries(photos).length}
              next={fetchPhotos}
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
              <Gallery
                breakpointCols={breakpointColumns}
                columnClassName="masonry-grid_column"
              >
                {photos.map((photo) => (
                  <GalleryItem
                    key={photo.id}
                    onClick={() => openModal(photo.id)}
                  >
                    <GalleryImage
                      src={photo.urls.small}
                      alt={photo.description}
                    />
                  </GalleryItem>
                ))}
              </Gallery>
              {isOpen && (
                <Modal
                  photos={photos}
                  selectedPhotoId={selectedPhotoId}
                  hideModal={closeModal}
                />
              )}
            </InfiniteScroll>
          ) : (
            <MessageBox>
              <Message>You currently have no saved photos</Message>
            </MessageBox>
          )}
        </>
      )}
    </Container>
  );
};

export default Favorites;
