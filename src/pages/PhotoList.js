import axios from 'axios';
import { Component } from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-css';
import { Container } from 'styles';

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
        `${process.env.REACT_APP_UNSPLASH_API_URL}/photos`,
        {
          headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
          },
        }
      );
      const data = await response.data;

      // update state with data
      this.setState({
        photos: data,
      });

      // set isLoading back to false
      this.setState({ isLoading: false });
    } catch (err) {
      console.log('Ooops!', err);
    }
  };

  render() {
    return (
        <Masonry
          breakpointCols={breakpointColumns}
          className='masonry-grid'
          columnClassName='masonry-grid_column'
        >
          {this.state.photos.map((photo) => (
            <GalleryItem key={photo.id}>
              <GalleryImage src={photo.urls.small} alt={photo.description} />
            </GalleryItem>
          ))}
        </Masonry>
    );
  }
}

const GalleryItem = styled.div`
  border-radius: 10px;
`;

const GalleryImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;
