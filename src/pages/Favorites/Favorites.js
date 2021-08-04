import { connect, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Modal } from 'components';
import { breakpointColumns } from 'utils/helper';
import {
  Container,
  GalleryImage,
  GalleryItem,
  LoadingSpinner,
  Message,
} from 'styles';
import { Gallery } from 'components/SearchCollections/SearchCollections.styles';
import { getFavoritedPhotos } from 'store/favorites/favoritesReducer';
import { handleModal } from 'store/favorites/favoritesActions';

const Favorites = (props) => {
  const { index, isLoading, hasMore, photos } = useSelector(getFavoritedPhotos);
  const fetchPhotos = () => {
    const favoritePhotos = Object.values(photos);

    return favoritePhotos;
  };

  return (
    <Container>
      {fetchPhotos().length === 0 && <p>You currently have no saved photos</p>}
      {isLoading && (
        <LoadingSpinner>
          <Loader type='ThreeDots' color='#32D3AC' />
        </LoadingSpinner>
      )}

      <InfiniteScroll
        dataLength={fetchPhotos().length}
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
            <GalleryItem key={photo.id}>
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
