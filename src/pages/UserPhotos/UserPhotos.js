import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'components/Modal';
import { breakpointColumns } from 'utils/helper';
import {
  GalleryImage,
  GalleryItem,
  LoadingSpinner,
  Message,
  StyledMasonry,
} from 'styles';
import { fetchUserPhotos, handleModal } from 'store/user/userActions';

class UserPhotos extends Component {
  componentDidMount = () => {
    this.props.fetchUserPhotos(this.props.name);
  };

  render() {
    const { photos, hasMore, isLoading, index } = this.props.user;
    return (
      <>
        {isLoading && (
          <LoadingSpinner>
            <Loader type='ThreeDots' color='#32D3AC' />
          </LoadingSpinner>
        )}
        <InfiniteScroll
          dataLength={photos.length}
          next={this.props.fetchUserPhotos}
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
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = {
  fetchUserPhotos,
  handleModal,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserPhotos);
