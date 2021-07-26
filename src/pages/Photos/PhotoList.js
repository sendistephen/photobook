import Modal from 'components/Modal';
import { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { fetchPhotos, handleModal } from 'store/photos/photosActions';
import {
  GalleryImage,
  GalleryItem,
  LoadingSpinner,
  Message,
  StyledMasonry,
  Container,
} from 'styles';
import { breakpointColumns } from 'utils/helper';

class PhotoList extends Component {
  componentDidMount = () => {
    this.props.fetchPhotos();
  };

  render() {
    const { photos, hasMore, isLoading, index } = this.props.photos;
    return (
      <Container>
        {isLoading && (
          <LoadingSpinner>
            <Loader type='ThreeDots' color='#32D3AC' />
          </LoadingSpinner>
        )}
        {photos.length > 0 && (
          <InfiniteScroll
            dataLength={photos.length}
            next={this.props.fetchPhotos}
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
            <StyledMasonry
              breakpointCols={breakpointColumns}
              columnClassName='masonry-grid_column'
            >
              {photos.map((photo, index) => (
                <GalleryItem key={photo.id}>
                  <GalleryImage
                    src={photo.urls.small}
                    alt={photo.description}
                    onClick={() => this.props.handleModal(index)}
                  />
                </GalleryItem>
              ))}
            </StyledMasonry>

            {index > -1 && (
              <Modal
                photos={photos}
                index={index}
                hideModal={() => this.props.handleModal(-1)}
              />
            )}
          </InfiniteScroll>
        )}
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  photos: state.photos,
});

const mapDispatchToProps = {
  fetchPhotos,
  handleModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoList);
