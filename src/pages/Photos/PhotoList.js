import axios from 'axios';
import Modal from 'components/Modal';
import { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { getURL } from 'utils/api';
import {
  GalleryImage,
  GalleryItem,
  Message,
  LoadingSpinner,
  StyledMasonry,
} from './PhotoList.styles';

const breakpointColumns = {
  default: 3,
  1200: 3,
  992: 3,
  768: 2,
  576: 1,
};

export default class PhotoList extends Component {
  state = {
    photos: [],
    isLoading: false,
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
        per_page: 50,
      });
      const response = await axios(url);
      const data = await response.data;

      // update state with data
      this.setState({
        photos: [...this.state.photos, ...data],
        page: this.state.page + 1,
        isLoading: false,
      });
    } catch (err) {
      console.log('Ooops!', err);
    }
  };

  render() {
    const { photos, isLoading, show, index } = this.state;
    return (
      <>
        {isLoading ? (
          <LoadingSpinner>
            <Loader type='ThreeDots' color='#32D3AC' />
          </LoadingSpinner>
        ) : (
          ''
        )}

        {photos.length > 0 && (
          <InfiniteScroll
            dataLength={photos.length}
            next={this.fetchPhotos}
            hasMore={true}
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
        )}
      </>
    );
  }
}
