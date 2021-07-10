import axios from 'axios';
import Modal from 'components/Modal';
import { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'react-loader-spinner';
import { Wrapper } from 'styles';
import { getURL } from 'utils/api';
import { breakpointColumns } from 'utils/helper';
import {
  GalleryImage,
  GalleryItem,
  Message,
  LoadingSpinner,
  StyledMasonry,
} from './PhotoList.styles';

export default class PhotoList extends Component {
  state = {
    photos: [],
    isLoading: false,
    page: 1,
    perPage: 50,
    hasMore: true,
    index: -1,
    error: null,
  };

  handleModal = (index) => this.setState({ index });

  componentDidMount = () => {
    this.fetchPhotos();
  };

  /**
   * This method returns a list of photos from the api
   */
  fetchPhotos = async () => {
    try {
      // set isLoading to true
      this.setState({ isLoading: true });

      // make a fetch request to the api GET/photos end point
      const url = getURL({
        page: this.state.page,
        per_page: this.state.perPage,
      });

      const response = await axios(url);
      const data = response.data;

      // update state with data
      this.setState({
        photos: [...this.state.photos, ...data],
        page: this.state.page + 1,
        hasMore: !!data.length,
        isLoading: false,
      });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  render() {
    const { photos, hasMore, isLoading, index } = this.state;
    return (
      <Wrapper>
        {isLoading && (
          <LoadingSpinner>
            <Loader type='ThreeDots' color='#32D3AC' />
          </LoadingSpinner>
        )}
        {photos.length > 0 && (
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
            <StyledMasonry
              breakpointCols={breakpointColumns}
              columnClassName='masonry-grid_column'
            >
              {this.state.photos.map((photo, index) => (
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
        )}
      </Wrapper>
    );
  }
}
