import Loader from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Modal } from 'components';
import React, { Component } from 'react';
import { breakpointColumns } from 'utils/helper';

import {
  Container,
  GalleryImage,
  GalleryItem,
  LoadingSpinner,
  Message,
} from 'styles';
import { Gallery } from 'components/SearchCollections/SearchCollections.styles';

export default class Favorites extends Component {
  state = {
    photos: [],
    hasMore: true,
    isLoading: false,
    index: -1,
    error: null,
  };

  componentDidMount = () => {
    this.fetchFavoriteFromLS();
  };
  fetchFavoriteFromLS = () => {
    try {
      this.setState({ isLoading: true });

      const data = Object.values(
        JSON.parse(localStorage.getItem('favorites') || '{}')
      );

      this.setState({
        photos: [...data],
        hasMore: !!data.length,
        isLoading: false,
      });
    } catch (err) {
      this.setState({ error: err });
    }
  };
  handleModal = (index) => this.setState({ index });

  render() {
    const { index, isLoading, photos, hasMore } = this.state;
    return (
      <Container>
        {photos.length === 0 && <p>You currently have no saved photos</p>}
        {isLoading && (
          <LoadingSpinner>
            <Loader type='ThreeDots' color='#32D3AC' />
          </LoadingSpinner>
        )}

        <InfiniteScroll
          dataLength={photos.length}
          next={this.fetchFavoriteFromLS}
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
                  onClick={() => this.handleModal(index)}
                />
              </GalleryItem>
            ))}
          </Gallery>
          {index > -1 && (
            <Modal
              photos={photos}
              index={index}
              hideModal={() => this.handleModal(-1)}
            />
          )}
        </InfiniteScroll>
      </Container>
    );
  }
}
