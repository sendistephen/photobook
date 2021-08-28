import {
  FavIcon,
  Icon,
  IconWrapper,
  CloseModal,
  PhotoFooter,
  PhotoHeader,
  PhotoImage,
  Subtitle,
  TextWrapper,
  PhotoImageWrapper,
  SliderContainer,
  Title,
  Avatar,
  AvatarImg,
  StyledSlider,
} from './Modal.styles';
import heartIcon from 'assets/icons/heart.svg';
import starIcon from 'assets/icons/star.svg';
import favIcon from 'assets/icons/star2.svg';
import closeIcon from 'assets/icons/cross.svg';
import MagicSliderDots from 'react-magic-slider-dots';
import 'react-magic-slider-dots/dist/magic-dots.css';
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPhotoToFavorites } from 'store/favorites/favoritesActions';
import { useAuth0 } from '@auth0/auth0-react';

const Modal = ({ photos, index, ...props }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: index,
    appendDots: (dots) => {
      return <MagicSliderDots dots={dots} numDotsToShow={3} dotWidth={30} />;
    },
  };

  return (
    <SliderContainer>
      <StyledSlider {...settings}>
        {photos.map((photo) => {
          const favorited = !!props.favorites[photo.id];
          return (
            <div key={photo.id}>
              <PhotoHeader>
                <Link to={`/users/${photo.user.username}`}>
                  <Avatar>
                    <AvatarImg
                      src={photo.user.profile_image.medium}
                      alt={photo.user.username}
                    />
                    <TextWrapper>
                      <Title>{photo.user.username}</Title>
                      <Subtitle>{moment(photo.created_at).fromNow()}</Subtitle>
                    </TextWrapper>
                  </Avatar>
                </Link>
                <CloseModal>
                  <Icon src={closeIcon} alt='close' onClick={props.hideModal} />
                </CloseModal>
              </PhotoHeader>

              <PhotoImageWrapper>
                <Link to={`/photos/${photo.id}`} key={photo.id}>
                  <PhotoImage src={photo.urls.small} alt={photo.description} />
                </Link>
              </PhotoImageWrapper>

              <PhotoFooter>
                <IconWrapper>
                  <Icon src={heartIcon} alt='heart icon' />
                  <span>{photo.likes}</span>
                </IconWrapper>

                <FavIcon>
                  <Icon
                    onClick={() => {
                      isAuthenticated
                        ? props.addPhotoToFavorites(photo)
                        : loginWithRedirect();
                    }}
                    src={favorited ? favIcon : starIcon}
                    alt='Fav icon'
                  />
                </FavIcon>
              </PhotoFooter>
            </div>
          );
        })}
      </StyledSlider>
    </SliderContainer>
  );
};

const mapStateToProps = (state) => ({
  favorites: state.favorites.photos,
});
const mapDispatchToProps = {
  addPhotoToFavorites,
};
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
