import { RootState } from '@/store';
import { hideModal } from '@/store/modalSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SkeletonModal from '../Common/SkeletonModal';
import useOpenModal from '../Modal/useOpenModal';
import PhotoDetails from './PhotoDetails';
import PhotoModalHeader from './PhotoHeader';
import { CloseButton, ModalContainer, Overlay } from './PhotoModal.styles';
import PhotoNavigation from './PhotoNavigation';
import useBodyScrollLock from './useBodyScrollLock';
import usePhoto from './usePhoto';

const PhotoModal = () => {
  const { photos, isOpen, selectedPhotoId } = useSelector(
    (state: RootState) => state.modal,
  );

  useBodyScrollLock(isOpen);
  const openModal = useOpenModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, photo } = usePhoto(selectedPhotoId as string);

  const currentIndex = photos.findIndex((p) => p.id === selectedPhotoId);

  const handleNavigation = (offset: number) => {
    const newIndex = currentIndex + offset;
    if (newIndex >= 0 && newIndex < photos.length) {
      const newPhotoId = photos[newIndex];
      navigate(`/photos/${newPhotoId}`, { replace: true });
      openModal(newPhotoId, photos);
    }
  };

  useEffect(() => {
    if (selectedPhotoId) {
      navigate(`/photos/${selectedPhotoId}`);
    }
  }, [selectedPhotoId, navigate]);

  if (isError) return <div>Error fetching photo</div>;

  if (!isOpen || !selectedPhotoId) return null;

  const handleClose = () => {
    dispatch(hideModal());
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
