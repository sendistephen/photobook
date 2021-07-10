import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getSearchResults } from 'utils/api';
import Modal from 'components/Modal';
import {
  GalleryImage,
  GalleryItem,
  LoadingSpinner,
  Message,
} from 'pages/Photos/PhotoList.styles';
import { Gallery } from './SearchPhotos.styles';
import { breakpointColumns } from 'utils/helper';

export class SearchPhotos extends Component {
  state = {
    photos: [],
    page: 1,
    perPage: 25,
    index: null,
    isLoading: false,
    hasMore: true,
    show: false,
    error: null,
  };
  showModal = (index) => this.setState({ show: true, index });

  hideModal = () => this.setState({ show: false, index: null });

  componentDidMount = () => {
    this.fetchPhotos();
  };

  fetchPhotos = async () => {
    const { perPage, page } = this.state;
    try {
      this.setState({ isLoading: true });

      const url = getSearchResults({
        query: this.props.match.params.searchWord,
        page,
        perPage,
      });
      const res = await axios(url);
      const data = res.data.results;

      this.setState({
        photos: [...this.state.photos, ...data],
        isLoading: false,
        page: page + 1,
        hasMore: data.length >= perPage,
        error: null,
      });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.match.params.searchWord !== this.props.match.params.searchWord
    ) {
      this.setState({ photos: [] });
      this.fetchPhotos();
    }
  };
  render() {
    const { index, photos, show, hasMore } = this.state;
    return (
      <>
        <InfiniteScroll
          dataLength={photos.length}
          next={this.fetchPhotos}
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
                  onClick={() => this.showModal(index)}
                />
              </GalleryItem>
            ))}
          </Gallery>
          {show && (
            <Modal photos={photos} index={index} hideModal={this.hideModal} />
          )}
        </InfiniteScroll>
      </>
    );
  }
}

export default withRouter(SearchPhotos);
