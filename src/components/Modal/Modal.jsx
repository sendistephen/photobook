import 'react-magic-slider-dots/dist/magic-dots.css';

import MagicSliderDots from 'react-magic-slider-dots';

import closeIcon from '../../assets/icons/cross.svg';

import { ModalAvatar } from './Avatar';
import {
  CloseModal,
  Icon,
  ModalOverlay,
  PhotoHeader,
  SliderContainer,
  StyledSlider,
} from './Modal.styles';
import { ModalPhoto } from './ModalPhoto';
import { useModal } from './useModal';

const Modal = ({ photos, selectedPhotoId, ...props }) => {
  const {
    user,
    favorites,
    initialSlideIndex,
    handleSaveFavoritePhoto,
    handleOverlayClick,
    dispatch,
  } = useModal(photos, selectedPhotoId);

  const settings = {
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

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <SliderContainer>
        <StyledSlider {...settings}>
          {photos.map((photo) => {
            const favorited = favorites.some((fav) => fav.id === photo.id);

            return (
              <div key={photo.id}>
                <PhotoHeader>
                  <ModalAvatar user={photo.user} createdAt={photo.created_at} />
                  <CloseModal>
                    <Icon
                      src={closeIcon}
                      alt="close"
                      onClick={props.hideModal}
                    />
                  </CloseModal>
                </PhotoHeader>

                <ModalPhoto
                  photo={photo}
                  favorited={favorited}
                  handleSaveFavoritePhoto={(photo) =>
                    handleSaveFavoritePhoto(photo, user, favorites, dispatch)
                  }
                />
              </div>
            );
          })}
        </StyledSlider>
      </SliderContainer>
    </ModalOverlay>
  );
};

export default Modal;
