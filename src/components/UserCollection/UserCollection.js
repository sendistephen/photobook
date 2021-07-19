import axios from 'axios';
import { Component } from 'react';

import { getUserCollections } from 'utils/api';
import {
  Collection,
  StyledSlider,
  CollectionBox,
  Cover,
  Title,
} from './UserCollection.styles';

class UserCollection extends Component {
  state = {
    collections: [],
    page: 1,
    perPage: 20,
    isLoading: false,
    error: null,
  };

  componentDidMount = () => {
    const { username } = this.props;
    this.getCollection(username);
  };

  getCollection = async (username) => {
    try {
      this.setState({ isLoading: false });
      const url = getUserCollections({
        username: username,
        page: this.state.page,
        perPage: this.state.perPage,
      });
      const res = await axios(url);
      const data = res.data;
      this.setState({ collections: [...this.state.collections, ...data] });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    };
    return (
      <Collection>
        <StyledSlider {...settings}>
          {this.state.collections.map((collection) => (
            <CollectionBox key={collection.id}>
              <Cover
                src={
                  collection.cover_photo && collection.cover_photo.urls.small
                }
                alt={collection.title}
              />
              <Title>{collection.title}</Title>
            </CollectionBox>
          ))}
        </StyledSlider>
      </Collection>
    );
  }
}

export default UserCollection;
