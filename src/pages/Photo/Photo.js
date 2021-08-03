import moment from 'moment';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import Loader from 'react-loader-spinner';
import { Wrapper } from 'styles';
import {
  AddCollection,
  Avatar,
  AvatarImg,
  Collection,
  CollectionCards,
  CollectionItems,
  Description,
  FavIcon,
  Icon,
  IconWrapper,
  LoadingSpinner,
  OptionsMenu,
  PhotoFooter,
  PhotoHeader,
  PhotoImage,
  PhotoWrapper,
  Subtitle,
  TextWrapper,
  PhotoImageWrapper,
  Title,
} from './Photo.styles';
import heartIcon from 'assets/icons/heart.svg';
import favIcon from 'assets/icons/star2.svg';
import starIcon from 'assets/icons/star.svg';
import optionIcon from 'assets/icons/option.svg';
import { connect } from 'react-redux';
import { fetchPhoto } from 'store/photo/photoActions';
import { addPhotoToFavorites } from 'store/favorites/favoritesActions';
class Photo extends Component {
  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.props.fetchPhoto(id);
  };

  render() {
    const { isLoading, photo } = this.props.photo;
    const favorited = !!this.props.favorites[photo.id];

    return (
      <Wrapper>
        <Collection>
          <AddCollection></AddCollection>
          <CollectionCards>
            <CollectionItems></CollectionItems>
            <CollectionItems></CollectionItems>
            <CollectionItems></CollectionItems>
            <CollectionItems></CollectionItems>
          </CollectionCards>
        </Collection>

        {isLoading && (
          <LoadingSpinner>
            <Loader type='ThreeDots' color='#32D3AC' />
          </LoadingSpinner>
        )}
        <PhotoWrapper>
          {photo.user && (
            <PhotoHeader>
              <Link to={`/users/${photo.user.username}`}>
                <Avatar>
                  <AvatarImg
                    src={photo.user.profile_image.medium}
                    alt={photo.user.username}
                  />
                  <TextWrapper>
                    <Title>{photo.user.username}</Title>
                    <Subtitle>{moment(photo.updated_at).fromNow()}</Subtitle>
                  </TextWrapper>
                </Avatar>
              </Link>
              <OptionsMenu>
                <Icon src={optionIcon} alt='Options menu' />
              </OptionsMenu>
            </PhotoHeader>
          )}
          <Description>{photo.description}</Description>

          {photo.urls && (
            <PhotoImageWrapper>
              <PhotoImage src={photo.urls.small} alt={photo.description} />
            </PhotoImageWrapper>
          )}
          <PhotoFooter>
            <IconWrapper>
              <Icon src={heartIcon} alt='heart icon' />
              <span>{photo.likes}</span>
            </IconWrapper>
            <div></div>
            <FavIcon>
              <Icon
                src={favorited ? favIcon : starIcon}
                onClick={() => this.props.addPhotoToFavorites(photo)}
                alt='Fav icon'
              />
            </FavIcon>
          </PhotoFooter>
        </PhotoWrapper>
      </Wrapper>
    );
  }
}
const mapStateToProps = (state) => ({
  photo: state.photo,
  favorites: state.favorites.photos,
});
const mapDispatchToProps = {
  fetchPhoto,
  addPhotoToFavorites,
};
export default connect(mapStateToProps, mapDispatchToProps)(Photo);
