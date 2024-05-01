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
import { showModal } from '@/store/favoritesSlice';

const Favorites = () => {
  const { photos, isLoading, hasMore, index } = useSelector(
    (state) => state.favorites
  );

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

  const openModal = (index) => dispatch(showModal(index));
  const closeModal = () => dispatch(hideModal());

  const isBottomLoader = true;

  console.log('index', index);
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
                columnClassName='masonry-grid_column'
              >
                {photos.map((photo, index) => (
                  <GalleryItem key={photo.id} onClick={() => openModal(index)}>
                    <GalleryImage
                      src={photo.urls.small}
                      alt={photo.description}
                    />
                  </GalleryItem>
                ))}
              </Gallery>
              {index > -1 && (
                <Modal
                  photos={photos}
                  selectedPhotoId={photos[index].id}
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
