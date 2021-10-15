import { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from 'react-loader-spinner';
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
import { getFavoritedPhotos } from 'store/favorites/favoritesReducer';
import { handleModal } from 'store/favorites/favoritesActions';
import { getFavorites } from 'store/favorites/favoritesActions';

const Favorites = (props) => {
  const { index, loading, hasMore, photos } = useSelector(getFavoritedPhotos);
  const favorites = useSelector((state) => state.favorites.photos);
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useAuth0();

  const fetchPhotos = () => {
    const favoritePhotos = Object.values(photos);
    return favoritePhotos;
  };
  useEffect(() => {
    if (isLoading && isAuthenticated) {
      dispatch(getFavorites());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites]);

  useEffect(() => {
    if (fetchPhotos.length !== favorites.length) {
      dispatch(getFavorites());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPhotos.length, favorites.length]);

  return (
    <Container>
      {favorites.length === 0 && (
        <MessageBox>
          <Message>You currently have no saved photos</Message>
        </MessageBox>
      )}
      {loading && (
        <LoadingSpinner>
          <Loader type='ThreeDots' color='#32D3AC' />
        </LoadingSpinner>
      )}

      <InfiniteScroll
        dataLength={Object.entries(photos).length}
        next={fetchPhotos}
        hasMore={hasMore}
        loader={
          <LoadingSpinner>
            <Loader type='ThreeDots' color='#32D3AC' />
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
            <GalleryItem key={index}>
              <GalleryImage
                src={photo.urls.small}
                alt={photo.description}
                onClick={() => props.handleModal(index)}
              />
            </GalleryItem>
          ))}
        </Gallery>
        {index > -1 && (
          <Modal
            photos={fetchPhotos()}
            index={index}
            hideModal={() => props.handleModal(-1)}
          />
        )}
      </InfiniteScroll>
    </Container>
  );
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  handleModal,
};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
