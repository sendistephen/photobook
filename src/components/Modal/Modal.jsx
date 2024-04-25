import { useEffect } from 'react';
import closeIcon from '@/assets/icons/cross.svg';
import heartIcon from '@/assets/icons/heart.svg';
import starIcon from '@/assets/icons/star.svg';
import favIcon from '@/assets/icons/star2.svg';
import moment from 'moment';
import MagicSliderDots from 'react-magic-slider-dots';
import 'react-magic-slider-dots/dist/magic-dots.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import {
  addFavoritePhoto,
  addFavoritePhotoOptimistic,
  getFavorites,
  removeFavoritePhoto,
  removeFavoritePhotoOptmistic,
} from '@/store/favoritesSlice';
import {
  Avatar,
  AvatarImg,
  CloseModal,
  FavIcon,
  Icon,
  IconWrapper,
  PhotoFooter,
  PhotoHeader,
  PhotoImage,
  PhotoImageWrapper,
  SliderContainer,
  StyledSlider,
  Subtitle,
  TextWrapper,
  Title,
} from './Modal.styles';
import { signWithGoogle } from '@/utils/auth';
import useAuth from '@/hooks/useAuth';

const Modal = ({ photos, selectedPhotoId, ...props }) => {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.photos);
  const { isAuthenticated } = useAuth();

  const { addToast } = useToasts();

  const initialSlideIndex = photos.findIndex(
    (photo) => photo.id === selectedPhotoId
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: initialSlideIndex,
    appendDots: (dots) => {
      return <MagicSliderDots dots={dots} numDotsToShow={3} dotWidth={30} />;
    },
  };

  useEffect(() => {
    if (isAuthenticated && favorites.length === 0) {
      dispatch(getFavorites());
    }
  }, [dispatch, isAuthenticated]);

  const handleSaveFavoritePhoto = async (photo) => {
    if (!isAuthenticated) {
      await signWithGoogle();
      return;
    }
    try {
      // check if the photo is already in the favorites.
      const isFavorited = favorites.some((fav) => fav.id === photo.id);

      if (isFavorited) {
        await dispatch(removeFavoritePhotoOptmistic(photo.id));
        await dispatch(removeFavoritePhoto(photo.id)).unwrap();
        addToast('Removed from favorites', { appearance: 'info' });
      } else {
        dispatch(addFavoritePhotoOptimistic(photo));

        dispatch(addFavoritePhoto(photo)).unwrap();
        addToast('Added to favorites', { appearance: 'success' });
      }
    } catch (error) {
      console.error('Favorite toggle failed:', error);
      addToast('Failed to update favorites', { appearance: 'error' });

      // optionally rollback the optimistic update if there's an error
      dispatch(addFavoritePhotoOptimistic(photo));
    }
  };

  return (
    <SliderContainer>
      <StyledSlider {...settings}>
        {photos.map((photo) => {
          const favorited = favorites.some((fav) => fav.id === photo.id);

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
                    onClick={() => handleSaveFavoritePhoto(photo)}
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
