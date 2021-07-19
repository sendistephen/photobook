import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getUserPhotosUrl } from 'utils/api';
import Modal from 'components/Modal';
import axios from 'axios';
import { breakpointColumns } from 'utils/helper';
import {
  GalleryImage,
  GalleryItem,
  LoadingSpinner,
  Message,
  StyledMasonry,
} from 'styles';

class UserPhotos extends Component {
  state = {
    photos: [],
    page: 1,
    perPage: 10,
    hasMore: true,
    index: -1,
    error: '',
  };
  handleModal = (index) => this.setState({ index });

  componentDidMount = () => {
    this.fetchUserPhotos();
  };

  fetchUserPhotos = async () => {
    try {
      this.setState({ isLoading: true });

      const url = getUserPhotosUrl({
        username: this.props.name,
        page: this.state.page,
        perPage: this.state.perPage,
      });
      const res = await axios(url);
      const data = res.data;
      this.setState({
        photos: [...this.state.photos, ...data],
        isLoading: false,
        hasMore: !!data.length,
        page: this.state.page + 1,
      });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  render() {
    const { photos, hasMore, isLoading, index } = this.state;
    return (
      <>
        {isLoading && (
          <LoadingSpinner>
            <Loader type='ThreeDots' color='#32D3AC' />
          </LoadingSpinner>
        )}
        <InfiniteScroll
          dataLength={photos.length}
          next={this.fetchUserPhotos}
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
                  onClick={() => this.handleModal(index)}
                />
              </GalleryItem>
            ))}
          </StyledMasonry>
          {index > -1 && (
            <Modal
              photos={photos}
              index={index}
              hideModal={() => this.handleModal(-1)}
            />
          )}
        </InfiniteScroll>
      </>
    );
  }
}

export default UserPhotos;
