import { useToasts } from 'react-toast-notifications';
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
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import {
  addFavoritePhoto,
  getFavorites,
  removeFavoritePhoto,
} from 'store/favoritesSlice';

import { useEffect } from 'react';

const Modal = ({ photos, index, ...props }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const favourites = useSelector((state) => state.favorites.photos);
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { addToast } = useToasts();

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

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getFavorites());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <SliderContainer>
      <StyledSlider {...settings}>
        {photos.map((photo) => {
          const favorited = !!favourites[photo.id];

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
                      auth.isAuthenticated
                        ? favorited
                          ? dispatch(removeFavoritePhoto(photo.id))
                          : dispatch(addFavoritePhoto(photo)) &&
                            addToast('Saved Successfully', {
                              appearance: 'success',
                            })
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

export default Modal;
