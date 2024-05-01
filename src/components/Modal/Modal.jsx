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
  ModalOverlay,
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
import { signInWithRedirect } from '@firebase/auth';
import { auth, googleAuthProvider } from '@/firebase/firebase-config';
import { hideModal } from '@/store/modalSlice';

const Modal = ({ photos, selectedPhotoId, ...props }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const favorites = useSelector((state) => state.favorites.photos);

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
    if (user && favorites.length === 0) {
      dispatch(getFavorites());
    }
  }, [dispatch, user]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSaveFavoritePhoto = async (photo) => {
    if (!user) {
      await signInWithRedirect(auth, googleAuthProvider);
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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      hideModal();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
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
                        <Subtitle>
                          {moment(photo.created_at).fromNow()}
                        </Subtitle>
                      </TextWrapper>
                    </Avatar>
                  </Link>
                  <CloseModal>
                    <Icon
                      src={closeIcon}
                      alt='close'
                      onClick={props.hideModal}
                    />
                  </CloseModal>
                </PhotoHeader>

                <PhotoImageWrapper>
                  <Link to={`/photos/${photo.id}`} key={photo.id}>
                    <PhotoImage
                      src={photo.urls.small}
                      alt={photo.description}
                    />
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
    </ModalOverlay>
  );
};

export default Modal;
