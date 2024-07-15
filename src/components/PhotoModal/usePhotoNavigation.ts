import { useNavigate } from 'react-router-dom';
import useOpenModal from '../Modal/useOpenModal';

const usePhotoNavigation = (photos: Photo[], selectedPhotoId: string) => {
  const openModal = useOpenModal();
  const navigate = useNavigate();
  const currentIndex = photos.findIndex((p) => p.id === selectedPhotoId);

  const handleNavigation = (offset: number) => {
    const newIndex = currentIndex + offset;
    if (newIndex >= 0 && newIndex < photos.length) {
      const newPhotoId = photos[newIndex];
      navigate(`/photos/${newPhotoId}`, { replace: true });
      openModal(newPhotoId, photos);
    }
  };
  return { handleNavigation };
};
export default usePhotoNavigation;
