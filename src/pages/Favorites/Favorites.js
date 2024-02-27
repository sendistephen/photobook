import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Modal } from 'components';
import { breakpointColumns } from 'utils/helper';
import {
  Container,
  GalleryImage,
  GalleryItem,
  LoadingSpinner,
  MessageBox,
  Message,
} from 'styles';
import { Gallery } from 'components/SearchCollections/SearchCollections.styles';
import { showModal, getFavorites } from 'store/favoritesSlice';
import LoaderComponent from 'components/LoaderComponent';

const Favorites = (props) => {
  const { photos, isLoading, hasMore, index } = useSelector(
    (state) => state.favorites
  );
  const favorites = useSelector((state) => state.favorites.photos);
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading: authLoading } = useAuth0();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      dispatch(getFavorites());
    }
  }, [dispatch, authLoading, isAuthenticated]);

  const fetchPhotos = () => {
    const favoritePhotos = Object.values(photos);
    return favoritePhotos;
  };

  return (
    <Container>
      {favorites.length === 0 && (
        <MessageBox>
          <Message>You currently have no saved photos</Message>
        </MessageBox>
      )}
      {isLoading && (
        <LoadingSpinner>
          <LoaderComponent />
        </LoadingSpinner>
      )}

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
          {fetchPhotos().map((photo, index) => (
            <GalleryItem
              key={photo.id}
              onClick={() => dispatch(showModal(index))}
            >
              <GalleryImage src={photo.urls.small} alt={photo.description} />
            </GalleryItem>
          ))}
        </Gallery>
        {index > -1 && (
          <Modal
            photos={fetchPhotos()}
            index={index}
            hideModal={() => dispatch(showModal(-1))}
          />
        )}
      </InfiniteScroll>
    </Container>
  );
};

export default Favorites;
