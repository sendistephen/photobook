import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'components/Modal';
import { Gallery } from './SearchPhotos.styles';
import { breakpointColumns } from 'utils/helper';
import {
  Container,
  GalleryImage,
  GalleryItem,
  LoadingSpinner,
  Message,
} from 'styles';
import {
  fetchPhotos,
  handleModal,
  clearPhotos,
} from '../../store/search/searchActions';

class SearchPhotos extends Component {
  componentDidMount = () => {
    const { searchWord } = this.props.match.params;
    this.props.fetchPhotos(searchWord);
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { searchWord } = this.props.match.params;
    if (
      prevProps.match.params.searchWord !== this.props.match.params.searchWord
    ) {
      this.props.fetchPhotos(searchWord);
    }
  };
  componentWillUnmount() {
    this.props.clearPhotos();
  }
  render() {
    const { index, photos, hasMore } = this.props.photos;
    return (
      <Container>
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
          <Gallery
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
          </Gallery>
          {index > -1 && (
            <Modal
              photos={photos}
              index={index}
              hideModal={() => this.props.handleModal(-1)}
            />
          )}
        </InfiniteScroll>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  photos: state.search,
});
const mapDispatchToProps = {
  fetchPhotos,
  handleModal,
  clearPhotos,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchPhotos));
