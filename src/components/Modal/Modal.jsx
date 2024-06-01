import 'react-magic-slider-dots/dist/magic-dots.css';

import { signInWithRedirect } from '@firebase/auth';
import moment from 'moment';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import MagicSliderDots from 'react-magic-slider-dots';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import closeIcon from '@/assets/icons/cross.svg';
import heartIcon from '@/assets/icons/heart.svg';
import starIcon from '@/assets/icons/star.svg';
import favIcon from '@/assets/icons/star2.svg';
import { auth, googleAuthProvider } from '@/firebase/firebase-config';
import {
  addFavoritePhoto,
  addFavoritePhotoOptimistic,
  getFavorites,
  removeFavoritePhoto,
  removeFavoritePhotoOptmistic,
} from '@/store/favoritesSlice';
import { hideModal } from '@/store/modalSlice';

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

const Modal = ({ photos, selectedPhotoId, ...props }) => {
  const dispatch = useDispatch(),
    user = useSelector((state) => state.auth.user),
    favorites = useSelector((state) => state.favorites.photos),
    initialSlideIndex = photos.findIndex(
      (photo) => photo.id === selectedPhotoId,
    ),
    settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: initialSlideIndex,
      appendDots: (dots) => (
        <MagicSliderDots dots={dots} numDotsToShow={3} dotWidth={30} />
      ),
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
        // Check if the photo is already in the favorites.
        const isFavorited = favorites.some((fav) => fav.id === photo.id);

        if (isFavorited) {
          await dispatch(removeFavoritePhotoOptmistic(photo.id));
          await dispatch(removeFavoritePhoto(photo.id)).unwrap();
          toast.success('Removed from favorites', { appearance: 'info' });
        } else {
          dispatch(addFavoritePhotoOptimistic(photo));

          dispatch(addFavoritePhoto(photo)).unwrap();
          toast.success('Added to favorites', { appearance: 'success' });
        }
      } catch (err) {
        toast.error('Failed to update favorites');
        console.log(err);
        // Optionally rollback the optimistic update if there's an error
        dispatch(addFavoritePhotoOptimistic(photo));
      }
    },
    handleOverlayClick = (e) => {
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
                      alt="close"
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
                    <Icon src={heartIcon} alt="heart icon" />
                    <span>{photo.likes}</span>
                  </IconWrapper>
                  <FavIcon>
                    <Icon
                      onClick={() => handleSaveFavoritePhoto(photo)}
                      src={favorited ? favIcon : starIcon}
                      alt="Fav icon"
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
