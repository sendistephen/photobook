import axios from 'axios';
import { Component } from 'react';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { GalleryImage, GalleryItem, Message } from './PhotoList.styles';

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
      const response = await axios.get(
        `${process.env.REACT_APP_UNSPLASH_API_URL}/photos?page=${this.state.page}&per_page=20`,
        {
          headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
          },
        }
      );
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
    const { photos, isLoading } = this.state;
    return (
      <>
        {isLoading ? (
          <div class='spinner'>
            <Loader type='ThreeDots' color='#32D3AC' />
          </div>
        ) : (
          ''
        )}

        {photos.length > 0 && (
          <InfiniteScroll
            dataLength={photos.length}
            next={this.fetchPhotos}
            hasMore={true}
            loader={
              <div className='spinner'>
                <Loader type='ThreeDots' color='#32D3AC' />
              </div>
            }
            endMessage={
              <Message>
                <b>There are no more photos</b>
              </Message>
            }
          >
            <Masonry
              breakpointCols={breakpointColumns}
              className='masonry-grid'
              columnClassName='masonry-grid_column'
            >
              {this.state.photos.map((photo) => (
                <GalleryItem key={photo.id}>
                  <GalleryImage
                    src={photo.urls.small}
                    alt={photo.description}
                  />
                </GalleryItem>
              ))}
            </Masonry>
          </InfiniteScroll>
        )}
      </>
    );
  }
}
