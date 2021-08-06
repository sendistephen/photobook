import { Component } from 'react';
import { connect } from 'react-redux';
import { getUserCollection } from 'store/user/userActions';

import {
  Collection,
  StyledSlider,
  CollectionBox,
  Cover,
  Title,
} from './UserCollection.styles';

class UserCollection extends Component {
  componentDidMount = () => {
    const { username } = this.props;
    this.props.getUserCollection(username);
  };

  render() {
    const { collections } = this.props.collections;
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
          {collections.map((collection) => (
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
const mapStateToProps = (state) => ({
  collections: state.user,
});
const mapDispatchToProps = {
  getUserCollection,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserCollection);
