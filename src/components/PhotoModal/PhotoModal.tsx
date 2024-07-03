import usePhotos from '@/pages/Explore/usePhotos';
import { AppDispatch } from '@/store';
import {
  hideModal,
  selectActivePhotoId,
  selectIsModalOpen,
  showModal,
} from '@/store/modalSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SkeletonModal from '../Common/SkeletonModal';
import PhotoDetails from './PhotoDetails';
import PhotoModalHeader from './PhotoHeader';
import { CloseButton, ModalContainer, Overlay } from './PhotoModal.styles';
import PhotoNavigation from './PhotoNavigation';
import useBodyScrollLock from './useBodyScrollLock';
import usePhoto from './usePhoto';

const PhotoModal = () => {
  const isOpen = useSelector(selectIsModalOpen);
  useBodyScrollLock(isOpen);
  const activePhotoId = useSelector(selectActivePhotoId);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { photos } = usePhotos();
  const { isLoading, isError, photo } = usePhoto(activePhotoId as string);

  const currentIndex = photos.findIndex((p) => p.id === activePhotoId);

  const handleNavigation = (offset: number) => {
    const newIndex = currentIndex + offset;
    if (newIndex >= 0 && newIndex < photos.length) {
      const newPhotoId = photos[newIndex].id;
      navigate(`/photos/${newPhotoId}`, { replace: true });
      dispatch(showModal(newPhotoId));
    }
  };

  useEffect(() => {
    if (activePhotoId) {
      navigate(`/photos/${activePhotoId}`);
    }
  }, [activePhotoId, navigate]);

  if (isError) return <div>Error fetching photo</div>;

  if (!isOpen || !activePhotoId) return null;

  const handleClose = () => {
    dispatch(hideModal());
    navigate('/');
  };

  return (
    <Overlay>
      <PhotoNavigation direction="left" onClick={() => handleNavigation(-1)} />
      <ModalContainer>
        {isLoading || !photo ? (
          <SkeletonModal />
        ) : (
          <>
            <PhotoModalHeader photo={photo || null} />
            <CloseButton onClick={handleClose}>&times;</CloseButton>
            <PhotoDetails photo={photo} />
          </>
        )}
      </ModalContainer>
      <PhotoNavigation direction="right" onClick={() => handleNavigation(1)} />
    </Overlay>
  );
};
export default PhotoModal;
