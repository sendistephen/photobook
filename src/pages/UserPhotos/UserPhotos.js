import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getUserPhotosUrl } from 'utils/api';
import Modal from 'components/Modal';
import axios from 'axios';
import {
  GalleryImage,
  GalleryItem,
  Message,
  LoadingSpinner,
  StyledMasonry,
} from 'pages/Photos/PhotoList.styles';

const breakpointColumns = {
  default: 3,
  1200: 3,
  992: 3,
  768: 2,
  576: 1,
};

class UserPhotos extends Component {
  state = {
    photos: [],
    page: 1,
    show: false,
    index: null,
  };
  showModal = (index) => {
    this.setState({ show: true, index });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  componentDidMount = () => {
    this.fetchUserPhotos();
  };

  fetchUserPhotos = async () => {
    try {
      this.setState({ isLoading: true });

      const url = getUserPhotosUrl({
        username: this.props.name,
        page: this.state.page,
        perPage: 10,
      });
      const res = await axios(url);
      const data = res.data;
      this.setState({
        photos: [...this.state.photos, ...data],
        isLoading: false,
        page: this.state.page + 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { photos, isLoading, show, index } = this.state;

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
          hasMore={this.state.page > 0}
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
                  onClick={() => this.showModal(index)}
                />
              </GalleryItem>
            ))}
          </StyledMasonry>
          {show && (
            <Modal
              photos={photos}
              index={index}
              hideModal={this.hideModal}
              show={show}
            />
          )}
        </InfiniteScroll>
      </>
    );
  }
}

export default UserPhotos;
