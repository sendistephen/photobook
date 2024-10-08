import useFavoriteStatus from '@/pages/Favorites/useFavoriteStatus';
import { Overlay } from './PhotoModal.styles';
import PhotoModalContent from './PhotoModalContent';
import PhotoModalNavigation from './PhotoModalNavigation';
import useBodyScrollLock from './useBodyScrollLock';
import useCloseModal from './useCloseModal';
import usePhotoModalStateManager from './usePhotoModalStateManager';
import { usePhotoNavigation } from './usePhotoNavigation';
import useSyncUrlWithSelectedPhoto from './useSyncUrlWithSelectedPhoto';

const renderModalContent = (props: PhotoModalProps) => (
  <PhotoModalContent
    isLoading={props.isLoading}
    photo={props.photo}
    isFavorited={props.isFavorited}
    onFavorite={props.onFavorite}
    onClose={props.onClose}
  />
);

const PhotoModal = () => {
  const { error, isOpen, selectedPhotoId, photos, isLoading, photo } = usePhotoModalStateManager();
  const { handleNavigation } = usePhotoNavigation(photos as Photo[], selectedPhotoId as string);
  const { isFavorited, toggleFavorite } = useFavoriteStatus(selectedPhotoId as string, photo);
  const handleClose = useCloseModal();
  useBodyScrollLock(isOpen);
  useSyncUrlWithSelectedPhoto(selectedPhotoId as string);

  if (error) return <div>Error fetching photo</div>;
  if (!isOpen || !selectedPhotoId) return null;

  return (
    <Overlay data-testid="photo-modal">
      <PhotoModalNavigation handleNavigation={handleNavigation} />
      {renderModalContent({
        isLoading,
        photo: photo || null,
        isFavorited,
        onFavorite:toggleFavorite,
        onClose:handleClose,
      })}
    </Overlay>
  );
};

export default PhotoModal;
